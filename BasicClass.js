
function Basic(game,x,y,key){
    Phaser.Sprite.call(this,game,x,y,key);
    this.game.world.addChild(this);
    game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true;
    
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
        
            Bullet.prototype.update = function(){
                if(this.alive)this.move();
                if(this.x > 720 || this.x < 75)this.kill();
                if(this.y > 450 || this.y < 75)this.kill();
                if(this.f != this.alive){
                    console.log("Changing State")
                    this.f = this.alive
                }
            }

        
        ///Player
            function Player(game,x,y,key,speed,head,tearsKey){
                Moveable.apply(this,[game,x,y,key,speed]);

                this.head = head;
                this.bulletPool = tearsKey; //Array or key??
                this.bulletSpeed = 3.5;
                var dir;
                this.FireRate = 500;
                this.bulletTimer = 0;
                this.i = 0;
                this.shootingFlag = true;
                                
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
            }

            Player.prototype = Object.create(Moveable.prototype);
            Player.constructor = Player;
            Player.prototype.move = function(){ 
          
                    if(keyA.isDown || keyD.isDown || keyW.isDown ||keyS.isDown){
                        if (keyA.isDown)
                        {
                            //  Move to the left
                            this.x -= this.speed;
                            this.animations.play('left');
                            if(this.shootingFlag)
                                this.head.frame = 6;
                        }
                        if (keyD.isDown)
                        {
                            //  Move to the right
                            this.x += this.speed;
                            this.animations.play('right');
                            if(this.shootingFlag)
                                this.head.frame = 2;
                        } 
                        if(keyW.isDown)
                        {
                            this.y -= this.speed;
                            this.animations.play('up');
                            if(this.shootingFlag)
                                this.head.frame = 4;
                         
                    
                        }
                        if(keyS.isDown)
                        {
                            this.y += this.speed   
                            this.animations.play('up');
                            if(this.shootingFlag)
                                this.head.frame = 0;
                           
                        }
                
                    }
                    else{
                        //  Reset the players velocity (movement)
                        this.animations.stop();
                        this.frame = 0;
                        if(this.shootingFlag)  
                            this.head.frame = 0;
                        
                    }
            }         
            Player.prototype.shoot = function(){

                if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown ||cursors.down.isDown ){
                    if(this.game.time.now > this.bulletTimer){
                        if(this.i >= 10) this.i = 0;
                        if (cursors.left.isDown)
                        {
                            this.shootingFlag = false;
                            this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'left')
                            this.head.animations.play('left');   
                            this.i++ 
                    
                        }
                        else if (cursors.right.isDown)
                        {
                            this.shootingFlag = false;
                            this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'right') 
                            this.head.animations.play('right');
                            this.i++
                           
                        } 
                        else if(cursors.up.isDown)
                        {
                            this.shootingFlag = false;
                            this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'up') 
                            this.head.animations.play('up');
                            this.i++                                                                 
                        } else if(cursors.down.isDown)
                        {   
                            this.shootingFlag = false;
                            this.bulletPool[this.i].resete(this.x,this.y-20,this.bulletSpeed,'down') 
                            this.head.animations.play('down');
                            this.i++           

                        }
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
            
    //heritage
    