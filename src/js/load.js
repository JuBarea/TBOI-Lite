var loadState = {


    preload: function () {

        // this.game.load.baseURL = 'https://JuBarea.github.io/TBOI-Lite/src/';
        // this.game.load.crossOrigin = 'anonymous';

        

        game.load.spritesheet('isaac','/images/movement.png',32,19);
        game.load.spritesheet('head','/images/headAnim.png',45,40);
        game.load.image('aid','/images/BulletTemp.png');
        game.load.spritesheet('redHeart','/images/redHeart.png',42,42);    
        game.load.image('coin','/images/coin.png')
        // game.load.image('bckgrnd','/images/StartingRoom.png');
        game.load.image('bckgrnd','/images/test.png');
        game.load.image('door','/images/tp.png');
        
        //tests
        game.load.image('UiData','/images/UiData.PNG') //-#pray
        game.load.image('redPickUp','/images/redHeartPickup.png');//-#pray
        game.load.image('startScreen','/images/startScreen.PNG');//-#pray
        game.load.image('poop','/images/poop.png');//-#pray
        //game.load.image('arrowTears','/images/arrowtears.png');
       

        //game.world.setBounds(85,90,635,370);
        game.camera.bounds = new Phaser.Rectangle(0, 0, 4000, 2400)
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

        
        var UiData = game.add.sprite(20,60,'UiData');
        this.textCoins = game.add.text(50, 65, '0', { fill: 'white'});
        this.textCoins.fontSize = '12pt';
        this.textKeys = game.add.text(50, 90, '0', { fill: 'white'});
        this.textKeys.fontSize = '12pt';
        this.textBombs = game.add.text(50, 115, '0', {fill: 'white'});
        this.textBombs.fontSize = '12pt';
        //Poop sprite
            this.poopsies = [];
            this.poopsies[0] = new Inmovable(this.game,500, 100, 'poop');
            this.poopsies[0].hp = 3
            this.poopsies[1] = new Inmovable(this.game,500, 200, 'poop');
            this.poopsies[1].hp = 3
            this.poopsies[2] = new Inmovable(this.game,500, 300, 'poop');
            this.poopsies[2].hp = 3
            this.poopsies[3] = new Inmovable(this.game,500, 400, 'poop');
            this.poopsies[3].hp = 3

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
    

        //console.log(this.poop);
        this.pickUps = [];
            this.pickUps[0] = new Basic(this.game,200,250,'redPickUp');
            this.pickUps[1] = new Basic(this.game,200,350,'coin');
 
        this.bulletPool = []
        for(var i = 0; i<10;i++){    
            this.bulletPool.push(new Bullet(this.game,200,200,'aid',1,'right'))
            this.bulletPool[i].kill();
            this.bulletPool[i].body.collideWorldBounds = false;       
        }
        
        this.enemybulletPool = []
        for(var i = 0; i<10;i++){    
            this.enemybulletPool.push(new Bullet(this.game,200,200,'aid',1,'right'))
            this.enemybulletPool[i].kill();
            this.enemybulletPool[i].body.collideWorldBounds = false;       
        }
        


        var head = new Basic(this.game,0,0,'head');
        head.body.collideWorldBounds = false;
        this.player = new Player(this.game,400,300,'isaac',4,head,this.bulletPool);
        this.player.body.collideWorldBounds = false;
        
        
        this.player.addChild(head);
        head.place(-9,-35);
        

        

        this.enemy = new RangeEnemy(this.game,300,400,'poop',1,3,1,this.player,this.enemybulletPool)
    },
        
    update: function () {
        //this.game.physics.arcade.collide(this.player,this.bigPoop,null,this)
        //Bullet collison V1
        for(var i = 0;i<this.bulletPool.length;i++)
            for(var j = 0; j<this.poopsies.length; j++)
                this.game.physics.arcade.collide(this.poopsies[j],this.bulletPool[i],bulletCollision);                
        
        this.game.physics.arcade.collide(this.enemy,this.player,hit)
        for(var i = 0;i<this.enemybulletPool.length;i++)
             this.game.physics.arcade.collide(this.player,this.enemybulletPool[i],bulletCollision);

        for(var i = 0;i<this.bulletPool.length;i++)
            this.game.physics.arcade.collide(this.enemy,this.bulletPool[i],bulletCollision);


        for(var i = 0;i<this.poopsies.length;i++)
        this.game.physics.arcade.collide(this.poopsies[i],this.player);

        for(var i = 0;i<this.pickUps.length;i++)
            this.game.physics.arcade.collide(this.pickUps[i],this.player,pickUpCode);


        for(var i = 0;i<this.doors.length;i++)
            this.game.physics.arcade.collide(this.doors[i],this.player,transition);

        this.textCoins.text = this.player.money;
        this.textKeys = this.player.bombs;
        this.textBombs = this.player.doorKeys;
            
        function pickUpCode(obj1,obj2){
            if(obj1.key === 'redPickUp')
                obj2.heal(1);
            else if(obj1.key === 'coin'){
                obj2.money++;
                
            }
            else if(obj1.key === 'keyPickUp'){
                obj2.doorKeys++;
            }
            else if(obj1.key === 'bomb'){
                obj2.bombs++;
            }
            obj1.kill();
        }
            
        function bulletCollision(obj1,obj2){    
            if(obj1.key === "isaac") obj1.takeDamage(obj2.dmg);        
            else {
            obj1.hp -= obj2.dmg;
            if(obj1.hp === 0) obj1.kill();
            }
            obj2.kill();
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

    }

       
}
