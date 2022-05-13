let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let score = 0;
let scoreText;

function preload ()
{
    this.load.image('sky', '../multimedia/sky.png');
    this.load.image('ground', '../multimedia/platform.png');
    this.load.image('star', '../multimedia/star.png');
    this.load.image('bomb', '../multimedia/bomb.png');
    this.load.spritesheet('dude', 
        '../multimedia/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

var platforms;

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

player.body.setGravityY(300)
this.physics.add.collider(player, platforms);
}

cursors = this.input.keyboard.createCursorKeys();
if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}

stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});

function collectStar (player, star)
{
    star.disableBody(true, true);
}



// const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
//     preload: preload,
//     create: create,
//     update: update
// })

// //Variables
// let score = 0
// let scoreText
// let platforms
// let diamonds
// let cursors
// let player

// //Definicion de la carga de juego
// function preload () {
//     game.load.image('sky', '../multimedia/sky.png')
//     game.load.image('ground', '../multimedia/platform.png')
//     game.load.image('diamond', '../multimedia/diamond.png')
//     game.load.spritesheet('woof', '../multimedia/woof.png', 32, 32)
// }

// function create () {
//     game.physics.startSystem(Phaser.Physics.ARCADE)
//     game.add.image(0, 0, 'sky')

//     //Plataforma
//     platforms = game.add.group()
//     platforms.enableBody = true
//     const ground = platforms.create(0, game.world.height - 64, 'ground')
//     ground.scale.setTo(2, 2)
//     ground.body.immovable = true

//     let ledge = platforms.create(400, 450, 'ground')
//     ledge.body.immovable = true
//     ledge = platforms.create(-75, 350, 'ground')
//     ledge.body.immovable = true

//     //Configuracion del jugador
//     player = game.add.sprite(32, game.world.height - 150, 'woof')
//     game.physics.arcade.enable(player)
//     player.body.bounce.y = 0.2
//     player.body.gravity.y = 800
//     player.body.collideWorldBounds = true
//     player.animations.add('left', [0, 1], 10, true)
//     player.animations.add('right', [2, 3], 10, true)

//     //Colecta de diamantes y sus propiedades
//     diamonds = game.add.group()
//     diamonds.enableBody = true
    
//     for (var i = 0; i < 12; i++) {
//     const diamond = diamonds.create(i * 70, 0, 'diamond')
    
//     diamond.body.gravity.y = 1000
//     diamond.body.bounce.y = 0.3 + Math.random() * 0.2
//     }

//     //Puntuacion del jugador
//     scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' })

//     cursors = game.input.keyboard.createCursorKeys()
// }

// function update () {
//     player.body.velocity.x = 0

//     game.physics.arcade.collide(player, platforms)
//     game.physics.arcade.collide(diamonds, platforms)

//     game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

//     //Animacion del jugador
//     if (cursors.left.isDown) {
//     player.body.velocity.x = -150
//     player.animations.play('left')
//     } else if (cursors.right.isDown) {
//     player.body.velocity.x = 150
//     player.animations.play('right')
//     } else {
//     player.animations.stop()
//     }

//     if (cursors.up.isDown && player.body.touching.down) {
//     player.body.velocity.y = -400
//     }

//     //Alerta cuando ganas
//     if (score === 120) {
//     alert('¡Ganaste!')
//     score = 0
//     }
// }

// function collectDiamond (player, diamond) {
//     diamond.kill()
//     score += 10
//     scoreText.text = 'Puntuación: ' + score
// }