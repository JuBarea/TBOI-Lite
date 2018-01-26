
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
            Bullet.prototype.resete = function(x,y,speed,dir,dmg){
                this.reset(x,y)
                this.speed = speed;
                this.dir = dir;
                this.dmg = dmg;
            }
            ///////////REMOVE???//////////////////////
            Bullet.prototype.onCollision = function(){
                this.kill();
            }
        
            Bullet.prototype.update = function(){
                if(this.alive)this.move();
                // if(this.x > 720 || this.x < 75)this.kill();
                // if(this.y > 450 || this.y < 75)this.kill();
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
                    this.room = 0;
                    this.dmg = 1;
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
                        this.hpPool[i].fixedToCamera = true;
                    }
                    

                                
                //  Our two animations, walking left, right and up/down.
                    this.animations.add('left', [20, 21, 22,23,24,25,26,27,28,29], 25, true);
                    this.animations.add('right', [10, 11, 12,13,14,15,16,17,18,19], 25, true);
                    this.animations.add('up',[0,1,2,3,4,5,6,7,8,9],25,true);

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
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'left',this.dmg)
                                this.head.animations.play('left');   
                                
                                this.i++ 
                        
                            }
                            else if (cursors.right.isDown)
                            {
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'right',this.dmg) 
                                this.head.animations.play('right');
                                
                                this.i++
                            
                            } 
                            else if(cursors.up.isDown)
                            {
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'up',this.dmg) 
                                this.head.animations.play('up');
                                
                                this.i++                                                                 
                            } else if(cursors.down.isDown)
                            {   
                                this.shootingFlag = false;
                                this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'down',this.dmg) 
                                this.head.animations.play('down');
                                
                                this.i++           

                            }
                            if(keyK.isDown)this.takeDamage(1);
                            if(keyH.isDown)this.increaseHP(2);
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
                Player.prototype.increaseHP = function(hpIncrease){

                    this.maxHP += hpIncrease;
                    this.hp +=hpIncrease;
                    for(var i = 0; i<this.maxHP; i++){
                        this.hpPool[i] = this.game.add.sprite(20 + 45*i,20,'redHeart');
                        if(i < this.hp)this.hpPool[i].frame = 0;
                        else this.hpPool[i].frame = 2;
                        this.hpPool[i].fixedToCamera = true;
                    }
                    
                }
                Player.prototype.loot = function(obj){
                    if(obj.key === 'redPickUp')
                        this.heal(1);
                    else if(obj.key === 'coin'){
                        this.money++; 
                    }
                    else if(obj.key === 'key'){
                        this.doorKeys++;  
                        console.log( this.doorKeys)
                    }
                    else if(obj.key === '1up'){
                        this.increaseHP(1);
                    }
                    // obj.kill();
                    
                }
                
        

        ///Enemies
            function Enemy (game,x,y,key,speed,hp,/*target,*/damage,room,loot){
                Moveable.apply(this,[game,x,y,key,speed]);
                this.hp = hp; //We set up the HP pf the enemie
                this.loot = loot;
                this.dmg = damage;
                this.room = room;
            }
            //heritage
                Enemy.prototype = Object.create(Moveable.prototype)
                Enemy.constructor = Enemy

                Enemy.prototype.takeDamage = function(dmg){
                    this.hp -= dmg;
                    if(this.hp <= 0) this.kill();
                }

            ///If possible, create the different classes of enemies in a different doc, to avoid having too many thing in this one
            ///Melee Enemy
                function MeleeEnemy (game,x,y,key,speed,hp,damage,room,loot,target){
                    Enemy.apply(this,[game,x,y,key,speed,hp,/*target,*/damage,room,loot])
                    this.target = target;
                    
                    this.moveFlag = true;

                    this.animations.add('left', [20, 21, 22,23,24,25,26,27,28,29], 20, true);
                    this.animations.add('right', [10, 11, 12,13,14,15,16,17,18,19], 20, true);
                    this.animations.add('up',[0,1,2,3,4,5,6,7,8,9],20,true);
                    
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
                            this.animations.play('right');
                            this.body.velocity.y=0;
                        }
                        else if(this.x > this.target.x){
                            this.body.velocity.y=0;
                            this.body.velocity.x = -this.speed*20;
                            this.animations.play('left');
                        }
                    }
                    else {
                        if(this.y === this.target.y){}
                        else if (this.y < this.target.y){
                            this.body.velocity.x=0;
                            this.body.velocity.y = this.speed*20; 
                            this.animations.play('up');
                        }
                        else if(this.y > this.target.y){
                            this.body.velocity.x=0;
                            this.body.velocity.y = -this.speed*20;
                            this.animations.play('up');
                        }
                    }
                }         
                MeleeEnemy.prototype.update = function(){

                    if(this.room === this.target.room){
                        if(this.hp > 0){
                            this.movement();
                        }
                        else{
                            if(this.loot != null){
                                console.log(1);
                                this.loot.reset(this.x,this.y)
                                this.loot = null;
                            }
                            
                            this.kill();
                            
                        }  
                    }
                }//The update of the class

            //Range Enemy
                function RangeEnemy(game,x,y,key,speed,hp,damage,room,loot,target,bulletPool){
                    Enemy.apply(this,[game,x,y,key,speed,hp,/*target,*/damage,room,loot])
                    this.target = target;

                    this.moveFlag = true;
                    this.bulletTimer=0;
                    this.bulletSpeed = 2.5;
                    this.FireRate = 1000;
                    this.i = 0;
                    this.bulletPool = bulletPool;
                    this.inRange = false;

                    this.animations.add('shoot', [1,1,0], 2, false);
                    this.frame = 0;
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
                        
                    }
                    RangeEnemy.prototype.shoot = function(){
                        {
                            if(this.game.time.now > this.bulletTimer){
                                
                                if(this.bulletPool[0] >= 10) this.bulletPool[0]  = 0;
                                
                                if (this.x > this.target.x && ((this.y-20) <= this.target.y)&& ((this.y+20) >= this.target.y)){
                                    this.animations.play('shoot'); 
                                    this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y,this.bulletSpeed,'left',this.dmg)
                                    this.bulletPool[0]++    
                                    
                                }
                                if (this.x < this.target.x  && ((this.y-20) <= this.target.y)&& ((this.y+20) >= this.target.y)){
                                    this.animations.play('shoot');
                                    this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y,this.bulletSpeed,'right',this.dmg) 
                                    this.bulletPool[0]++  
                                                              
                                } 
                                if(this.y > this.target.y && ((this.x-20) <= this.target.x)&& ((this.x+20) >= this.target.x)){
                                    this.animations.play('shoot');
                                    this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y,this.bulletSpeed,'up',this.dmg) 
                                    this.bulletPool[0]++  
                                                                                                   
                                } 
                                if(this.y < this.target.y  && ((this.x-20) <= this.target.x)&& ((this.x+20) >= this.target.x)){   
                                    this.animations.play('shoot');
                                    this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y,this.bulletSpeed,'down',this.dmg) 
                                    this.bulletPool[0]++    
                                           
                                }
                                this.bulletTimer = this.game.time.now + this.FireRate;                  
                            }                                     
                        }
                    }

                    RangeEnemy.prototype.update = function(){
                        if(this.room === this.target.room){
                            if(this.hp > 0){
                            this.movement();
                            this.shoot();
                            }
                        else{
                            if(this.loot != null){
                                console.log(1);
                                this.loot.reset(this.x,this.y)
                                this.loot = null;
                            }
                            this.kill();
                            }
                        
                        }
                        
                    }//The update of the class
                
    
    
    
        //Wall Enemy
            function WallEnemy(game,x,y,key,speed,hp,damage,room,loot,target,bulletPool){
                Enemy.apply(this,[game,x,y,key,speed,hp,/*target,*/damage,room,loot])
                this.target = target;

                this.moveFlag = true;
                this.bulletTimer=0;
                this.bulletSpeed = 2.5;
                this.FireRate = 1000;
                this.i = 0;
                this.bulletPool = bulletPool;
                this.inRange = false;
            }
        
            WallEnemy.prototype = Object.create(Enemy.prototype)
            WallEnemy.constructor = WallEnemy 

              //Functions
                WallEnemy.prototype.movement = function(){
                    if(this.target.x > (this.x + 10))  this.body.velocity.x = this.speed*40;
                    else if(this.target.x < (this.x - 10))  this.body.velocity.x = -this.speed*40;
                    else this.body.velocity.x = 0;
                }
                WallEnemy.prototype.shoot = function(){
                    {
                        if(this.game.time.now > this.bulletTimer){
                            
                            if(this.bulletPool[0] >= 10) this.bulletPool[0]  = 0;
                            
                            if (this.x > this.target.x && ((this.y-20) <= this.target.y)&& ((this.y+20) >= this.target.y)){
                            
                                this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y+5,this.bulletSpeed,'left',this.dmg)
                                this.bulletPool[0]++    
                                
                            }
                            if (this.x < this.target.x  && ((this.y-20) <= this.target.y)&& ((this.y+20) >= this.target.y)){
                                this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y+5,this.bulletSpeed,'right',this.dmg) 
                                this.bulletPool[0]++  
                                                        
                            } 
                            if(this.y > this.target.y && ((this.x-20) <= this.target.x)&& ((this.x+20) >= this.target.x)){
                                this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y+5,this.bulletSpeed,'up',this.dmg) 
                                this.bulletPool[0]++  
                                                                                            
                            } 
                            if(this.y < this.target.y  && ((this.x-20) <= this.target.x)&& ((this.x+20) >= this.target.x)){   
                                this.bulletPool[1][this.bulletPool[0]].resete(this.x,this.y+5,this.bulletSpeed,'down',this.dmg) 
                                this.bulletPool[0]++    
                                    
                            }
                            this.bulletTimer = this.game.time.now + this.FireRate;                  
                        }                                     
                    }
                }

                WallEnemy.prototype.update = function(){
                    if(this.room === this.target.room){
                        if(this.hp > 0){
                            this.movement();
                            this.shoot();
                        }
                        else{
                            if(this.loot != null){
                                console.log(1);
                                this.loot.reset(this.x,this.y)
                                this.loot = null;
                            }
                            this.kill();
                            } 
                    }
                
            }//The update of the class

    
                    //heritage

//Non movable items
    //Inmovable
    function Inmovable(game,x,y,key){
        
        Basic.apply(this,[game,x,y,key]);
        this.body.immovable = true;
        this.body.moves = false;
        this.hp = 2;
    }
    Inmovable.prototype = Object.create(Basic.prototype);
    Inmovable.constructor = Inmovable;

    function PickUp(game,x,y,key,amount){
        
        PickUp.apply(this,[game,x,y,key]);
        this.amount = amount; //Amount of healing/money/keys
        
    }
    PickUp.prototype = Object.create(Basic.prototype);
    PickUp.constructor = PickUp;

        //Treasure
            function Treasure(game,x,y,key,loot){
                
                Inmovable.apply(this,[game,x,y,key]);
                this.loot = loot;
            }
            Treasure.prototype = Object.create(Inmovable.prototype);
            Treasure.constructor = Treasure;

            Treasure.prototype.looted = function(obj){
                if(obj.doorKeys > 0){       
                    obj.doorKeys--;
                    this.loot.reset(this.x,this.y-10);
                    this.kill();
                }
            }


    function Doors(game,x,y,key,roomNum,roomTrash){
        Inmovable.apply(this,[game,x,y,key]);
        this.roomNum = roomNum;
        this.roomTrash = roomTrash;
        this.active = false;
    }
    Doors.prototype = Object.create(Inmovable.prototype);
    Doors.constructor = Doors;
    Doors.prototype.update = function(){
        
        var flag = true;
        for(var i = 0; i < this.roomTrash.length; i++){
            
            if(this.roomTrash[i].alive){
                 flag = false;
            }   
        }
        if(flag){
            this.active = true;
        }
    }



//heritage
