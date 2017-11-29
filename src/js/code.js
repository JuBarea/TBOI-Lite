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
    
    
    /*var platforms;
    var movement;
    var cursors;
    var keyW;
    var keyS;
    var keyA;
    var keyD;*/


    

    
    
    
function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'bckgrnd');
 

    var head = new Basic(this.game,0,0,'head');
    var player = new Player(this.game,400,300,'isaac',5,this.head);

    player.addChild(head);
    head.place(-9,-35);

    //player.body.collideWorldBounds = true;

    var aid = new Bullet(this.game,200,200,'aid',1,'down');
    
    
    console.log(player);  
    //this.game.world.addChild(aid);

    if(player instanceof Phaser.Sprite)
        console.log("Yep");
    else console.log("Nope");
    player.hola();
    console.log(player.speed);
}

function update() {
    
}

/*function move(){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    

    if(keyA.isDown || keyD.isDown || keyW.isDown ||keyS.isDown){
        if (keyA.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
            head.frame = 6;
        }
        if (keyD.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
            head.frame = 2;
        } 
        if(keyW.isDown)
        {
            player.body.velocity.y = -150
            player.animations.play('up');
            head.frame = 4;
    
        }
        if(keyS.isDown)
        {
            player.body.velocity.y = 150   
            player.animations.play('up');
            head.frame = 0;
    
        }

    }
    else{
        //  Reset the players velocity (movement)
        player.animations.stop();
        player.frame = 0;
        head.animations.stop();
        head.frame = 0;
    }
}*/
