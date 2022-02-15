import Phaser from 'phaser';

// Scene Keys
import { GAME } from '../consts/SceneKeys.js';

// Audio Keys

import * as AudioKeys from '../consts/AudioKeys.js';

// Fonts
import * as Fonts from '../consts/Fonts.js';

export default class TitleScreen extends Phaser.Scene {
    create() {
        const { width, height } = this.scale;

        const titleStyle = {
            fontSize: 42,
            fontFamily: Fonts.PRESS_START_2P
        }

        this.add.text(width/2, height/2.5, "this is pong", titleStyle).setOrigin(0.5, 0.5);
        this.add.text(width/2, height/2, "the most difficult game ever", {
            fontFamily: Fonts.PRESS_START_2P
        }).setOrigin(0.5, 0.5);

        this.add.text(width/2, height/1.4, "press 'space' to start", {
            fontFamily: Fonts.PRESS_START_2P
        }).setOrigin(0.5, 0.5);

        this.add.text(width/2, height/1.25, "use your arrow keys to move", {
            fontFamily: Fonts.PRESS_START_2P
        }).setOrigin(0.5, 0.5);
        
        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.play(AudioKeys.WALL_AUDIO);
            this.scene.start(GAME);
        });
    }
}