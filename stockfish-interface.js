/**
 * Stockfish Interface
 * Handles communication with the Stockfish chess engine via Web Worker
 */

class StockfishEngine {
    constructor() {
        this.engine = null;
        this.engineReady = false;
        this.skillLevel = 5;
        this.searchDepth = 10;
        this.onBestMove = null;
        this.onInfo = null;
        this.initEngine();
    }

    initEngine() {
        try {
            // Using Stockfish WASM from CDN
            this.engine = new Worker('https://cdn.jsdelivr.net/npm/stockfish.wasm@0.11.0/stockfish.wasm.js');
            
            this.engine.onmessage = (event) => {
                const message = event.data;
                
                if (message.includes('uciok')) {
                    this.engineReady = true;
                    this.configureEngine();
                }
                
                if (message.startsWith('bestmove')) {
                    const match = message.match(/bestmove ([a-h][1-8][a-h][1-8][qrbn]?)/);
                    if (match && this.onBestMove) {
                        this.onBestMove(match[1]);
                    }
                }
                
                if (message.startsWith('info') && this.onInfo) {
                    this.onInfo(message);
                }
            };

            this.engine.postMessage('uci');
        } catch (error) {
            console.error('Failed to initialize Stockfish:', error);
            this.initFallbackEngine();
        }
    }

    initFallbackEngine() {
        // Fallback to older Stockfish version if WASM fails
        try {
            this.engine = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js');
            
            this.engine.onmessage = (event) => {
                const message = event.data;
                
                if (message.includes('uciok')) {
                    this.engineReady = true;
                    this.configureEngine();
                }
                
                if (message.startsWith('bestmove')) {
                    const match = message.match(/bestmove ([a-h][1-8][a-h][1-8][qrbn]?)/);
                    if (match && this.onBestMove) {
                        this.onBestMove(match[1]);
                    }
                }
                
                if (message.startsWith('info') && this.onInfo) {
                    this.onInfo(message);
                }
            };

            this.engine.postMessage('uci');
        } catch (error) {
            console.error('Failed to initialize fallback Stockfish:', error);
        }
    }

    configureEngine() {
        // Set skill level (0-20, where 20 is strongest)
        this.engine.postMessage(`setoption name Skill Level value ${this.skillLevel}`);
        this.engine.postMessage('setoption name UCI_LimitStrength value true');
        this.engine.postMessage('isready');
    }

    setSkillLevel(level) {
        this.skillLevel = parseInt(level);
        if (this.engineReady) {
            this.engine.postMessage(`setoption name Skill Level value ${this.skillLevel}`);
            
            // Adjust search depth based on skill level
            if (this.skillLevel <= 5) {
                this.searchDepth = 8;
            } else if (this.skillLevel <= 10) {
                this.searchDepth = 12;
            } else if (this.skillLevel <= 15) {
                this.searchDepth = 16;
            } else {
                this.searchDepth = 20;
            }
        }
    }

    getBestMove(fen, callback) {
        if (!this.engineReady) {
            console.error('Engine not ready');
            return;
        }

        this.onBestMove = callback;
        
        this.engine.postMessage(`position fen ${fen}`);
        this.engine.postMessage(`go depth ${this.searchDepth}`);
    }

    stop() {
        if (this.engine) {
            this.engine.postMessage('stop');
        }
    }

    quit() {
        if (this.engine) {
            this.engine.postMessage('quit');
            this.engine.terminate();
        }
    }
}
