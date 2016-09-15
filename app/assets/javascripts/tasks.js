/* global isPaused */ 
/* global timeElapsed */ 
/* global $ */ 

var isPaused = 1,
    timeElapsed = 0; 

$(document).ready(function(){
  
  var minutes = $(".minutes"),
      seconds = $(".seconds"),
      startButton =  $("#start"),
      finishButton = $("#finish"),
      resetButton = $("#reset"),
      categorySelect = $("#category");

  startButton.on("click", startTimer);
  finishButton.on("click", finishTask);  
  resetButton.on("click", resetTimer);      
  $("#task-log .controls .delete").on("click", removeTask);    
  categorySelect.on("change", categoryChange)

  if(getCookie("timerStart") != "")
  {
    console.log("timerstart is not null")
    timeElapsed = Math.floor(new Date() / 1000) - getCookie("timerStart");
    $("#description textarea").val(getCookie("timerDescription"));
    startTimer(); 
  }

  setInterval(function() {
    if(!isPaused)
    {
      timeElapsed++;
      seconds.html(pad(timeElapsed % 60));
      minutes.html(Math.floor(timeElapsed / 60));
      setCookie("timerDescription", $("#description textarea").val(), 365)
    }
  }, 1000);
  
  $('#user_time_zone').selectTimeZone();
  
  $('.centerSelect').each(function(){
  centerSelect($(this));
  });

});

function startTimer() 
{ 
  isPaused = 0;
  if(!getCookie("timerStart"))
  {
    setCookie("timerStart", Math.floor(new Date() / 1000), 365);
  }
}

function stopTimer()
{
  setCookie("timerStart", 0, 365);
  setCookie("timerDescription", 0, 365);
  isPaused = 1; 
}

function resetTimer() 
{
  stopTimer();
  timeElapsed = 0; 
  $(".seconds").html("00");
  $(".minutes").html("0");
  $("#description textarea").val(""); 
  setCookie("timerStart", "", 365);
  setCookie("timerDescription", "", 365);
}

function finishTask() 
{
  var description = $("#description textarea").val(), 
  time = stringifyTime(),
  user = $("#user_id").attr("value"), 
  category = $("#category").val(); 
  categoryText = $("#category option:selected").text(); 
  
  $("#recent-tasks table tbody").prepend("<tr><td>" + categoryText + "</td><td>" + time + "</td> <td>" + description + "</td></tr>").hide().fadeIn(500);
  $.post('/track', { 
      task: { 
        time: timeElapsed, 
        description: description, 
        user_id: user, 
        category_id: category
      }});
  $("#description textarea").val(""); 
  $("#recent-tasks .message").html("")
  $("#recent-tasks table").show(); 
  resetTimer(); 
  return false; 
}

function categoryChange()
{
  var newCategory = "",
  categorySelect = $(this),
  user = $("#user_id").attr("value"); 
  
  $("option#select").detach(); 
  
  if(categorySelect.val() == "add")
  {
    newCategory = prompt("Name your new category:");
    console.log(newCategory);
    if(newCategory)
    {
      $.post('/categories', {category: { name: newCategory, user_id: user }}, newCategorySuccess)
    }
  }
  
  centerSelect(categorySelect);
}

function newCategorySuccess(data)
{
  categorySelect = $("#category"); 
  categorySelect.prepend("<option value='" + data.id + "'>" + data.name +"</option>");
  categorySelect.val(data.id);
  centerSelect(categorySelect);
}

function removeTask()
{
  $(this).parents("tr").fadeOut(750);
}

function pad(number)
{
  if (number < 10) { return "0" + number; }
  else { return number; } 
}

function stringifyTime()
{
  return Math.floor((timeElapsed / 60)) + "m " + (timeElapsed%60) + "s";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function getUserTimeZone()
{
  return Date().getTimezoneOffset();
}

function getTextWidth(txt) {
  var $elm = $('<span class="tempforSize">'+txt+'</span>').prependTo("body");
  var elmWidth = $elm.width();
  $elm.remove();
  return elmWidth;
}
function centerSelect($elm) {
    var optionWidth = getTextWidth($elm.children(":selected").html())
    var emptySpace =   $elm.width()- optionWidth;
    $elm.css("text-indent", (emptySpace/2) - 10);// -10 for some browers to remove the right toggle control width
}
