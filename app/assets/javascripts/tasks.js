/* global isPaused */ 
/* global $ */ 

var isPaused = 1,
    timeElapsed = 0; 

$(document).ready(function(){
  
  var minutes = $(".minutes"),
      seconds = $(".seconds"),
      startButton =  $("#start"),
      finishButton = $("#finish"),
      pauseButton =  $("#pause"),
      resetButton = $("#reset");

  startButton.on("click", startTimer);
  pauseButton.on("click", pauseTimer);  
  finishButton.on("click", finishTask);  
  resetButton.on("click", resetTimer);      
      
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
  $("#description textarea").val(""); 
}

function finishTask() 
{
  var description = $("#description textarea").val(), 
  time = Math.floor((timeElapsed / 60)) + "m " + (timeElapsed%60) + "s"; 
  
  $("#task-log table tbody").append("<tr><td>" + time + "</td> <td>" + description + "</td></tr>");
  $.post('/tasks/new', { task: { time: timeElapsed, description: description, user_id: 1 }}, function(){console.log("data posted.")});
  $("#description textarea").val(""); 
  $("#task-log .message").html("")
  $("#task-log table").show(); 
  resetTimer(); 
  return false; 
}

function pad(number)
{
  if (number < 10) { return "0" + number; }
  else { return number; } 
}