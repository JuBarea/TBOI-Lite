

//node ./node_modules/gulp/bin/gulp run

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {

    this.game.load.baseURL = 'https://JuBarea.github.io/TBOI-Lite/src/';
    this.game.load.crossOrigin = 'anonymous';

    game.load.image('bckgrnd','/images/StartingRoom.png');
    game.load.spritesheet('isaac','/images/movement.png',32,19);
    game.load.spritesheet('head','/images/headAnim.png',45,40);
    game.load.image('aid','/images/BulletTemp.png');
    game.load.image('poop_01','/images/Poop_01.png');
    
    game.world.setBounds(85,90,635,370);
    game.camera.bounds = new Phaser.Rectangle(0, 0, 800, 600)
   
}
//Vars

   
function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
var background = game.add.sprite(0, 0, 'bckgrnd');
    background.scale.setTo(0.92, 1);
    //Poop sprite
var poop = game.add.sprite(500, 250, 'poop_01');
    poop.scale.setTo(0.40, 0.40);

    var bulletPool = []
    for(var i = 0; i<10;i++){
        
        bulletPool.push(new Bullet(this.game,200,200,'aid',1,'right'))
        bulletPool[i].kill();
        bulletPool[i].body.collideWorldBounds = false;
        
    }

    var aid = new Bullet(this.game,200,200,'aid',1,'down');
    var head = new Basic(this.game,0,0,'head');
    head.body.collideWorldBounds = false;
    var player = new Player(this.game,400,300,'isaac',3,head,bulletPool);

    player.addChild(head);
    head.place(-9,-35);
    
}

function update() {
    
}

