
function Basic(game,x,y,key){
    Phaser.Sprite.call(this,game,x,y,key);
    
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
    function Moveable(game,key,speed,x,y){

        Basic.apply(this,[game,key,x,y]);
        this.speed = speed;
    }

    //heritage
    Moveable.prototype = Object.create(Basic.prototype);
    Moveable.constructor = Moveable;

        function Bullet(game,key,x,y,speed){
            Moveable.apply(this,[game,key,x,y])

            //Add deltatime
            this.move = function(dir){
                if(dir == 'up'){
                    this.y -= this.speed; 
                }
                else if(dir == 'left'){
                    this.x -= this.speed;
                }
                else if(dir == 'down'){
                    this.y += this.speed;
                }
                else if(dir == 'right'){
                    this.x += this.speed;
                }
            }            
            //collision
        }

        function Player(key,speed,head){
            Moveable.apply(this,[key,speed]);

            var cursors;
            var keyW;
            var keyS;
            var keyA;
            var keyD;
            var head;

            //Head Set-up
                this.head = new Basic('head')
                this.head.place(0,0);
                this.addChild(head);

            //Contorls
                cursors = game.input.keyboard.createCursorKeys();
                keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
                keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
                keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
                keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    

            this.move = function(){
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                
            
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
            }


        }
    //heritage
    Bullet.prototype = Object.create(Moveable.prototype);
    Bullet.constructor = Bullet;