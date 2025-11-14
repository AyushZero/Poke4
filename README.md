# Connect 4: Pokémon Edition

A strategic twist on the classic Connect 4 game that incorporates Pokémon type mechanics! This game was inspired by [this YouTube video](https://youtu.be/WXgpjCiCl58?si=GLooNqn9W39dg6cv).

## 🎮 Play the Game

[Play Now on GitHub Pages](https://yourusername.github.io/Poke4/)

## 🌟 Features

- **Classic Connect 4 Gameplay**: Get 4 pieces in a row to win
- **Pokémon Type System**: Each piece has a random Pokémon type (18 types total)
- **Type Interactions**: Pieces interact based on type effectiveness when landing on opponents
- **Assist Mode**: Optional help showing type strengths and weaknesses
- **Type Chart**: Complete reference for all type matchups
- **Game Logs**: Track all interactions throughout the match
- **Dark Minimalist Design**: Clean, modern interface with smooth animations

## 🎯 How to Play

### Basic Rules
1. Players alternate dropping colored pieces into columns (Red vs Blue)
2. Pieces fall to the lowest available position
3. First player to connect 4 pieces in a row (horizontal, vertical, or diagonal) wins!

### Pokémon Type Mechanics
Each piece gets a **random Pokémon type** when it's your turn. Type interactions occur when a piece lands directly on top of an opponent's piece:

- **Super Effective (2×)**: Your piece destroys the opponent's piece and falls into its space
- **Not Very Effective (0.5×)**: The opponent's piece destroys your incoming piece (your piece doesn't get placed)
- **No Effect (0×)**: Immunity - your piece destroys the opponent's piece
- **No Team Kills**: Your pieces never interact with your own pieces

### Game Features

#### Assist Mode
- Click the "Assist" button in your sidebar to toggle help
- Shows what your current type is strong/weak against
- Works independently for each player

#### Type Chart
- View complete type effectiveness matrix
- Green (+) = Super Effective
- Red (−) = Not Very Effective
- Grey (×) = No Effect

#### Logs
- Review all type interactions during the game
- Color-coded entries for easy reading

## 🚀 Deployment on GitHub Pages

### Quick Setup
1. Fork or clone this repository
2. Go to repository Settings → Pages
3. Select `main` branch as source
4. Your game will be live at `https://yourusername.github.io/repositoryname/`

### Local Development
Simply open `index.html` in your browser. No build process or dependencies required!

## 📁 Project Structure

```
Poke4/
├── index.html          # Main HTML file
├── style.css           # All styles
├── game.js            # Game logic and mechanics
├── types/             # Pokémon type icon SVGs
│   ├── normal.svg
│   ├── fire.svg
│   ├── water.svg
│   └── ... (18 types total)
└── README.md          # This file
```

## 🎨 Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling with modern features (Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript**: Game logic with no frameworks
- **SVG Icons**: Pokémon type icons

## 🔧 Customization

### Modify Type Chart
Edit the `TYPE_CHART` object in `game.js` to adjust type effectiveness values.

### Change Colors
Update the CSS variables in `style.css` for different color schemes.

### Adjust Grid Size
Modify `ROWS` and `COLS` constants in `game.js` (default: 6×7).

## 📝 Game Rules Reference

### Type Effectiveness
Based on official Pokémon type chart mechanics:
- 18 different types (Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy)
- Each type has unique strengths and weaknesses
- Strategic play involves anticipating opponent moves and type matchups

## 🎯 Strategy Tips

1. **Learn Key Matchups**: Memorize common type interactions
2. **Use Assist Mode**: Enable it when learning the game
3. **Plan Ahead**: Consider both traditional Connect 4 strategy and type matchups
4. **Control the Center**: Central columns give more winning opportunities
5. **Watch the Logs**: Learn from previous interactions

## 🙏 Credits

- Game concept inspired by: [Pokemon Connect 4 Video](https://youtu.be/WXgpjCiCl58?si=GLooNqn9W39dg6cv)
- Pokémon type system: The Pokémon Company
- Type icons: SVG format for web compatibility

## 📄 License

This project is open source and available for educational and entertainment purposes.

## 🐛 Known Issues

None currently! Please report any bugs by opening an issue.

## 🔮 Future Enhancements

- [ ] Online multiplayer support
- [ ] AI opponent with difficulty levels
- [ ] Sound effects and animations
- [ ] Ability to choose specific types
- [ ] Tournament mode
- [ ] Mobile-optimized touch controls

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share feedback

---

**Enjoy the game!** 🎮✨
