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

        game.load.image('turretEnemy','/images/turret.png',40,40)
        game.load.spritesheet('babyEnemy','/images/babyEnemy.png',30,30)

        //tests
        game.load.image('UiData','/images/UiData.PNG') //-#pray
        game.load.image('redPickUp','/images/redHeartPickup.png');//-#pray
        game.load.image('startScreen','/images/startScreen.PNG');//-#pray
        game.load.image('loseScreen','/images/loseScreen.png')
        game.load.image('poop','/images/poop.png');//-#pray
        game.load.image('wallenemy','/images/wallEnemy.png');
        game.load.image('rock','/images/rock.png')
        game.load.image('trophy','/images/end.png')
        game.load.audio('dungeon','/sound/royaltyFreeMusic.wav')

        game.load.image('winScreen','/images/winState.png')
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

        //Obstacles
            this.obstacles = []
            //room-1
                this.obstacles[0]= new Inmovable(this.game,945,140,'rock')
                this.obstacles[1]= new Inmovable(this.game,900,140,'rock')
                this.obstacles[2]= new Inmovable(this.game,900,185,'rock')

                this.obstacles[3]= new Inmovable(this.game,1455,140,'rock')
                this.obstacles[4]= new Inmovable(this.game,1410,140,'rock')
                this.obstacles[5]= new Inmovable(this.game,1455,185,'rock')
            //room-3
                this.obstacles[6]= new Inmovable(this.game,1755,740,'poop')
                this.obstacles[7]= new Inmovable(this.game,1700,785,'poop')
                this.obstacles[8]= new Inmovable(this.game,1755,785,'rock')

                this.obstacles[9]= new Inmovable(this.game,2200,740,'poop')
                this.obstacles[10]= new Inmovable(this.game,2255,785,'poop')
                this.obstacles[11]= new Inmovable(this.game,2195,785,'rock')


            
                this.obstacles[12]= new Inmovable(this.game,1700,970,'poop')
                this.obstacles[13]= new Inmovable(this.game,1755,970,'rock')
                this.obstacles[14]= new Inmovable(this.game,1755,1010,'poop')

                
                this.obstacles[15]= new Inmovable(this.game,2255,970,'poop')
                this.obstacles[16]= new Inmovable(this.game,2200,970,'rock')
                this.obstacles[17]= new Inmovable(this.game,2200,1010,'poop')

                //2500,750
            //rooom-4
                this.obstacles[18]= new Inmovable(this.game,2500,740,'rock')
                this.obstacles[19]= new Inmovable(this.game,2610,740,'rock')

                this.obstacles[20]= new Inmovable(this.game,3050,740,'rock')
                this.obstacles[21]= new Inmovable(this.game,2940,740,'rock')
                
                this.obstacles[22]= new Inmovable(this.game,2720,1010,'rock')
                this.obstacles[23]= new Inmovable(this.game,2830,1010,'rock')
            //room-7
                this.obstacles[23]= new Inmovable(this.game,1977,2074,'rock')

                this.obstacles[24]= new Inmovable(this.game,1977,2030,'rock')
                this.obstacles[25]= new Inmovable(this.game,1977,2120,'rock')

                this.obstacles[26]= new Inmovable(this.game,1933,2074,'rock')
                this.obstacles[27]= new Inmovable(this.game,2023,2074,'rock')

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

        
    

 
        this.pickUps = [];
            this.pickUps[0] = new Basic(this.game,0,0,'redPickUp');
            this.pickUps[1] = new Basic(this.game,0,0,'key');
            this.pickUps[2] = new Basic(this.game,0,0,'1up');
            this.pickUps[3] = new Basic(this.game,0,0,'redPickUp');

        for(var i = 0; i<this.pickUps.length;i++)this.pickUps[i].kill();

        this.trophy = new Basic(this.game,1200,2100,'trophy');
        music = game.add.audio('dungeon',1,true);
        
        music.play();
        

        
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

        //Enemies

            //this.enemies[room][enemiyNum]
            this.enemies = []
            for(var i = 0;i<9;i++)this.enemies[i] = [];
            //room-1
                this.enemies[1][0] = new WallEnemy(this.game,1200,140,'wallenemy',2,4,1,1,null,this.player,this.enemybulletPool)
                this.enemies[1][1] = new MeleeEnemy(this.game,1200,400,'isaac',3,3,1,1,null,this.player)
            //room-2
                this.enemies[2][0] = new WallEnemy(this.game,2270,235,'turretEnemy',0,3,1,2,null,this.player,this.enemybulletPool)
                this.enemies[2][1] = new WallEnemy(this.game,2270,335,'turretEnemy',0,3,1,2,null,this.player,this.enemybulletPool)
                this.enemies[2][2] = new RangeEnemy(this.game,2000,300,'babyEnemy',2,3,1,2,this.pickUps[0],this.player,this.enemybulletPool)
            //room-3
                this.enemies[3][0] = new MeleeEnemy(this.game,1700,740,'isaac',3,3,1,3,null,this.player)
                this.enemies[3][1] = new MeleeEnemy(this.game,2260,740,'isaac',3,3,1,3,null,this.player)
                this.enemies[3][2] = new MeleeEnemy(this.game,1700,1000,'isaac',3,3,1,3,null,this.player)
                this.enemies[3][3] = new MeleeEnemy(this.game,2260,1000,'isaac',3,3,1,3,null,this.player)
            //room-4
                this.enemies[4][0] = new WallEnemy(this.game,2553,743,'turretEnemy',0,3,1,4,null,this.player,this.enemybulletPool)
                this.enemies[4][1] = new WallEnemy(this.game,2993,743,'turretEnemy',0,3,1,4,null,this.player,this.enemybulletPool)
                this.enemies[4][2] = new WallEnemy(this.game,2773,1007,'turretEnemy',0,3,1,4,this.pickUps[1],this.player,this.enemybulletPool)
            //room-5
                this.treasure = new Treasure(this.game,3600,900,'treasure',this.pickUps[2])
            
            //room-6
                this.enemies[6][0] = new WallEnemy(this.game,2270,1435,'turretEnemy',0,3,1,6,null,this.player,this.enemybulletPool)
                this.enemies[6][1] = new WallEnemy(this.game,2270,1535,'turretEnemy',0,3,1,6,null,this.player,this.enemybulletPool)
                this.enemies[6][2] = new WallEnemy(this.game,1700,1435,'turretEnemy',0,3,1,6,null,this.player,this.enemybulletPool)
                this.enemies[6][3] = new WallEnemy(this.game,1700,1535,'turretEnemy',0,3,1,6,this.pickUps[0],this.player,this.enemybulletPool)
                this.enemies[6][4] = new RangeEnemy(this.game,2000,1600,'babyEnemy',2,3,1,6,null,this.player,this.enemybulletPool)

            //room-7
                this.enemies[7][0] = new WallEnemy(this.game,1933,2030,'turretEnemy',0,3,1,7,null,this.player,this.enemybulletPool)
                this.enemies[7][1] = new WallEnemy(this.game,2023,2030,'turretEnemy',0,3,1,7,null,this.player,this.enemybulletPool)
                this.enemies[7][2] = new WallEnemy(this.game,1933,2120,'turretEnemy',0,3,1,7,null,this.player,this.enemybulletPool)
                this.enemies[7][3] = new WallEnemy(this.game,2023,2120,'turretEnemy',0,3,1,7,this.pickUps[3],this.player,this.enemybulletPool)



        
            var enemihead = new Basic(this.game,0,0,'enemyHead');
            this.enemies[1][1].addChild(enemihead);
            enemihead.place(-5,-30);

            var MEone = new Basic(this.game,0,0,'enemyHead');
            this.enemies[3][0].addChild(MEone);
            MEone.place(-5,-30);

            var MEtwo = new Basic(this.game,0,0,'enemyHead');
            this.enemies[3][1].addChild(MEtwo);
            MEtwo.place(-5,-30);

            var MEthree = new Basic(this.game,0,0,'enemyHead');
            this.enemies[3][2].addChild(MEthree);
            MEthree.place(-5,-30);

            var MEfour = new Basic(this.game,0,0,'enemyHead');
            this.enemies[3][3].addChild(MEfour);
            MEfour.place(-5,-30);


        //Doors
            this.doors = [];
            this.doors[0] = new Doors(this.game,705,290,'door',1, this.enemies[0]);
            this.doors[1] = new Doors(this.game,870,290,'door',0, this.enemies[1]);
            this.doors[2] = new Doors(this.game,1505,290,'door',2, this.enemies[1]);
            this.doors[3] = new Doors(this.game,1670,290,'door',1, this.enemies[2]);

            this.doors[4] = new Doors(this.game,2000,465,'door',3, this.enemies[2]);
            this.doors[5] = new Doors(this.game,2000,710,'door',2, this.enemies[3]);

            this.doors[6] = new Doors(this.game,2310,885,'door',4, this.enemies[3]);
            this.doors[7] = new Doors(this.game,2470,885,'door',3, this.enemies[4]);
            this.doors[8] = new Doors(this.game,3105,885,'door',5, this.enemies[4]);
            this.doors[9] = new Doors(this.game,3270,885,'door',4, this.enemies[5]);

            this.doors[10] = new Doors(this.game,2000,1065,'door',6, this.enemies[3]);
            this.doors[11] = new Doors(this.game,2000,1313,'door',3, this.enemies[6]);
            this.doors[12] = new Doors(this.game,2000,1665,'door',7, this.enemies[6]);
            this.doors[13] = new Doors(this.game,2000,1910,'door',6, this.enemies[7]);

            this.doors[14] = new Doors(this.game,1670,2090,'door',8, this.enemies[7]);
            this.doors[15] = new Doors(this.game,1510,2090,'door',7, this.enemies[8]); 
            // for(var i = 0;i<this.doors.length;i++) this.doors[i].visible=false;


        

                

                

    },
        
    
    update: function () {

        //UI update
        this.textCoins.text = this.player.money;
        this.textKeys.text = this.player.doorKeys;
        this.textBombs.text = this.player.bombs;     

        for(var i= 0; i< this.enemies.length;i++)
            for(var j = 0; j< this.enemies[i].length;j++)
                this.game.physics.arcade.collide(this.enemies[i][j],this.player,hit)//enemies on player


        for(var i= 0; i< this.enemies.length;i++)
            for(var j = 0; j< this.enemies[i].length;j++)
             this.game.physics.arcade.collide(this.enemies[i][j],this.walls)//enemies on walls

        for(var i = 0;i<this.enemybulletPool.length;i++)
             this.game.physics.arcade.collide(this.player,this.enemybulletPool[1][i],bulletCollision);//enemy bullets on player

        for(var t = 0;t<this.bulletPool.length;t++)
            for(var i= 0; i< this.enemies.length;i++)
             for(var j = 0; j< this.enemies[i].length;j++)
                this.game.physics.arcade.collide(this.enemies[i][j],this.bulletPool[t],bulletCollision);//Bullets on enemies


        for(var i = 0;i<this.bulletPool.length;i++)//Player bullets on walls
            this.game.physics.arcade.collide(this.bulletPool[i],this.walls,wallCollision);

        for(var i = 0;i<this.enemybulletPool.length;i++)//Enemy bullets on walls
             this.game.physics.arcade.collide(this.enemybulletPool[1][i],this.walls,wallCollision);


        for(var i = 0;i<this.pickUps.length;i++)
            this.game.physics.arcade.collide(this.player,this.pickUps[i],loot);//player on PickUps


        for(var i = 0;i<this.doors.length;i++)
            this.game.physics.arcade.collide(this.doors[i],this.player,transition);//Player on doors


        // for(var i =0; i<this.enemies.length;i++)
        //     for(var j = 0;j<this.enemies.length;j++)
        //         if(j != i)  this.game.physics.arcade.collide(this.enemies[i],this.enemies[j]);

        this.game.physics.arcade.collide(this.player,this.walls);//player on walls

        this.game.physics.arcade.collide(this.player,this.treasure,loot);//player on treasure

        for(var i=0;i<this.obstacles.length;i++)
            this.game.physics.arcade.collide(this.player,this.obstacles[i])//player on rocks

        for(var i= 0; i< this.enemies.length;i++)
            for(var j = 0; j< this.enemies[i].length;j++)
                for(var p=0;p<this.obstacles.length;p++)
                    this.game.physics.arcade.collide(this.enemies[i][j],this.obstacles[p])//enemies on rocks
        

        for(var i = 0;i<this.bulletPool.length;i++)//Player bullets on rocks
            for(var p=0;p<this.obstacles.length;p++)
                this.game.physics.arcade.collide(this.bulletPool[i],this.obstacles[p],bulletOnPoop);

        for(var i = 0;i<this.enemybulletPool.length;i++)//Enemy bullets on rocks
            for(var p=0;p<this.obstacles.length;p++)
                this.game.physics.arcade.collide(this.enemybulletPool[1],this.obstacles[p],wallCollision)

        

        
        this.game.physics.arcade.collide(this.player,this.trophy,win)
        
       function win(obj1,obj2){
            this.game.state.start('winState')
       }
        function bulletOnPoop(obj1,obj2){
            if(obj2.key === 'poop'){
                obj2.hp -=obj1.dmg;
                if(obj2.hp===0)obj2.kill()}
            obj1.kill();
        }

        function loot(obj1,obj2){
            
            if(obj2.key === "treasure"){
                
                obj2.looted(obj1)
            }
            else {
                console.log(obj2);
                obj1.loot(obj2);
                obj2.destroy();
            }       
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

            if(obj1.active){
                 if(obj1.body.touching.right && obj2.key === "isaac")
                obj2.roomChange('left')
            else if(obj1.body.touching.left && obj2.key === "isaac")
                obj2.roomChange('right')
            else if(obj1.body.touching.down && obj2.key === "isaac")
                obj2.roomChange('up')
            else if(obj1.body.touching.up && obj2.key === "isaac")
                obj2.roomChange('down')

            obj2.room = obj1.roomNum;
            }       
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

var winState = {
    preload: function () {
        keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        
    },

    create: function () {
        console.log("Congrats!");
        var background = game.add.sprite(0, 0, 'winScreen'); // Menu bckgnd
        //background.scale.setTo(0.92, 1);

        //Play music
    },
    update: function() {
        if(keyR.isDown)
            this.game.state.start('gameState');
    }
}

