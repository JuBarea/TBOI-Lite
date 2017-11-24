var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var world = new World(game);

function preload() {
    game.load.image('bckgrnd','/assets/Background.png');
    game.load.spritesheet('isaac','/assets/movement.png',32,19);
    game.load.spritesheet('head','/assets/headAnim.png',45,40);
    
    world.setBounds(285, 180, 1355, 720);
}
//Hola test
var head;
var player;
var platforms;
var cursors;

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'bckgrnd');

// The player and its settings
player = game.add.sprite(960, 540, 'isaac');
head = game.add.sprite(-9,-35,'head');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(head);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left, right and up/down.
    player.animations.add('left', [20, 21, 22,23,24,25,26,27,28,29], 20, true);
    player.animations.add('right', [10, 11, 12,13,14,15,16,17,18,19], 20, true);
    player.animations.add('up',[0,1,2,3,4,5,6,7,8,9],20,true);

    //We add the head as a child
    player.addChild(head);
    //head.animations.add('left')

//Contorls
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
        head.frame = 6;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
        head.frame = 2;
    } 
    else if(cursors.up.isDown)
    {
        player.body.velocity.y = -150
        player.animations.play('up');
        head.frame = 4;

    } else if(cursors.down.isDown)
    {
        player.body.velocity.y = 150   
        player.animations.play('up');
        head.frame = 0;

    }
    else{
        player.animations.stop();
        player.frame = 0;
        head.animations.stop();
        head.frame = 0;
    }
}
