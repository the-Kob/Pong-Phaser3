import Phaser from 'phaser';

// Scene Keys
import { TITLESCREEN } from '../consts/SceneKeys.js';

// Fonts
import * as Fonts from '../consts/Fonts.js';

export default class GameOver extends Phaser.Scene {

    /**
     * 
     * @param {{playerScore: number, AIScore: number}} data 
     */
    create(data) {
        const { width, height } = this.scale;

        let titleText = 'game over';

        if(data.playerScore > data.AIScore) {
            // Player won
            titleText = 'you won';
        }

        this.add.text(width/2, height/2.5, titleText, {
            fontSize: 42,
            fontFamily: Fonts.PRESS_START_2P
        }).setOrigin(0.5, 0.5);

        this.add.text(width/2, height/1.4, "press 'space' to continue", {
            fontFamily: Fonts.PRESS_START_2P
        }).setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(TITLESCREEN);
        });
    }
}