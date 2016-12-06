var $gameBoard = $(".game-board");
var $currentBullets=$("#bulletFired");
var $timer=$("#timer");
var $scorePlayer1=$("#scorePlayer1");
var $scorePlayer2=$("#scorePlayer2");

var $nameRockDestroyed=$("#nameRock");
var $gameBoardH= $gameBoard.height();
var currentPlayer=null;
var currentTime = 0;
var idRock=0;
var $rocks;
var totalScore=0;

// Start and creation of game.
var game = new Game();


// Constructor of the game.
function Game(){
  var game = this;
  game.numRocks = 50;
  game.myShuttle = new Shuttle();
  game.player1 = { name:"Yanny",score:0,age:27,profe:"Airforce"};
  game.player2 = { name:"Philippe",score:0,age:32,profe:"Marine"};

  $("#namePlayer1").text(game.player1.name);
  $("#namePlayer2").text(game.player2.name);

  $("#agePlayer1").text(game.player1.age);
  $("#agePlayer2").text(game.player2.age);

  $("#proPlayer1").text(game.player1.profe);
  $("#proPlayer2").text(game.player2.profe);



  currentPlayer = game.player2;


  for (var i = 0; i < game.numRocks; i++) {
    new Rock("Rocky "+i,genRandomNum(1,5),genRandomNum(20,100));
  }
  $rocks = $(".rock");
  setInterval(gameTimer,500);

  // Tracks the game timer
  function gameTimer(){
    if(currentTime >= 0){
      // Every 30sec players switch to control the shuttle
      if (currentTime%30==0){
        switchPlayer();
      }
      // console.log("current Time: "+ currentTime);
      $timer.text(currentTime);
      currentTime--;
    }
    else{clearInterval(2);}
    return currentTime;
  }
  //Player controlling and taking command of the Space Shuttle
  function switchPlayer(){
    // Checks which player is commanding the Shuttle
    // Checks for the life of the current player
    if(currentPlayer == game.player1){
      currentPlayer=game.player2;
      alert("Heyyy! "+game.player1.name+"!!! You amateur! Let me show you what a true emperor of the galaxy can do with this baby... Move aside, Punk!!!");
    }else if(currentPlayer == game.player2){
      currentPlayer=game.player1;
      alert("Heyyy! "+game.player2.name+"!!! You amateur! Let me show you what a true emperor of the galaxy can do with this baby... Move aside, Punk!!!");
    }
    $("#currentPlayer").text(currentPlayer.name);

    console.log("currentPlayer: "+currentPlayer.name);
  }
}

// Tracks the score of the game
function checkScore(rock){
  console.log("Points of rock: "+rock.getAttribute("name")+" is: "+rock.getAttribute("points"));
  if(currentPlayer == game.player1){
    currentPlayer.score += parseInt(rock.getAttribute("points"));
    $scorePlayer1.text(currentPlayer.score);
  }else {
    currentPlayer.score += parseInt(rock.getAttribute("points"));
    $scorePlayer2.text(currentPlayer.score);
  }
  totalScore = parseInt($scorePlayer1.text()) + parseInt($scorePlayer2.text());
  console.log("totalScore: "+totalScore);
  $("#totalScore").text(totalScore);
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
      // Indicates bullet was fired. Collition de
      bulletFired = true;
      // creates div and appends the bullet to the gameBoard
      var bullet = new Bullet(shuttle);
      console.log($currentBullets.text());
      $currentBullets.text(parseInt($currentBullets.text())+1);
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

    // validates if bullet is out of the top of the game board
    if (bullet.node.offset().top < 0) {
      bullet.node.remove();
      bullet.node = null
      return false
    } else {
      if(bullet.node.length){
        // The vertical movement of bullet
        bullet.node.animate({
          top: '-=' + bullet.vy
        },100,function(){
          console.log(bullet.node.length)
          moveBulletY();
          checkCollision(bullet.node);
        })
      }
    }
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

  rock.node = $('<div>');
  rock.node.addClass("rock");
  rock.node.attr("name",rock.name);
  rock.node.attr("size",rock.size);
  rock.node.attr("points",rock.points);
  rock.node.addClass("asteroid"+genRandomNum(1,6));
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
      left: genRandomNum(20,700),
    },5000,moveRock)
    // validates when rocks are out of bound
    if(rock.vy == $gameBoardH) {
      rock.vy=0
    }
  }
}

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
// Checks collision between rocks and bullets
function checkCollision($bullet) {
  // If a bullet doesn't exit
   if($bullet){
    $rocks.each(function(i,rock) {
      var x1 = $(rock).offset().left;
      var y1 = $(rock).offset().top;
      var h1 = $(rock).outerHeight(true);
      var w1 = $(rock).outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $bullet.offset().left;
      var y2 = $bullet.offset().top;
      var h2 = $bullet.outerHeight(true);
      var w2 = $bullet.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      // validates bullet hits a rock.
      if (!(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)){
        console.log("Collition detected");
        console.log($(rock).attr("id"));
        checkScore(rock);
        $bullet.remove();
        // bullet hits then set that bullet to null
        $bullet = null;
        $(rock).remove();
        $("#imgRock").removeClass();
        // animates the destroyed rock
        $("#imgRock").addClass("rock_img "+rock.classList[1]);
        $nameRockDestroyed.text($(rock).attr("name"));
        // break checking for each rock when hits one
        return false
      }
    })
   }
}
