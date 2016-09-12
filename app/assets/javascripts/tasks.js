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
  time = Math.floor((timeElapsed / 60)) + "m " + (timeElapsed%60) + "s",
  user = $("#user_id").attr("value"); 
  
  $("#recent-tasks table tbody").prepend("<tr><td>" + time + "</td> <td>" + description + "</td></tr>").hide().fadeIn(500);
  $.post('/track', { 
      task: { 
        time: timeElapsed, 
        description: description, 
        user_id: user 
      }});
  $("#description textarea").val(""); 
  $("#recent-tasks .message").html("")
  $("#recent-tasks table").show(); 
  resetTimer(); 
  return false; 
}

function pad(number)
{
  if (number < 10) { return "0" + number; }
  else { return number; } 
}