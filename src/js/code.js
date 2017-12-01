//node ./node_modules/gulp/bin/gulp run

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('bckgrnd','/images/Background.png');
    game.load.spritesheet('isaac','/images/movement.png',32,19);
    game.load.spritesheet('head','/images/headAnim.png',45,40);
    game.load.image('aid','/images/firstaid.png');
    
    //game.world.setBounds(285, 180, 1355, 720);
    //game.camera.bounds = new Phaser.Rectangle(0, 0, 1920, 1080)
   
}
//Vars

   
function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    game.add.sprite(0, 0, 'bckgrnd');

    var bulletPool = []
    for(var i = 0; i<10;i++){
        
        bulletPool.push(new Bullet(this.game,200,200,'aid',1,'right'))
        bulletPool[i].kill();
        bulletPool[i].body.collideWorldBounds = false;
        
    }

    var aid = new Bullet(this.game,200,200,'aid',1,'down');
    var head = new Basic(this.game,0,0,'head');
    head.body.collideWorldBounds = false;
    var player = new Player(this.game,400,300,'isaac',5,head,bulletPool);

    player.addChild(head);
    head.place(-9,-35);
    
}

function update() {
    
}

