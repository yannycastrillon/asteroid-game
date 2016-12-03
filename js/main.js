var $gameBoard = $(".game-board");
var $gameBoardH= $gameBoard.height();
var currentPlayer=null;
var currentTime=0;
var arrRocks = [];
function Game(){
  var game = this;
  game.numRocks = 1;
  game.myShuttle = new Shuttle();
  game.player1 = { score:0,name:"Yanny"};
  game.player2 = { score:0,name:"Philippe"};

  for (var i = 0; i < game.numRocks; i++) {
    arrRocks.push(new Rock("Rocker",14,2));
  }

}

function checkCollision($bullet) {
  var $rocks = $(".rock");
  for (var i = 0; i < $rocks.length; i++){
    var x1 = $rocks.position().left;
    var y1 = $rocks.position().top;
    var h1 = $rocks.outerHeight(true);
    var w1 = $rocks.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $bullet.position().left;
    var y2 = $bullet.position().top;
    var h2 = $bullet.outerHeight(true);
    var w2 = $bullet.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (!(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)){
      for (var j = 0; j < $rocks.length; j++) {
        console.log("Es TRUE. Rocks");
        console.log($rocks);
        console.log($rocks[j]);
        if($rocks[j].style.top == y1){
          $($rocks[j]).remove();
        }
      }
      $bullet.remove();
    }
    // returns a truthy or falsey value
    return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
  }
}

//Constructor of Space Shuttle
function Shuttle(){
  var shuttle = this;
  shuttle.vx = 25;
  shuttle.name = "Hercules";
  shuttle.lives= 5;
  // Creates the div of the space shuttle
  shuttle.node = $("<div>");
  shuttle.node.addClass("shuttle");
  shuttle.node.attr("id","my-shuttle");
  $gameBoard.append(shuttle.node);

  // Adds event listener to the shuttle
  $("body").on("keypress",function(evt){
    if(evt.key == "a"){
      shuttle.node.animate({
        left: "-=" + shuttle.vx
      },70)
    }else if(evt.key == "d"){
      shuttle.node.animate({
        left: "+=" + shuttle.vx
      },70)
    }
    if (evt.key == "f") {
      // creates div and appends the bullet to the gameBoard
      var bullet = new Bullet(shuttle)

    }
  });

}
// Constructor of bullet
function Bullet(shuttle){
  var bullet = this;
  bullet.x = shuttle.node.position().left + shuttle.node.width()/2;
  bullet.y = shuttle.node.position().top;
  bullet.vx = 0;
  bullet.vy = 15;
  bullet.power = 1;

  bullet.node = $("<div>");
  bullet.node.addClass("bullet");
  bullet.node.css({
    top:bullet.y,
    left:bullet.x
  })
  $gameBoard.append(bullet.node);
  bullet.node.animate({
    top: "-=" + bullet.vy
  },5,moveBulletY)

  function moveBulletY(){
    checkCollision(bullet.node);
    // validates if bullet is out of the top of the game board
    if ($(bullet.node).offset().top < 0) {
      bullet.node.remove();
    }
    // The vertical movement of bullet
    $(bullet.node).animate({
      top: '-=' + bullet.vy
    },100,moveBulletY)

  }
}

//Player controlling and taking command of the Space Shuttle
function switchPlayer(){
  // Checks which player is commanding the Shuttle
  // Checks for the life of the current player
  if(currentPlayer == game.player1 && currentPlayer.life==0){
    currentPlayer=game.player2;
  }else if(currentPlayer == game.player2 && currentPlayer.life==0){
    currentPlayer=game.player1;
  }
}

// Constructor of Rocks
function Rock(name,size,points){
  var rock = this;
  rock.name = name;
  rock.size=size;
  rock.points=points;
  rock.vy = 20;
  //Starting position
  rock.posX = genRandomNum(0,10);
  rock.posY = genRandomNum(0,100);
  rock.color=genRandomColor();

  rock.node = $('<div>');
  rock.node.addClass("rock");
  rock.node.css({background: rock.color})
  $gameBoard.append(rock.node);

  //Creates the first animation
  rock.node.animate({
    top:rock.posY,
    lef:rock.posX
  }, moveRock)

  // Moves the rock from one place to another
  function moveRock(){

    // Validates the position of each (div) rock to change value
    if (rock.node.offset().top > $gameBoardH) {
        rock.node.css({top:0})
    }
    rock.node.animate({
      top: '+=' + rock.vy,
      left: genRandomNum(20,480),
    },1000,moveRock)
    // validates when rocks are out of bound
    if(rock.vy == $gameBoardH) {
      rock.vy=0
    }
    // checkCollision();
  }
}
new Game();


// Get a random number between min and max
function genRandomNum(min,max){
  return Math.round((Math.random() * (max-min)) + min);
}

// Get a random color
function genRandomColor(){
  var result = "#";
  var options = ["A","B","C","D","E","F","1","2","3","4","5","6","7","8","9"];
  for (var i = 0; i < 6; i++) {
    result += options[genRandomNum(0,(options.length-1))]
  }
  return result;
}
