/**
 * Chess Game with Stockfish Engine
 */

let board = null;
let game = new Chess();
let stockfish = null;
let playerColor = 'white';
let gameOver = false;
let moveHistory = [];
let capturedPieces = { white: [], black: [] };

// Piece values for material count
const pieceValues = {
    'p': { symbol: '♟', name: 'pawn' },
    'n': { symbol: '♞', name: 'knight' },
    'b': { symbol: '♝', name: 'bishop' },
    'r': { symbol: '♜', name: 'rook' },
    'q': { symbol: '♛', name: 'queen' },
    'k': { symbol: '♚', name: 'king' }
};

// Initialize game
$(document).ready(function() {
    initGame();
    setupEventListeners();
});

function initGame() {
    // Initialize Stockfish
    if (!stockfish) {
        stockfish = new StockfishEngine();
    }
    
    // Set initial skill level
    const difficulty = parseInt($('#difficulty').val());
    stockfish.setSkillLevel(difficulty);
    
    // Initialize board
    const config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    };
    
    board = Chessboard('board', config);
    
    // Reset game state
    game = new Chess();
    gameOver = false;
    moveHistory = [];
    capturedPieces = { white: [], black: [] };
    
    updateStatus();
    updateMoveHistory();
    updateCapturedPieces();
    
    // If player is black, let engine make first move
    playerColor = $('#player-color').val();
    if (playerColor === 'black') {
        board.flip();
        setTimeout(makeEngineMove, 500);
    }
}

function setupEventListeners() {
    $('#new-game').on('click', function() {
        if (confirm('Start a new game?')) {
            initGame();
        }
    });
    
    $('#difficulty').on('change', function() {
        const level = parseInt($(this).val());
        stockfish.setSkillLevel(level);
    });
    
    $('#player-color').on('change', function() {
        initGame();
    });
}

function onDragStart(source, piece, position, orientation) {
    // Don't allow moves if game is over
    if (gameOver) return false;
    
    // Don't allow moves if it's not player's turn
    const playerTurn = (playerColor === 'white' && game.turn() === 'w') ||
                       (playerColor === 'black' && game.turn() === 'b');
    if (!playerTurn) return false;
    
    // Only allow player to move their own pieces
    if ((playerColor === 'white' && piece.search(/^b/) !== -1) ||
        (playerColor === 'black' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    // Check if move is promotion
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to queen for simplicity
    });
    
    // Invalid move
    if (move === null) return 'snapback';
    
    // Update game state
    updateGameState(move);
    
    // Make engine move after a short delay
    if (!gameOver) {
        setTimeout(makeEngineMove, 250);
    }
}

function onSnapEnd() {
    board.position(game.fen());
}

function makeEngineMove() {
    if (gameOver) return;
    
    // Show thinking indicator
    $('#engine-thinking').html('<span class="thinking">🤔 Engine is thinking...</span>');
    
    stockfish.getBestMove(game.fen(), function(bestMove) {
        // Hide thinking indicator
        $('#engine-thinking').html('');
        
        // Parse the move (e.g., "e2e4" or "e7e8q" for promotion)
        const from = bestMove.substring(0, 2);
        const to = bestMove.substring(2, 4);
        const promotion = bestMove.length > 4 ? bestMove.substring(4, 5) : undefined;
        
        // Make the move
        const move = game.move({
            from: from,
            to: to,
            promotion: promotion
        });
        
        if (move) {
            board.position(game.fen());
            updateGameState(move);
        }
    });
}

function updateGameState(move) {
    // Track captured pieces
    if (move.captured) {
        const capturedColor = move.color === 'w' ? 'black' : 'white';
        capturedPieces[capturedColor].push(move.captured);
        updateCapturedPieces();
    }
    
    // Add move to history
    moveHistory.push(move.san);
    updateMoveHistory();
    
    // Update status
    updateStatus();
    
    // Check for game over
    if (game.game_over()) {
        gameOver = true;
        handleGameOver();
    }
}

function updateStatus() {
    let status = '';
    
    if (game.in_checkmate()) {
        status = game.turn() === 'w' ? 'Black wins by checkmate!' : 'White wins by checkmate!';
    } else if (game.in_draw()) {
        status = 'Game drawn';
    } else if (game.in_stalemate()) {
        status = 'Game drawn by stalemate';
    } else if (game.in_threefold_repetition()) {
        status = 'Game drawn by threefold repetition';
    } else if (game.insufficient_material()) {
        status = 'Game drawn by insufficient material';
    } else if (game.in_check()) {
        status = (game.turn() === 'w' ? 'White' : 'Black') + ' is in check';
    } else {
        status = (game.turn() === 'w' ? 'White' : 'Black') + ' to move';
    }
    
    $('#status').html(status);
}

function updateMoveHistory() {
    let html = '';
    
    for (let i = 0; i < moveHistory.length; i += 2) {
        const moveNumber = Math.floor(i / 2) + 1;
        const whiteMove = moveHistory[i];
        const blackMove = moveHistory[i + 1] || '';
        
        html += `<span class="move-pair">
            <span class="move-number">${moveNumber}.</span>
            <span class="move">${whiteMove}</span>
            ${blackMove ? `<span class="move">${blackMove}</span>` : ''}
        </span>`;
    }
    
    $('#move-history').html(html);
    
    // Scroll to bottom
    const moveHistoryDiv = document.getElementById('move-history');
    moveHistoryDiv.scrollTop = moveHistoryDiv.scrollHeight;
}

function updateCapturedPieces() {
    // Update captured white pieces
    let capturedWhiteHtml = '';
    capturedPieces.white.forEach(piece => {
        capturedWhiteHtml += `<span class="captured-piece">${pieceValues[piece].symbol}</span>`;
    });
    $('#captured-white').html(capturedWhiteHtml || '<span style="color: #999;">None</span>');
    
    // Update captured black pieces
    let capturedBlackHtml = '';
    capturedPieces.black.forEach(piece => {
        const whitePiece = piece.toUpperCase();
        const symbol = pieceValues[piece].symbol.replace('♟', '♙')
            .replace('♞', '♘').replace('♝', '♗')
            .replace('♜', '♖').replace('♛', '♕').replace('♚', '♔');
        capturedBlackHtml += `<span class="captured-piece">${symbol}</span>`;
    });
    $('#captured-black').html(capturedBlackHtml || '<span style="color: #999;">None</span>');
}

function handleGameOver() {
    let message = '';
    
    if (game.in_checkmate()) {
        const winner = game.turn() === 'w' ? 'Black' : 'White';
        message = `Checkmate! ${winner} wins!`;
    } else if (game.in_draw()) {
        message = 'Game ended in a draw';
    } else if (game.in_stalemate()) {
        message = 'Game ended in stalemate';
    } else if (game.in_threefold_repetition()) {
        message = 'Game ended by threefold repetition';
    } else if (game.insufficient_material()) {
        message = 'Game ended due to insufficient material';
    }
    
    setTimeout(() => {
        alert(message + '\n\nClick "New Game" to play again.');
    }, 500);
}

// Handle window resize
$(window).resize(function() {
    board.resize();
});
