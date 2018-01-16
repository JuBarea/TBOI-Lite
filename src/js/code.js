

//node ./node_modules/gulp/bin/gulp run

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('gameState',gameState);
game.state.add('loseState',loseState);

game.state.start('load');





