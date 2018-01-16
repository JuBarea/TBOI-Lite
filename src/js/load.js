var loadState = {


    preload: function () {

        this.game.load.baseURL = 'https://JuBarea.github.io/TBOI-Lite/src/';
        this.game.load.crossOrigin = 'anonymous';

        

        game.load.spritesheet('isaac','/images/movement.png',32,19);
        game.load.spritesheet('head','/images/headAnim.png',45,40);
        game.load.image('enemyHead','/images/enemyHead.png');
        game.load.image('tears','/images/BulletTemp.png');
        game.load.image('enemyTears','/images/enemyTears.png');
        game.load.image('wall','/images/muroH.png')
        // game.load.image('bckgrnd','/images/StartingRoom.png');
        game.load.image('bckgrnd','/images/test.png');
        game.load.image('door','/images/tp.png');
        game.load.image('treasure','/images/treasure.png');
        game.load.image('key','/images/key.png');
        game.load.image('1up','/images/1up.png');
        game.load.spritesheet('redHeart','/images/redHeart.png',42,42);//HP
        game.load.image('coin','/images/coin.png')

        game.load.spritesheet('turretEnemy','/images/turret.png',45,66)
        game.load.spritesheet('babyEnemy','/images/babyEnemy.png',30,30)

        //tests
        game.load.image('UiData','/images/UiData.PNG') //-#pray
        game.load.image('redPickUp','/images/redHeartPickup.png');//-#pray
        game.load.image('startScreen','/images/startScreen.PNG');//-#pray
        game.load.image('loseScreen','/images/loseScreen.png')
        game.load.image('poop','/images/poop.png');//-#pray
        //game.load.image('arrowTears','/images/arrowtears.png');
       

        //game.world.setBounds(85,90,635,370);
        game.camera.bounds = new Phaser.Rectangle(0, 0, 4000, 2400)
        //game.scale.setGameSize(4000, 2400);
         //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log("Loading");
    },

    create: function () {
        console.log("Loading menu");
        this.game.state.start('menu');
      }
}

var menuState = {
    preload: function () {
        keySpace = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
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
        //background.scale.setTo(0.92, 1);      
    },
    
    create: function () {     
        //  A simple background for our game
        // var background = game.add.sprite(0, 0, 'bckgrnd');
        // background.scale.setTo(0.92, 1);

        //UI
            this.UiData = game.add.sprite(20,60,'UiData');
            this.UiData.fixedToCamera = true;
            this.textCoins = game.add.text(50, 65, '0', { fill: 'white'});
            this.textCoins.fontSize = '12pt';
            this.textCoins.fixedToCamera = true;
            this.textKeys = game.add.text(50, 115, '0', {fill: 'white'});
            this.textKeys.fontSize = '12pt';
            this.textKeys.fixedToCamera = true;
            this.textBombs = game.add.text(50, 90, '0', { fill: 'white'});

            this.textBombs.fontSize = '12pt';
            this.textBombs.fixedToCamera = true;

        //Doors
            this.doors = [];
            this.doors[0] = new Inmovable(this.game,705,290,'door');
            this.doors[1] = new Inmovable(this.game,870,290,'door');
            this.doors[2] = new Inmovable(this.game,1505,290,'door');
            this.doors[3] = new Inmovable(this.game,1670,290,'door');

            this.doors[4] = new Inmovable(this.game,2000,465,'door');
            this.doors[5] = new Inmovable(this.game,2000,710,'door');

            this.doors[6] = new Inmovable(this.game,2310,885,'door');
            this.doors[7] = new Inmovable(this.game,2470,885,'door');
            this.doors[8] = new Inmovable(this.game,3105,885,'door');
            this.doors[9] = new Inmovable(this.game,3270,885,'door');

            this.doors[10] = new Inmovable(this.game,2000,1065,'door');
            this.doors[11] = new Inmovable(this.game,2000,1313,'door');
            this.doors[12] = new Inmovable(this.game,2000,1665,'door');
            this.doors[13] = new Inmovable(this.game,2000,1910,'door');

            this.doors[14] = new Inmovable(this.game,1670,2090,'door');
            this.doors[15] = new Inmovable(this.game,1505,2090,'door'); 
            //for(var i = 0;i<this.doors.length;i++) this.doors[i].visible=false;
    

        //console.log(this.poop);
        this.pickUps = [];
            this.pickUps[0] = new Basic(this.game,1000,400,'redPickUp');
            this.pickUps[1] = new Basic(this.game,1400,400,'key');
            this.pickUps[2] = new Basic(this.game,1400,400,'1up')
 
        this.pickUps[2].kill();
        this.treasure = new Treasure(this.game,1085,260,'treasure',this.pickUps[2])
        //PlayerBullets    
            this.bulletPool = []
            for(var i = 0; i<10;i++){    
                this.bulletPool.push(new Bullet(this.game,200,200,'tears',1,'right'))
                this.bulletPool[i].kill();
                //this.bulletPool[i].body.collideWorldBounds = false;       
            }
        //Enemy Bullets
            this.enemybulletPool = []
            this.enemybulletPool[0] = 0;
            this.enemybulletPool[1] = [];
            for(var i = 0; i<10;i++){    
                this.enemybulletPool[1].push(new Bullet(this.game,200,200,'enemyTears',1,'right'))
                this.enemybulletPool[1][i].kill();
                this.enemybulletPool[1][i].body.collideWorldBounds = false;       
            }
        

        //Walls
            this.walls = game.add.group();
            this.walls.enableBody = true;
            //World Border
            this.walls.create(0,30,'wall')
            this.walls.children[0].scale.setTo(3,1)
            this.walls.create(0,2267,'wall')
            this.walls.children[1].scale.setTo(3,1)
            this.walls.create(0,465,'wall')

            //Room horizontal border
            this.walls.create(2035,465,'wall')
            this.walls.create(0,1060,'wall')
            this.walls.create(2035,1060,'wall')
            this.walls.create(0,1660,'wall')
            this.walls.create(2035,1660,'wall')

            this.walls.create(1505,330,'wall')
            this.walls.children[8].scale.setTo(0.24,17.5)

            this.walls.create(0,0,'wall')
            this.walls.children[9].scale.setTo(0.125,6)
            this.walls.create(705,0,'wall')
            this.walls.children[10].scale.setTo(0.24,2.75)
            this.walls.create(705,325,'wall')
            this.walls.children[11].scale.setTo(0.24,20)

            this.walls.create(1505,0,'wall')
            this.walls.children[12].scale.setTo(0.24,2.75)

            this.walls.create(1505,2120,'wall')
            this.walls.children[13].scale.setTo(0.24,2.75)

            this.walls.create(2305,925,'wall')
            this.walls.children[14].scale.setTo(0.24,17.5)

            this.walls.create(3905,600,'wall')
            this.walls.children[15].scale.setTo(0.125,6)

            this.walls.create(3105,600,'wall')
            this.walls.children[16].scale.setTo(0.24,2.75)

            this.walls.create(3105,925,'wall')
            this.walls.children[17].scale.setTo(0.24,2.75)

            this.walls.create(2305,0,'wall')
            this.walls.children[18].scale.setTo(0.24,8.75)

            //4 mas y empujar puertas mas al fondo


            for(var i = 0;i<this.walls.length;i++){
                this.walls.children[i].body.immovable = true;
                this.walls.children[i].body.moves = false;
                //this.walls.children[i].visible = false;
                if(i>=2 && i <8) this.walls.children[i].scale.setTo(2.49,2.7)

            }
            

           
            
            

        
        
        var head = new Basic(this.game,0,0,'head');
        head.body.collideWorldBounds = false;
        this.player = new Player(this.game,400,300,'isaac',5,head,this.bulletPool);
        this.player.body.collideWorldBounds = false;
        
        
        this.player.addChild(head);
        head.place(-9,-35);

        this.enemies = []
        this.enemies[0] = new RangeEnemy(this.game,600,150,'turretEnemy',0,3,1,this.player,this.enemybulletPool)
        this.enemies[1] = new MeleeEnemy(this.game,400,400,'isaac',4,3,1,this.player)
        this.enemies[2] = new RangeEnemy(this.game,150,190,'babyEnemy',2,3,1,this.player,this.enemybulletPool)
        this.enemies[3] = new WallEnemy(this.game,125,125,'poop',2,3,1,this.player,this.enemybulletPool)


        
        var enemihead = new Basic(this.game,0,0,'enemyHead');
        this.enemies[1].addChild(enemihead);
        enemihead.place(-5,-30);
    },
        
    
    update: function () {

        //UI update
        this.textCoins.text = this.player.money;
        this.textKeys.text = this.player.doorKeys;
        this.textBombs.text = this.player.bombs;        

        for(var j = 0; j< this.enemies.length;j++)
            this.game.physics.arcade.collide(this.enemies[j],this.player,hit)

        for(var j = 0; j< this.enemies.length;j++)
            this.game.physics.arcade.collide(this.enemies[j],this.walls)

        for(var i = 0;i<this.enemybulletPool.length;i++)
             this.game.physics.arcade.collide(this.player,this.enemybulletPool[i],bulletCollision);

        for(var i = 0;i<this.bulletPool.length;i++)
            for(var j = 0; j< this.enemies.length;j++)
                this.game.physics.arcade.collide(this.enemies[j],this.bulletPool[i],bulletCollision);

        for(var i = 0;i<this.bulletPool.length;i++)//Player bullets on walls
            this.game.physics.arcade.collide(this.bulletPool[i],this.walls,wallCollision);
        for(var i = 0;i<this.enemybulletPool.length;i++)//Enemy bullets on walls
             this.game.physics.arcade.collide(this.enemybulletPool[i],this.walls,wallCollision);


        for(var i = 0;i<this.pickUps.length;i++)
            this.game.physics.arcade.collide(this.player,this.pickUps[i],loot);


        for(var i = 0;i<this.doors.length;i++)
            this.game.physics.arcade.collide(this.doors[i],this.player,transition);


        for(var i =0; i<this.enemies.length;i++)
            for(var j = 0;j<this.enemies.length;j++)
                if(j != i)  this.game.physics.arcade.collide(this.enemies[i],this.enemies[j]);

        this.game.physics.arcade.collide(this.player,this.walls);

        this.game.physics.arcade.collide(this.player,this.treasure,loot);

        


        function loot(obj1,obj2){
            
            if(obj2.key === "treasure"){
                
                obj2.looted(obj1)
            }
            else obj1.loot(obj2);

           

                
        }


        function wallCollision(obj1,obj2){
            obj1.kill();
        }
            
        function bulletCollision(obj1,obj2){    
            obj1.takeDamage(obj2.dmg);
            obj2.onCollision();
        }
 
        function hit(obj1,obj2){
            obj2.takeDamage(obj1.dmg);
        }

        function transition(obj1,obj2){

            if(obj1.body.touching.right && obj2.key === "isaac")
                obj2.roomChange('left')
            else if(obj1.body.touching.left && obj2.key === "isaac")
                obj2.roomChange('right')
            else if(obj1.body.touching.down && obj2.key === "isaac")
                obj2.roomChange('up')
            else if(obj1.body.touching.up && obj2.key === "isaac")
                obj2.roomChange('down')
        }


        if(this.player.hp <= 0)this.game.state.start('loseState');
    }

       
}

var loseState = {
    preload: function () {
        keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        
    },

    create: function () {
        console.log("You DIED!");
        var background = game.add.sprite(0, 0, 'loseScreen'); // Menu bckgnd
        //background.scale.setTo(0.92, 1);

        //Play music
    },
    update: function() {
        if(keyR.isDown)
            this.game.state.start('gameState');
    }
}

