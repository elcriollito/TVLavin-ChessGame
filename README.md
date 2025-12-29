# Chess Game with Stockfish Engine

A fully functional web-based chess game where you can play against the powerful Stockfish chess engine. Choose your difficulty level from beginner to grandmaster!

![Chess Game Screenshot](https://img.shields.io/badge/Chess-Game-blue)
![Stockfish](https://img.shields.io/badge/Engine-Stockfish-green)

## 🎮 Features

- ✅ **Play against Stockfish AI** - One of the strongest chess engines in the world
- ✅ **Multiple difficulty levels** - From Beginner (Level 1) to Grandmaster (Level 20)
- ✅ **Play as White or Black** - Choose your side
- ✅ **Complete chess rules** - All legal moves, castling, en passant, pawn promotion
- ✅ **Visual move history** - Track all moves in standard algebraic notation
- ✅ **Captured pieces display** - See what pieces have been captured
- ✅ **Check & Checkmate detection** - Automatic game-over detection
- ✅ **Responsive design** - Works on desktop, tablet, and mobile
- ✅ **Beautiful UI** - Modern, clean interface with smooth animations

## 🚀 Quick Start

### Option 1: Play Online (Recommended)
1. Visit the live version: **[Your GitHub Pages URL]**
2. Select your difficulty level
3. Choose your color (White or Black)
4. Click "New Game" and start playing!

### Option 2: Run Locally
1. Clone this repository:
```bash
git clone https://github.com/yourusername/chess-stockfish.git
cd chess-stockfish
```

2. Open `index.html` in your web browser
   - **Chrome/Edge**: Right-click → Open with → Chrome/Edge
   - **Firefox**: Right-click → Open with → Firefox
   - **Safari**: Double-click the file

That's it! No installation or setup required.

## 📖 How to Play

1. **Choose Difficulty**: Select from 7 difficulty levels
   - Level 1-3: Beginner to Easy (makes mistakes)
   - Level 5-8: Medium to Hard (club player strength)
   - Level 10-15: Expert to Master (very strong)
   - Level 20: Grandmaster (near-perfect play)

2. **Select Your Color**: Play as White (move first) or Black

3. **Make Your Move**: 
   - Click and drag pieces to move them
   - The board will prevent illegal moves
   - Pawns automatically promote to queens when reaching the end

4. **Game Over Conditions**:
   - Checkmate - You win or lose
   - Stalemate - Draw
   - Insufficient material - Draw
   - Threefold repetition - Draw

## 🎯 Difficulty Levels Explained

| Level | Strength | Description |
|-------|----------|-------------|
| 1 | Beginner | Perfect for learning, makes obvious mistakes |
| 3 | Easy | Casual play, still makes tactical errors |
| 5 | Medium | **Default** - Challenging but beatable |
| 8 | Hard | Strong club player level |
| 10 | Expert | Very challenging, tournament strength |
| 15 | Master | Near-master level play |
| 20 | Grandmaster | Extremely strong, very hard to beat |

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with modern gradients and animations
- **JavaScript (ES6+)** - Game logic
- **Chess.js** - Chess move validation and game rules
- **Chessboard.js** - Interactive chess board UI
- **Stockfish.js** - Chess engine AI (Web Worker)

## 📦 Project Structure

```
chess-stockfish/
├── index.html              # Main HTML file
├── style.css               # Styling and layout
├── game.js                 # Game logic and UI
├── stockfish-interface.js  # Stockfish engine interface
└── README.md              # This file
```

## 🔧 Customization

### Adjust Engine Strength
Edit `stockfish-interface.js` to modify the search depth per level:
```javascript
if (this.skillLevel <= 5) {
    this.searchDepth = 8;   // Faster but weaker
} else if (this.skillLevel <= 10) {
    this.searchDepth = 12;  // Balanced
} else {
    this.searchDepth = 20;  // Slower but stronger
}
```

### Change Board Theme
In `index.html`, modify the `pieceTheme` option:
```javascript
pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
```

## 🐛 Troubleshooting

### Engine not responding?
- Make sure you have an internet connection (Stockfish loads from CDN)
- Try refreshing the page
- Check browser console for errors (F12)

### Board not displaying?
- Ensure JavaScript is enabled in your browser
- Check that you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Clear your browser cache

### Moves not working?
- Make sure it's your turn (check the status message)
- Verify you're moving your own pieces
- The move must be legal according to chess rules

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Opera 47+

## 📝 Chess Rules Reference

This game follows standard FIDE chess rules:
- **Castling**: King moves 2 squares toward rook
- **En Passant**: Special pawn capture move
- **Pawn Promotion**: Pawns promote to queen automatically
- **Check**: King under attack must move to safety
- **Checkmate**: King cannot escape check
- **Stalemate**: No legal moves but not in check (draw)

## 🚀 Deployment to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select main branch as source
4. Your game will be live at: `https://yourusername.github.io/chess-stockfish/`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **Stockfish** - Chess engine (https://stockfishchess.org/)
- **Chess.js** - Chess logic library
- **Chessboard.js** - Interactive chessboard UI
- Chess piece images from Wikipedia

## 📧 Contact

Have questions or suggestions? Open an issue on GitHub!

---

**Enjoy playing chess! ♟️♔♛**

May the best player (or engine) win! 🏆
