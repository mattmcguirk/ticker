/* global isPaused */ 
/* global $ */ 

var isPaused = 0,
    timeElapsed = 0; 

$(document).ready(function(){
  
  var theTimer = $("#timer1"), 
      minutes = $("#timer1 .minutes"),
      seconds = $("#timer1 .seconds"),
      startButton =  $("#start"),
      finishButton = $("#finish"),
      pauseButton =  $("#pause");

  startButton.on("click", startTimer);
  pauseButton.on("click", pauseTimer);  
  finishButton.on("click", finishTask);  
        
      
  setInterval(function() {
    if(!isPaused)
    {
      timeElapsed++;
      seconds.html(pad(timeElapsed % 60));
      minutes.html(Math.floor(timeElapsed / 60));
    }
  }, 1000);
  
});

function pauseTimer() { isPaused = 1; }

function startTimer() { isPaused = 0; }

function finishTask() 
{
  pauseTimer(); 
  /* write time and task to database */ 
  elapsedTime = 0; 
}

function pad(number)
{
  if (number < 10) { return "0" + number; }
  else { return number; } 
}