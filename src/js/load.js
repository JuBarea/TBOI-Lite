var loadState = {


    preload: function () {

        //this.game.load.baseURL = 'https://JuBarea.github.io/TBOI-Lite/src/';
        //this.game.load.crossOrigin = 'anonymous';

        game.load.image('startScreen','/images/startScreen.png');
        game.load.image('bckgrnd','/images/StartingRoom.png');
        game.load.spritesheet('isaac','/images/movement.png',32,19);
        game.load.spritesheet('head','/images/headAnim.png',45,40);
        game.load.image('aid','/images/BulletTemp.png');
        game.load.image('poop_01','/images/Poop_01.png');
        //tests
        game.load.image('poop_02','/images/firstaid.png');
        game.load.image('poop_03','/images/diamond.png');
        game.load.image('poop_04','/images/star.png');

        game.world.setBounds(85,90,635,370);
        game.camera.bounds = new Phaser.Rectangle(0, 0, 800, 600)
         //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log("Loading");
    },

    create: function () {
        console.log("Loading menu");
        this.game.state.start('menu');
      }
}

var menuState = {
    preload: function () {
        keySpace = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        
    },

    create: function () {
        console.log("menu");
        var background = game.add.sprite(0, 0, 'startScreen'); // Menu bckgnd
        //background.scale.setTo(0.92, 1);

        //Play music
    },
    update: function() {
        if(keySpace.isDown)
            this.game.state.start('gameState');
    }
}

var gameState = {
    

    preload: function () {
        var background = game.add.sprite(0, 0, 'bckgrnd'); // Menu bckgnd
        background.scale.setTo(0.92, 1);      
    },
    
    

    create: function () {     
        //  A simple background for our game
        var background = game.add.sprite(0, 0, 'bckgrnd');
        background.scale.setTo(0.92, 1);
        //Poop sprite
        var poop = game.add.sprite(500, 250, 'poop_01');
        poop.scale.setTo(0.40, 0.40);
        
        this.bulletPool = []
        for(var i = 0; i<10;i++){    
            this.bulletPool.push(new Bullet(this.game,200,200,'aid',1,'right'))
            this.bulletPool[i].kill();
            this.bulletPool[i].body.collideWorldBounds = false;       
            }
        
        this.aid = new Bullet(this.game,200,200,'aid',1,'down')
        var head = new Basic(this.game,0,0,'head');
        head.body.collideWorldBounds = false;
        var player = new Player(this.game,400,300,'isaac',3,head,this.bulletPool);
        
        player.addChild(head);
        head.place(-9,-35);


        var roomDat = [];
        roomDat[0] = [this.game,50,50,'poop_02']
        roomDat[1] = [this.game,150,150,'poop_03']
        roomDat[2] = [this.game,250,250,'poop_04']
        Room(this.game,roomDat);
            
    },
        
        update: function () {
            //Bullet collison V1
            for(var i = 0;i<this.bulletPool.length;i++)
                this.game.physics.arcade.collide(this.aid,this.bulletPool[i],onCollision);

            function onCollision(obj1,obj2){
                console.log("colision");
                obj2.kill();
            }

        }

       
}
