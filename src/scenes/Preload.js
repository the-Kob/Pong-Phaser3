import Phaser from 'phaser';

import WebFontFile from '../font-handling/WebFontFile.js';
import * as AudioKeys from '../consts/AudioKeys.js';

// Scene Keys
import { TITLESCREEN } from '../consts/SceneKeys.js';

export default class Preload extends Phaser.Scene {
    preload() {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);

        this.load.audio(AudioKeys.WALL_AUDIO, 'assets/4383__noisecollector__pongblipd3.wav');
        this.load.audio(AudioKeys.PADDLE_AUDIO, 'assets/4387__noisecollector__pongblipe4.wav');
    }

    create() {
        this.scene.start(TITLESCREEN);
    }
}