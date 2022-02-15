import Phaser from 'phaser';

// Scenes
import Preload from './scenes/Preload.js';
import TitleScreen from './scenes/TitleScreen.js';
import Game from './scenes/Game.js';
import GameBackground from './scenes/GameBackground.js';
import GameOver from './scenes/GameOver.js';

// Scene Keys
import * as SceneKeys from './consts/SceneKeys.js';

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    physics:  {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.PRELOAD, Preload);
game.scene.add(SceneKeys.TITLESCREEN, TitleScreen);
game.scene.add(SceneKeys.GAME, Game);
game.scene.add(SceneKeys.GAME_BACKGROUND, GameBackground);
game.scene.add(SceneKeys.GAME_OVER, GameOver);

game.scene.start(SceneKeys.PRELOAD);
