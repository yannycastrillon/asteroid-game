var $gameBoard = $(".game-board");
var moveVertical=0;

// Constructor of Rocks
function Rock(name,size,points){
  this.name = name;
  this.size=size;
  this.points=points;
  //Starting position
  this.posX = genRandomNum(-100,0);
  this.posY = genRandomNum(-100,0);


  // Color Randomly selected
  this.color=genRandomColor();
  // Creates a div, ,
  this.node = $('<div>');
  // Class "rock"
  this.node.addClass("rock");
  // Assings a color
  this.node.css({
    background: this.color,
    position: "relative"
  })
  // Appends to game board.
  $(".game-board").append(this.node);

  //Creates the first animation
  this.node.animate({
    top:this.posY,
    lef:this.posX
  }, moveRock)
}

// Moves the rock from one place to another
function moveRock(){
  // The vertical displacement of the rocks
  moveVertical += 2;

  $(this).animate({
    top: moveVertical,
    left: genRandomNum(20,480),
  },1000,moveRock)
  console.log("moveVertical: "+moveVertical);

  // validates when rocks are out of bound
  (moveVertical == $gameBoard.height()) ? moveVertical=0 : null;
}

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
