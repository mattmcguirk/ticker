/* global isPaused */ 
/* global $ */ 

var isPaused = 1,
    timeElapsed = 0; 

$(document).ready(function(){
  
  var minutes = $(".minutes"),
      seconds = $(".seconds"),
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

function resetTimer() 
{
  pauseTimer();
  timeElapsed = 0; 
  $(".seconds").html("00");
  $(".minutes").html("0");
}

function finishTask() 
{
  var description = $("#description textarea").val(), 
  time = Math.floor((timeElapsed / 60)) + "\" " + (timeElapsed%60) + "'"; 
  
  $("#task-log ul").append("<li>" + description + " - " + time + "</li>");
  $("#description textarea").val(""); 
  resetTimer(); 
  /* write time and task to database */ 
}

function pad(number)
{
  if (number < 10) { return "0" + number; }
  else { return number; } 
}