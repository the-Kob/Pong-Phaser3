import Phaser from 'phaser';

// Scene Keys
import { GAME_BACKGROUND, GAME_OVER } from '../consts/SceneKeys.js';

// Audio Keys
import * as AudioKeys from '../consts/AudioKeys.js';

// Colors
import * as Colors from '../consts/Colors.js';

// Fonts
import * as Fonts from '../consts/Fonts.js';

const GameState = {
    running: 'running',
    playerWon: 'player-won',
    AIWon: 'AI-won'
}

const AI_SPEED = 2;

const MAX_SCORE = 5;

export default class Game extends Phaser.Scene {
    init() {
        this.gameState = GameState.running;

        this.AIVelocity = new Phaser.Math.Vector2(0, 0);

        this.playerScore = 0;
        this.AIScore = 0;

        this.paused = false;

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const { width, height} = this.scale;

        this.scene.run(GAME_BACKGROUND);

        this.physics.world.setBounds(-100, 0, 1000, 500);

        // Ball
        this.ball = this.add.circle(width/2, height/2, 10, Colors.WHITE, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setCircle(10);
        this.ball.body.setBounce(1, 1);
        //this.ball.body.setMaxSpeed(500);

        // Player (left paddle)
        this.player = this.add.rectangle(50, height/2, 25, 100, Colors.WHITE, 1);
        this.physics.add.existing(this.player, true);

        // AI (right paddle)
        this.ai = this.add.rectangle(750, height/2, 25, 100, Colors.WHITE, 1);
        this.physics.add.existing(this.ai, true);

        // Score
        const scoreStyle = {
            fontSize: 20,
            fontFamily: Fonts.PRESS_START_2P
        }

        this.divider = this.add.text(width/2, height/8, '-', scoreStyle).setOrigin(0.5, 0.5);

        this.playerScoreText = this.add.text(width/3, height/8, this.playerScore, scoreStyle).setOrigin(0.5, 0.5);

        this.AIScoreText = this.add.text(width/1.5, height/8, this.AIScore, scoreStyle).setOrigin(0.5, 0.5);

        // Colliders
        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', this.handleBallWorldBoundsCollision, this);

        this.physics.add.collider(this.player, this.ball, this.handlePaddleCollision, undefined, this);
        this.physics.add.collider(this.ai, this.ball, this.handlePaddleCollision, undefined, this);

        this.time.delayedCall(1000, () => {
            this.resetBall();
        });
    }

    update() {
        if(this.paused || this.gameState !== GameState.running) { return; }

        this.updatePlayer();

        this.updateAI();

        this.checkScore();

        this.input.keyboard.once('keydown-R', () => {
            this.resetBall();
        });
    }

    resetBall() {
        this.ball.setPosition(400, 250);

        const angle = Phaser.Math.Between(0, 360);
        // TODO check angles

        const ballVelocity = this.physics.velocityFromAngle(angle, 300);
        this.ball.body.setVelocity(ballVelocity.x, ballVelocity.y);
    }

    handleBallWorldBoundsCollision(body, up, down, left, right) {
        if(left || right) { return; }

        this.sound.play(AudioKeys.WALL_AUDIO);
    }

    handlePaddleCollision(paddle, ball) {
        this.sound.play(AudioKeys.PADDLE_AUDIO);

        const ballVelocity = this.ball.body.velocity;
        ballVelocity.x *= 1.05;
        ballVelocity.y *= 1.05;

        this.ball.body.setVelocity(ballVelocity.x, ballVelocity.y);
    }

    updatePlayer() {
        // Player movement
        if(this.cursors.up.isDown) {
            this.player.y -= 2;
            this.player.body.updateFromGameObject();
        } else if(this.cursors.down.isDown) {
            this.player.y += 2;
            this.player.body.updateFromGameObject();
        }
    }

    updateAI() {
        const posDiff = this.ball.y - this.ai.y

        // Determines the AI difficulty (reaction time)
        if(Math.abs(posDiff) < 30) {
            return;
        }
        
        // AI movement
        if(posDiff < 0) {
            // Ball is above the AI
            this.AIVelocity.y = -AI_SPEED;
            if(this.AIVelocity.y < -10) {
                this.AIVelocity.y = -10;
            }
        } else if(posDiff > 0) {
            // Ball is below the AI
            this.AIVelocity.y = AI_SPEED;
            if(this.AIVelocity.y > 10) {
                this.AIVelocity.y = 10;
            }
        }

        this.ai.y += this.AIVelocity.y;
        this.ai.body.updateFromGameObject();
    }

    checkScore() {
        const { width, height} = this.scale;

        const xBounds = {
            left: -30,
            right: width + 30
        }

        if(this.ball.x >= xBounds.left && this.ball.x <= xBounds.right) { return; }

        if(this.ball.x < xBounds.left) {
            // AI scores
            this.incrementAIScore();
        } else if(this.ball.x > xBounds.right) {
            // Player scores
            this.incrementPlayerScore();
        }

        if(this.AIScore >= MAX_SCORE) {
            // AI wins
            this.gameState = GameState.AIWon;
        } else if(this.playerScore >= MAX_SCORE) {
            // Player wins
            this.gameState = GameState.playerWon;
        }

        if(this.gameState === GameState.running) {
            this.resetBall();
        } else {
            // Game over
            this.ball.active = false;
            this.physics.world.remove(this.ball.body)

            this.scene.stop(GAME_BACKGROUND);

            this.scene.start(GAME_OVER, {
                playerScore: this.playerScore,
                AIScore: this.AIScore
            });
        }
    }

    incrementPlayerScore() {
        this.playerScore += 1;
        this.playerScoreText.text = this.playerScore;
    }

    incrementAIScore() {
        this.AIScore += 1;
        this.AIScoreText.text = this.AIScore;
    }
}