
function Basic(game,x,y,key){
    Phaser.Sprite.call(this,game,x,y,key);
    this.game.world.addChild(this);
    
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
        
            Bullet.prototype.update = function(){
                this.move();
                //Collision();
            }

        
        ///Player
            function Player(game,x,y,key,speed,head){
                Moveable.apply(this,[game,x,y,key,speed]);

                this.head = head;
                /*var cursors;
                var keyW;
                var keyS;
                var keyA;
                var keyD;*/


                
                //  Our two animations, walking left, right and up/down.
                    this.animations.add('left', [20, 21, 22,23,24,25,26,27,28,29], 20, true);
                    this.animations.add('right', [10, 11, 12,13,14,15,16,17,18,19], 20, true);
                    this.animations.add('up',[0,1,2,3,4,5,6,7,8,9],20,true);

                //Head Set-up
                    //this.addChild(this.head);
                    //this.head.place(0,0);
                    

                //Contorls
                    cursors = this.game.input.keyboard.createCursorKeys();
                    keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
                    keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                    keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                    keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        

                /*this.move = function(){                  
                
                    if(keyA.isDown || keyD.isDown || keyW.isDown ||keyS.isDown){
                        if (keyA.isDown)
                        {
                            //  Move to the left
                            this.body.velocity.x = -150;
                            this.animations.play('left');
                            head.frame = 6;
                        }
                        if (keyD.isDown)
                        {
                            //  Move to the right
                            this.body.velocity.x = 150;
                            this.animations.play('right');
                            head.frame = 2;
                        } 
                        if(keyW.isDown)
                        {
                            this.body.velocity.y = -150
                            player.animations.play('up');
                            head.frame = 4;
                    
                        }
                        if(keyS.isDown)
                        {
                            this.body.velocity.y = 150   
                            this.animations.play('up');
                            head.frame = 0;
                    
                        }
                
                    }
                    else{
                        //  Reset the players velocity (movement)
                        this.animations.stop();
                        this.frame = 0;
                        head.animations.stop();
                        head.frame = 0;
                    }
                }*/


            }

            Player.prototype = Object.create(Moveable.prototype);
            Player.constructor = Player;
            Player.prototype.move = function(){ 
                
                    if(keyA instanceof Phaser.Key)
                        console.log("Ou yeah baby");
                
                    if(keyA.isDown || keyD.isDown || keyW.isDown ||keyS.isDown){
                        if (this.keyA.isDown)
                        {
                            //  Move to the left
                            this.x -= -speed;
                            this.animations.play('left');
                            head.frame = 6;
                        }
                        if (this.keyD.isDown)
                        {
                            //  Move to the right
                            this.x += speed;
                            this.animations.play('right');
                            head.frame = 2;
                        } 
                        if(this.keyW.isDown)
                        {
                            this.y -= speed;
                            player.animations.play('up');
                            head.frame = 4;
                    
                        }
                        if(this.keyS.isDown)
                        {
                            this.y += speed   
                            this.animations.play('up');
                            head.frame = 0;
                    
                        }
                
                    }
                    else{
                        //  Reset the players velocity (movement)
                        this.animations.stop();
                        this.frame = 0;
                        //head.animations.stop();
                        head.frame = 0;
                    }
            }         
           /* Player.prototype.update = function(){
                //this.hola();
                this.move();
                
            }*/
            
    //heritage
    