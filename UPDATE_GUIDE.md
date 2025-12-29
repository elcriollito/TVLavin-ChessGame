# How to Update Your TVLavin-Chess-Game Repository with Stockfish

This guide will help you update your existing GitHub repository with the new Stockfish-powered chess game.

## Method 1: Replace Everything (Recommended for Fresh Start)

### Step 1: Backup Your Current Repository (Optional)
If you want to keep your old code:
```bash
# Clone your current repo to a backup location
git clone https://github.com/elcriollito/TVLavin-Chess-Game.git TVLavin-Chess-Game-backup
```

### Step 2: Clone Your Repository
```bash
git clone https://github.com/elcriollito/TVLavin-Chess-Game.git
cd TVLavin-Chess-Game
```

### Step 3: Replace Files
1. Delete all existing files (except .git folder)
2. Copy all files from the `stockfish-chess` folder into your repository
3. Or manually:
```bash
# On Windows (PowerShell)
Remove-Item * -Recurse -Exclude .git
# Then copy new files

# On Mac/Linux
rm -rf * .*
# Then copy new files, but restore .git folder
```

### Step 4: Commit and Push
```bash
git add .
git commit -m "Complete rewrite: Added Stockfish chess engine integration"
git push origin main
```
(If your default branch is 'master', use `git push origin master` instead)

---

## Method 2: Update Existing Files (Keep Git History)

### Step 1: Clone Your Repository
```bash
git clone https://github.com/elcriollito/TVLavin-Chess-Game.git
cd TVLavin-Chess-Game
```

### Step 2: Add New Files
Copy these files from the stockfish-chess folder:
- `index.html` (replace existing)
- `style.css` (replace existing)  
- `game.js` (new file)
- `stockfish-interface.js` (new file)
- `README.md` (replace existing)

### Step 3: Commit Changes
```bash
git add .
git commit -m "Integrate Stockfish chess engine with multiple difficulty levels"
git push
```

---

## Method 3: Using GitHub Web Interface (Easiest)

### Step 1: Download the Stockfish Chess Game
1. Download the zip file from the outputs
2. Extract all files

### Step 2: Upload to GitHub
1. Go to your repository: https://github.com/elcriollito/TVLavin-Chess-Game
2. Click "Add file" → "Upload files"
3. Drag and drop all the files from the extracted folder
4. Check "Replace existing files"
5. Add commit message: "Added Stockfish chess engine"
6. Click "Commit changes"

---

## Enable GitHub Pages (Make Your Game Playable Online)

### Step 1: Go to Repository Settings
1. Visit: https://github.com/elcriollito/TVLavin-Chess-Game
2. Click "Settings" tab
3. Click "Pages" in the left sidebar

### Step 2: Configure Pages
1. Under "Source", select "main" (or "master") branch
2. Leave folder as "/ (root)"
3. Click "Save"

### Step 3: Wait and Access
1. GitHub will build your site (takes 1-2 minutes)
2. Your game will be live at:
   ```
   https://elcriollito.github.io/TVLavin-Chess-Game/
   ```
3. Share this link with anyone!

---

## Key Features of Your New Chess Game

✅ **Play vs Stockfish AI** - Real chess engine, not random moves
✅ **7 Difficulty Levels** - Beginner to Grandmaster
✅ **Choose Your Color** - Play as White or Black  
✅ **Move History** - See all moves in chess notation
✅ **Captured Pieces** - Visual display of captured pieces
✅ **Beautiful UI** - Modern design with smooth animations
✅ **Responsive** - Works on mobile, tablet, and desktop
✅ **No Installation** - Just open in browser!

---

## Testing Your Game

After uploading:
1. Open `index.html` in your browser locally to test
2. Try different difficulty levels
3. Play a few moves as both White and Black
4. Verify the engine responds (it may take 1-3 seconds)

---

## Troubleshooting

### "Engine not ready" error?
- Check your internet connection
- Refresh the page
- Make sure you're using a modern browser

### GitHub Pages not working?
- Wait a few minutes after enabling
- Check that index.html is in the root folder
- Verify Pages is enabled in Settings

### Game not responding?
- Open browser console (F12) to check for errors
- Ensure JavaScript is enabled
- Try a different browser

---

## What Changed From Your Original Game?

**Added:**
- Stockfish chess engine integration
- AI opponent with 7 difficulty levels
- Professional chessboard UI (Chessboard.js)
- Complete chess rules validation (Chess.js)
- Move history display
- Captured pieces tracking
- Better mobile responsiveness
- Loading of chess engine via Web Worker

**Improved:**
- More professional design
- Better error handling
- Smoother animations
- Clearer game status messages

---

## Next Steps

After updating your repository:

1. ✅ Test the game locally
2. ✅ Push to GitHub
3. ✅ Enable GitHub Pages
4. ✅ Share your game link!
5. 🎉 Play chess and have fun!

---

## Need Help?

If you encounter any issues:
1. Check the browser console (F12) for errors
2. Make sure all files are uploaded correctly
3. Verify the file structure matches the example
4. Test locally before pushing to GitHub

Good luck with your chess game! 🎮♟️
