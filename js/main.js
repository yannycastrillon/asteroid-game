// Constructor of Rocks
function Rock(name,size,points){
  this.name = name;
  this.size=size;
  this.points=points;

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
    top:0,
    lef:0
  }, moveRock)
}

// Moves the rock from one place to another
function moveRock(){
  $(this).animate({
    top:30,
    left:40
  },4000,moveRock)
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

new Rock("Rocker","blue",14,2);
new Rock("Rocker","red",14,2);
new Rock("Rocker","orange",14,2);
new Rock("Rocker","purple",14,2);
new Rock("Rocker","blue",14,2);
