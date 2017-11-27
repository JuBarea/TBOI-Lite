
function Movement(_player){


    
    var keyW;
    var keyS;
    var keyA;
    var keyD;
    var cursors;
    var player;

    this.player = _player;
    
    cursors = game.input.keyboard.createCursorKeys();
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

    this.move = function(){
        
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        

        if(keyA.isDown || keyD.isDown || keyW.isDown ||keyS.isDown){
            if (keyA.isDown)
            {
                //  Move to the left
                player.body.velocity.x = -150;
                player.animations.play('left');
                head.frame = 6;
            }
            if (keyD.isDown)
            {
                //  Move to the right
                player.body.velocity.x = 150;
                player.animations.play('right');
                head.frame = 2;
            } 
            if(keyW.isDown)
            {
                player.body.velocity.y = -150
                player.animations.play('up');
                head.frame = 4;
        
            }
            if(keyS.isDown)
            {
                player.body.velocity.y = 150   
                player.animations.play('up');
                head.frame = 0;
        
            }

        }
        else{
            //  Reset the players velocity (movement)
            player.animations.stop();
            player.frame = 0;
            head.animations.stop();
            head.frame = 0;
        }
    }
}