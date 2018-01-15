
function Basic(game,x,y,key){
    Phaser.Sprite.call(this,game,x,y,key);
    this.game.world.addChild(this);
    this.game.physics.arcade.enable(this)
    //this.body.collideWorldBounds = true;
    
}
Basic.prototype = Object.create(Phaser.Sprite.prototype); //We make the Basic class inherit from the Sprite Class
Basic.constructor = Basic;

Basic.prototype.hola = function(){
    console.log("hola");
}
Basic.prototype.place = function(x,y){
    this.x = x;
    this.y = y;
} //A function that places the sprite in the world*/

//Items that can move
    function Moveable(game,x,y,key,speed){

        Basic.apply(this,[game,x,y,key]);
        this.speed = speed;
        
    }
    //heritage
    Moveable.prototype = Object.create(Basic.prototype);
    Moveable.constructor = Moveable;

        ///Bullets
            function Bullet(game,x,y,key,speed,dir){
                Moveable.apply(this,[game,x,y,key,speed])
                this.dir = dir;
                this.f = this.alive;
                this.dmg = 1;
            }

            Bullet.prototype = Object.create(Moveable.prototype);
            Bullet.constructor = Bullet;
            Bullet.prototype.move = function(){
                if(this.dir == 'up'){
                    this.y -= this.speed; 
                }
                else if(this.dir == 'left'){
                    this.x -= this.speed;
                }
                else if(this.dir == 'down'){
                    this.y += this.speed;
                }
                else if(this.dir == 'right'){
                    this.x += this.speed;
                }
            }  
            Bullet.prototype.resete = function(x,y,speed,dir){
                this.reset(x,y)
                this.speed = speed;
                this.dir = dir;
            }
            ///////////REMOVE???//////////////////////
            Bullet.prototype.onCollision = function(){
                this.kill();
            }
        
            Bullet.prototype.update = function(){
                if(this.alive)this.move();
                if(this.x > 720 || this.x < 75)this.kill();
                if(this.y > 450 || this.y < 75)this.kill();
                if(this.f != this.alive){
                    //console.log("Changing State")
                    this.f = this.alive
                }
            }

        
        ///Player
            function Player(game,x,y,key,speed,head,tearsKey){
                Moveable.apply(this,[game,x,y,key,speed]);

                //Internal vars
                    this.head = head;
                    this.bulletPool = tearsKey; //Array or key??
                    this.bulletSpeed = 3.5;
                    //var dir;
                    this.FireRate = 500;
                    this.bulletTimer = 0;
                    this.i = 0;
                    this.shootingFlag = true;
                    this.body.collideWorldBounds = true;
                    this.flag = true;
                    this.money = 0;
                    this.bombs = 0;
                    this.doorKeys = 0;
                    this.iFrames = 750;
                    this.attackTimer = 0;

                    this.hp = 3;
                    this.maxHP = this.hp;
                    this.hpPool = [];
                    for(var i = 0; i<this.maxHP; i++){
                        this.hpPool[i] = this.game.add.sprite(20 + 45*i,20,'redHeart');
                        this.hpPool[i].frame = 0;
                    }
                    

                                
                //  Our two animations, walking left, right and up/down.
                    this.animations.add('left', [20, 21, 22,23,24,25,26,27,28,29], 20, true);
                    this.animations.add('right', [10, 11, 12,13,14,15,16,17,18,19], 20, true);
                    this.animations.add('up',[0,1,2,3,4,5,6,7,8,9],20,true);

                //Shooting animations
                    this.head.animations.add('down',[0,1,0],7,false);    
                    this.head.animations.add('right',[2,3,2],7,false);   
                    this.head.animations.add('up',[4,5,4],7,false);                          
                    this.head.animations.add('left',[6,7,6],7,false);    
                //Contorls
                    cursors = this.game.input.keyboard.createCursorKeys();
                    keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
                    keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                    keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                    keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                    
                //Debug
                    keyK = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
                    keyH = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
            }

            Player.prototype = Object.create(Moveable.prototype);
            Player.constructor = Player;
            //Player functions 
                Player.prototype.move = function(){    
            
                        if(keyA.isDown || keyD.isDown || keyW.isDown ||keyS.isDown){
                            if (keyA.isDown)
                            {
                                //  Move to the left
                                this.body.velocity.y=0;
                                this.body.velocity.x = -this.speed*40;
                                this.animations.play('left');
                                if(this.shootingFlag)
                                    this.head.frame = 6;
                            }
                            else if (keyD.isDown)
                            {
                                this.body.velocity.y=0;
                                //  Move to the right
                                this.body.velocity.x = this.speed*40;
                                this.animations.play('right');
                                if(this.shootingFlag)
                                    this.head.frame = 2;
                            } 
                            else if(keyW.isDown)
                            {
                                this.body.velocity.x=0;
                                this.body.velocity.y = -this.speed*40;
                                this.animations.play('up');
                                if(this.shootingFlag)
                                    this.head.frame = 4;
                            
                        
                            }
                            else if(keyS.isDown)
                            {
                                this.body.velocity.x=0;
                                this.body.velocity.y = this.speed*40;   
                                this.animations.play('up');
                                if(this.shootingFlag)
                                    this.head.frame = 0;
                            
                            }
                    
                        }
                        else{
                            //  Reset the players velocity (movement)
                            this.animations.stop();
                            this.frame = 0;
                            this.body.velocity.x=0;
                            this.body.velocity.y=0;
                            if(this.shootingFlag)  
                                this.head.frame = 0;
                            
                        }
                }         
                Player.prototype.shoot = function(){

                    if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown ||cursors.down.isDown || keyK.isDown||keyH.isDown){
                        if(this.game.time.now > this.bulletTimer){
                            if(this.i >= 10) this.i = 0;
                            if (cursors.left.isDown)
                            {
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'left')
                                this.head.animations.play('left');   
                                this.roomChange("left")
                                this.i++ 
                        
                            }
                            else if (cursors.right.isDown)
                            {
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'right') 
                                this.head.animations.play('right');
                                this.roomChange("right")
                                this.i++
                            
                            } 
                            else if(cursors.up.isDown)
                            {
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'up') 
                                this.head.animations.play('up');
                                this.roomChange("up")
                                this.i++                                                                 
                            } else if(cursors.down.isDown)
                            {   
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'down') 
                                this.head.animations.play('down');
                                this.roomChange("down")
                                this.i++           

                            }
                            if(keyK.isDown)this.takeDamage(1);
                            if(keyH.isDown)this.heal(1);
                            this.bulletTimer = this.game.time.now + this.FireRate;                  
                        }                  
                    }                
                }
                Player.prototype.update = function(){
                    if(cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp )
                        this.shootingFlag = true;
                        
                    this.move();
                    this.shoot();                
                }
                Player.prototype.takeDamage = function(dmg){
                    if(this.game.time.now > this.attackTimer){  
                        this.hp -= dmg;
                        console.log(this.hp)
                        for(var x = 0; x<dmg;x++){
                            this.hpPool[this.hp].frame = 2;
                        }   
                    this.attackTimer = this.game.time.now + this.iFrames;                  
                    }                
                }
                Player.prototype.heal = function(heal){
                    this.hp += heal;
                    if(this.hp>this.maxHP)this.hp = this.maxHP;
                    for(var i = 0; i<this.hp;i++){
                        this.hpPool[i].frame = 0;
                    }
                }

                Player.prototype.roomChange = function(side){
                    if(side === "right"){
                        this.x += 220;
                        game.camera.x += 800;
                    }
                    else if(side === "left"){
                        this.x -=220;
                        game.camera.x -= 800;
                    }
                    else if(side === "down"){
                        this.y += 300;
                        game.camera.y += 600;
                    }
                    else if(side === "up"){
                        this.y -= 300;
                        game.camera.y -= 600;
                    }
        

                }
                //WIP
                Player.prototype.changeBullets = function(Pool){

                    console.log(Pool);
                    if(this.flag){
                        console.log(Pool);
                        this.bulletPool = Pool;
                        console.log(this.bulletPool)
                        this.flag = !this.flag;
                    }
                    
                }
        

        ///Enemies
            function Enemy (game,x,y,key,speed,hp,/*target,*/damage){
                Moveable.apply(this,[game,x,y,key,speed]);
                this.hp = hp; //We set up the HP pf the enemie
                //this.target = target; //A reference to the target of the enemie, so we can get data form it
                this.dmg = damage;
            }
            //heritage
                Enemy.prototype = Object.create(Moveable.prototype)
                Enemy.constructor = Enemy

            ///If possible, create the different classes of enemies in a different doc, to avoid having too many thing in this one
            ///Melee Enemy
                function MeleeEnemy (game,x,y,key,speed,hp,damage,target){
                    Enemy.apply(this,[game,x,y,key,speed,hp,/*target,*/damage])
                    this.target = target;
                    console.log(target)
                    this.moveFlag = true;
                    
                }
                MeleeEnemy.prototype = Object.create(Enemy.prototype)
                MeleeEnemy.constructor = MeleeEnemy //We set up the heritage from the enemy class

                MeleeEnemy.prototype.movement = function(){
                    var x,y;
                    x = this.target.x - this.x;
                    if(x <0) x = x*-1;

                    y = this.target.y - this.y;
                    if(y <0) y = y*-1;

                    if(x > y )this.moveFlag = true;
                    else this.moveFlag = false;

                    if(this.moveFlag){
                        if(this.x === this.target.x){}
                        else if (this.x < this.target.x){
                            this.body.velocity.x = this.speed*20;
                            this.body.velocity.y=0;
                        }
                        else if(this.x > this.target.x){
                            this.body.velocity.y=0;
                            this.body.velocity.x = -this.speed*20;
                        }
                    }
                    else {
                        if(this.y === this.target.y){}
                        else if (this.y < this.target.y){
                            this.body.velocity.x=0;
                            this.body.velocity.y = this.speed*20; 
                        }
                        else if(this.y > this.target.y){
                            this.body.velocity.x=0;
                            this.body.velocity.y = -this.speed*20;
                        }
                    }
                }

               
                MeleeEnemy.prototype.update = function(){
                    if(this.hp > 0){
                        this.movement();
                    }
                    else this.kill();
                }//The update of the class


            //Range Enemy
                function RangeEnemy(game,x,y,key,speed,hp,damage,target,bulletPool){
                    Enemy.apply(this,[game,x,y,key,speed,hp,/*target,*/damage])
                    this.target = target;
                    console.log(target)
                    this.moveFlag = true;
                    this.bulletTimer=0;
                    this.bulletSpeed = 2.5;
                    this.FireRate = 1000;
                    this.i = 0;
                    this.bulletPool = bulletPool;
                    this.inRange = false;
                }

                RangeEnemy.prototype = Object.create(Enemy.prototype)
                RangeEnemy.constructor = RangeEnemy 

                //Functions
                    RangeEnemy.prototype.movement = function(){
                        var x,y;
                        x = this.x - this.target.x;
                        y = this.y - this.target.y;

                        if((x>-15 && x<15)|| (y>-15 && y<15)){
                            this.body.velocity.y=0;
                            this.body.velocity.x=0;
                            this.inRange = true;
                        }
                        else{
                            this.inRange = false;
                            x = this.target.x - this.x;
                            if(x <0) x = x*-1;
    
                            y = this.target.y - this.y;
                            if(y <0) y = y*-1;
    
                            if(x < y )this.moveFlag = true;
                            else this.moveFlag = false;
    
                            if(this.moveFlag){
                                if(this.x === this.target.x){}
                                else if (this.x < this.target.x){
                                    this.body.velocity.x = this.speed*20;
                                    this.body.velocity.y=0;
                                }
                                else if(this.x > this.target.x){
                                    this.body.velocity.y=0;
                                    this.body.velocity.x = -this.speed*20;
                                }
                            }
                            else {
                                if(this.y === this.target.y){}
                                else if (this.y < this.target.y){
                                    this.body.velocity.x=0;
                                    this.body.velocity.y = this.speed*20; 
                                }
                                else if(this.y > this.target.y){
                                    this.body.velocity.x=0;
                                    this.body.velocity.y = -this.speed*20;
                                }
                            }
                        }
                        
                    }
                    RangeEnemy.prototype.shoot = function(){
                        {
                            if(this.game.time.now > this.bulletTimer){
                                //console.log("Hola");
                                if(this.i >= 10) this.i = 0;
                                if(this.inRange){
                                    
                                }
                                if (this.x > this.target.x && ((this.y-20) <= this.target.y)&& ((this.y+20) >= this.target.y)){
                                    console.log("left")
                                    //this.shootingFlag = false;
                                    this.bulletPool[this.i].resete(this.x,this.y,this.bulletSpeed,'left')
                                    //this.head.animations.play('left');   
                                    this.i++     
                                }
                                if (this.x < this.target.x  && ((this.y-20) <= this.target.y)&& ((this.y+20) >= this.target.y)){
                                    console.log("right")
                                    //this.shootingFlag = false;
                                    this.bulletPool[this.i].resete(this.x,this.y,this.bulletSpeed,'right') 
                                    //this.head.animations.play('right');
                                    this.i++                            
                                } 
                                //console.log("X: " + this.x + "   Y: " + this.y)
                                //console.log("tarX: " + this.target.x + "   tarY: " + this.target.y)
                                if(this.y > this.target.y && ((this.x-20) <= this.target.x)&& ((this.x+20) >= this.target.x)){
                                    console.log("up")
                                    //this.shootingFlag = false;
                                    this.bulletPool[this.i].resete(this.x,this.y,this.bulletSpeed,'up') 
                                    //this.head.animations.play('up');
                                    this.i++                                                                 
                                } 
                                if(this.y < this.target.y  && ((this.x-20) <= this.target.x)&& ((this.x+20) >= this.target.x)){   
                                    console.log("down")
                                    //this.shootingFlag = false;
                                    this.bulletPool[this.i].resete(this.x,this.y,this.bulletSpeed,'down') 
                                    //this.head.animations.play('down');
                                    this.i++           
                                }
                                this.bulletTimer = this.game.time.now + this.FireRate;                  
                            }                                     
                        }
                    }

                    RangeEnemy.prototype.update = function(){
                        if(this.hp > 0){
                            this.movement();
                            this.shoot();
                        }
                        else this.kill();
                    }//The update of the class
                
    //heritage

//Non movable items
    
    function Inmovable(game,x,y,key){
        
        Basic.apply(this,[game,x,y,key]);
        this.body.immovable = true;
        this.body.moves = false;
    }
    Inmovable.prototype = Object.create(Basic.prototype);
    Inmovable.constructor = Inmovable;
