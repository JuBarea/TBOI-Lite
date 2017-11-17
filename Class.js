function rng(num){
    return Math.floor((Math.random() * num) + 1)
}


function Basico(x,y){
    this._x = x;
    this._y = y;
}

//*var pj = new Basico(1,1);

//console.log(pj._x);

function Moveable (x,y,speed){
    Basico.apply(this,[x,y]);
    this._speed = speed;

    this.move = function(){
        this._X += this._speed;
    }
}

Moveable.prototype = Object.create(Basico.prototype);

function HasHP (x,y,speed,health){
    Moveable.apply(this, [x,y,speed]);
    this._health = health;

    this.takeDamage = function(damage){
        this._health -= damage;
    }
}

HasHP.prototype = Object.create(Moveable.prototype);


function Enemy(x,y,speed,health,attack){
    HasHP.apply(this,[x,y,speed,health]);
    this._attack = attack;

    this.shoot = function(target){
        //if(target instanceof Enemy &&  typeof target.takeDamage == "function" )
         target.takeDamage(rng(this._attack));
    }
}

Enemy.prototype = Object.create(HasHP.prototype)


var goblin = new Enemy(0,0,1,30,4);

var Link = new Enemy(0,0,2,45,10);


console.log(goblin._health >= 0);
console.log(Link._health >= 0);
var i =0;
while(goblin._health >= 0 && Link._health >= 0){
    goblin.shoot(Link);
    Link.shoot(goblin);
    
    //console.log(i);
    //i++;
    
}

if(Link._health >= 0){
    console.log("Link survived")
    console.log(Link._health);
}

else console.log("Link is dead. Press F to pay respect");

Link.move();

    console.log(Link._x)
//console.log("hi");







