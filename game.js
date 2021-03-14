var buttonColors = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstKeyDown = false;
var level = 0;

$(document).on("keydown", function(){
    if (firstKeyDown===false){
        $("#level-title").text("Level "+ level)
        nextSequence();
        firstKeyDown=true;
    }
})

$(".btn").on("click", function(){
    var userChosenColour =  this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log("user",userClickedPattern)
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    var is_same = (gamePattern.length == userClickedPattern.length && gamePattern.every(function(color,i){
        return color === userClickedPattern[i]
    }))

    if (gamePattern.length-1 === currentLevel ){
        if (is_same){       
            console.log("currentLevel",currentLevel)     
            console.log("success")
            setTimeout(function(){nextSequence()}, 1000);
            userClickedPattern=[]; 
         }
        else {
            console.log("wrong1");
            gameOver();
        }  
    }
    else if (gamePattern.length-1 <= currentLevel ){
        console.log("wrong2");
        gameOver();
    }
}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");    
    }, 200);
    playSound("wrong");
    startOver();
}

function startOver(){
    level = 0;
    firstKeyDown = false;
    userClickedPattern=[];
    gamePattern = [];
}

function playSound(name){
    new Audio ("sounds/"+name+".mp3").play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed")
    }, 100);
}

function nextSequence(){
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);  
    level++;   
    $("#level-title").text("Level "+ level);
    console.log("game",gamePattern);
}

