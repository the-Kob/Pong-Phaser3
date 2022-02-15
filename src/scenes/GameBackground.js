import Phaser from 'phaser';

// Colors
import * as Colors from '../consts/Colors';

// Fonts
import * as Fonts from '../consts/Fonts';

export default class GameBackground extends Phaser.Scene {
    create() {
        const { width, height} = this.scale;

        const scoreStyle = {
            fontSize: 16,
            fontFamily: Fonts.PRESS_START_2P
        }

        this.add.line(width/2, height/2 - 42, 0, 0, 0, 45, Colors.WHITE, 1).setLineWidth(2);
        this.add.line(width/2, height/2 + 42, 0, 0, 0, 45, Colors.WHITE, 1).setLineWidth(2);
        this.add.circle(width/2, height/2, 20).setStrokeStyle(2.5, Colors.WHITE, 1);

        this.add.text(width/2, height/1.1, "press 'r' to reset the ball", scoreStyle).setOrigin(0.5, 0.5);
    }
}