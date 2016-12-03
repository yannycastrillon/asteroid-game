var $gameBoard = $(".game-board");
var $gameBoardH= $gameBoard.height();

var game = {
  player1 : { score:0,name:"Yanny"},
  player2 : { score:0,name:"Philippe"}
}
var currentPlayer = game.player1;
var currentTime=0;

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
      $gameBoard.append(bullet.node);
      console.log(bullet);

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
  bullet.node.animate({
    top: "-=" + bullet.vy
  },5,moveBulletY)

  function moveBulletY(){
    // validates if bullet is out of the top of the game board
    if ($(bullet.node).offset().top < 0) {
      bullet.node.remove();
    }
    // The vertical displacement of the bullet
    $(bullet.node).animate({
      top: '-=' + bullet.vy,
      // left: genRandomNum(20,480),
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
  rock.posX = genRandomNum(0,0);
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
  }
}

var myShuttle = new Shuttle();

new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);
new Rock("Rocker",14,2);


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
