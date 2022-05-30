import { PlayButton } from './play-button.js';

export class Loader extends Phaser.Scene {
    constructor() {
    super({ key: 'loader' });
    this.playButton = new PlayButton(this);
    }
    
    preload() {
    // mobile controls
    this.load.image('rightbutton', '../multimedia/right.png');
    this.load.image('leftbutton', '../multimedia/left.png');
    this.load.image('launchbutton', '../multimedia/launchbutton.png');


    // Preload
    this.load.image('background-preload', '../multimedia/background-preload.png');
    this.load.spritesheet('playbutton', '../multimedia/playbutton.png', { frameWidth: 190, frameHeight: 49 });
    this.load.audio('breakoutsample', '../multimedia/breakout.mp3');

    // Game
    this.load.image('background', '../multimedia/background.png');
    this.load.image('platform', '../multimedia/platform2.png');
    this.load.image('ball', '../multimedia/ball.png');
    this.load.image('bluebrick', '../multimedia/brickBlue.png');
    this.load.image('blackbrick', '../multimedia/brickBlack.png');
    this.load.image('greenbrick', '../multimedia/brickGreen.png');
    this.load.image('orangebrick', '../multimedia/brickOrange.png');
    this.load.image('yellowbrick', '../multimedia/brickYellow.png');
    this.load.image('whitebrick', '../multimedia/brickWhite.png');
    this.load.image('greybrick', '../multimedia/brickGrey.png');
    
    this.load.spritesheet('bluediamond',
        '../multimedia/blue_diamond-sprites.png',
        { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('reddiamond',
        '../multimedia/red_diamond-sprites.png',
        { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('greendiamond',
        '../multimedia/green_diamond-sprites.png',
        { frameWidth: 48, frameHeight: 48 }
    );

    this.load.audio('platformimpactsample', '../multimedia/platform-impact.mp3');
    this.load.audio('brickimpactsample', '../multimedia/brick-impact.mp3');
    this.load.audio('fixedbrickimpactsample', '../multimedia/fixed-brick-impact.mp3');
    this.load.audio('gameoversample', '../multimedia/gameover.mp3');
    this.load.audio('winsample', '../multimedia/you_win.mp3');
    this.load.audio('startgamesample', '../multimedia/start-game.mp3');
    this.load.audio('livelostsample', '../multimedia/live-lost.mp3');
    this.load.audio('phasechange', '../multimedia/phasechange.mp3');
    
    // Game over & Congratulations
    this.load.spritesheet('restartbutton', '../multimedia/restart.png', { frameWidth: 190, frameHeight: 49 });
    this.load.image('congratulations', '../multimedia/congratulations.png');
    this.load.image('gameover', '../multimedia/gameover.png');
    }
    
    create() {
    this.add.image(400, 250, 'background-preload');
    this.playButton.create();
    this.breakoutSample = this.sound.add('breakoutsample');
    
    }
}