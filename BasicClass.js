
function Basic(key){

    this.key = key;
    
    this.hola = function(){
        console.log("hola");
    }

    this.place = function(x,y){
        game.add.sprite(x,y, this.key);
    }
}

//Items that can move
    function Moveable(key,speed){

        Basic.apply(this,[key]);
        this.speed = speed;
    }

    //heritage
    Moveable.prototype = Object.create(Basic.prototype);

        function Bullet(key,speed){
            Moveable.apply(this,[key,speed])

            //game.physics.arcade.enable(this);

            //Add deltatime Cant acces body/velocity
            this.move = function(dir){
                if(dir == 'up'){
                    body.velocity.y = -this.speed; 
                }
                else if(dir == 'left'){
                    this.body.velocity.x = -this.speed;
                }
                else if(dir == 'down'){
                    this.body.velocity.y = this.speed;
                }
                else if(dir == 'right'){
                    this.body.velocity.x = this.speed;
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