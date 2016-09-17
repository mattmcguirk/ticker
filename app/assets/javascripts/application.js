// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_tree .
/* global isPaused */ 
/* global timeElapsed */ 
/* global $ */ 

var isPaused = 1,
    timeElapsed = 0,
    pomodoroMode = 0,
    pomodori = 0,
    woodBlock = new Audio('/assets/woodblock.mp3'),
    anvil = new Audio('/assets/anvil.mp3');

$(document).on('ready', function(){
  
  var minutes = $(".minutes"),
      seconds = $(".seconds"),
      startButton =  $("#start"),
      pauseButton =  $("#pause"),
      finishButton = $("#finish"),
      resetButton = $("#reset"),
      categorySelect = $("#category"),
      nightModeControl = $("#night-mode-control"),
      pomodoroModeControl = $("#pomodoro-mode-control");

  startButton.on("click", startTimer);
  pauseButton.on("click", pauseTimer);
  finishButton.on("click", finishTask);  
  resetButton.on("click", resetTimer);      
  $(".task-log .controls .delete").on("click", removeTask);    
  categorySelect.on("change", categoryChange);
  $(".task-log .date-header").on("click", toggleTable);
  $(".task-log:first-of-type thead span.glyphicon")
                                             .removeClass("glyphicon-chevron-down")
                                             .addClass("glyphicon-chevron-up");
  nightModeControl.on("click", nightMode);
  pomodoroModeControl.on("click", pomodoroToggle);
  
  if(getCookie("nightMode") == 1) { nightMode(); }
  if(getCookie("pomodoroMode") == 1) 
  { 
    pomodoroMode = 1; 
    pomodoroModeControl.prop("checked",true);
    pomodori = getCookie("pomodori");
    renderPomodori();
  }
  
  if(getCookie("timeElapsed") != "")
  {
    timeElapsed = getCookie("timeElapsed");
    if(getCookie("timerDescription") != "undefined")
    {
      $("#description textarea").val(getCookie("timerDescription"));
    }
    startTimer(); 
  }

  setInterval(function() {
    if(!isPaused)
    {
      timeElapsed++;
      if(pomodoroMode == 1)
      {
        pomodoroCheck();
        setCookie("pomodori", pomodori, 365);
      }

      renderTime(); 

      setCookie("timerDescription", $("#description textarea").val(), 365);
      setCookie("timeElapsed", timeElapsed, 365);
    }
  }, 1000);

  $('#user_time_zone').selectTimeZone();
  $('.centerSelect').each(function(){
  centerSelect($(this));
  });

});

function renderTime() { $("#timer .time").html(stringifyTime(timeElapsed)); }

function startTimer() { isPaused = 0; }
function pauseTimer() { isPaused = 1; }

function stopTimer()
{
  setCookie("timeElapsed", 0, 365);
  setCookie("timerDescription", 0, 365);
  isPaused = 1; 
}

function resetTimer() 
{
  stopTimer();
  timeElapsed = 0; 
  pomodori = 0; 
  renderTime();
  renderPomodori();
  $("#description textarea").val(""); 
  setCookie("timeElapsed", "", 365);
  setCookie("timerDescription", "", 365);
  setCookie("pomodori", "", 365);
}

function finishTask() 
{
  var description = $("#description textarea").val(), 
  time = stringifyTime(),
  user = $("#user_id").attr("value"), 
  category = $("#category").val(), 
  categoryText = $("#category option:selected").text();
  if(categoryText == "Select a Category")
  {
    categoryText = "-";
  }
  
  $("#recent-tasks table tbody").prepend("<tr><td class='category'>" + categoryText + "</td><td>" + time + "</td> <td>" + description + "</td></tr>").hide().fadeIn(500);
  $.post('/track', { 
      task: { 
        time: timeElapsed, 
        description: description, 
        user_id: user, 
        category_id: category
      }});
  $("#description textarea").val(""); 
  $("#recent-tasks .message").html("");
  $("#recent-tasks h2").html("Recent Tasks");
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
  var categorySelect = $("#category"); 
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
  var timeString = "";
  
  if(timeElapsed > 3600) { timeString += Math.floor(timeElapsed / 3600) + "h "; }
  if(timeElapsed > 60) { timeString += Math.floor(Math.floor(timeElapsed % 3600) / 60) + "m "; }
  timeString += pad(timeElapsed % 60) + "s"
  if(timeElapsed == 0) { timeString = "--h --m --s"; } 
  return timeString;
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
    var optionWidth = getTextWidth($elm.children(":selected").html());
    var emptySpace =   $elm.width()- optionWidth;
    $elm.css("text-indent", (emptySpace/2) - 10);// -10 for some browers to remove the right toggle control width
}

function toggleTable()
{
  var tableBody = $(this).parents("table").children("tbody"),
      headerGlyph = $(this).find(".glyphicon");

  tableBody.toggle(); 
  if(tableBody.is(":visible"))
  {
    headerGlyph.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
  }
  else
  {
    headerGlyph.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");    
  }
}

function nightMode()
{
  var body =    $("body"),
      navbar =  $("header > nav"),
      control = $("#night-mode-control");
  
  if(body.hasClass("night-mode"))
  {
    setCookie("nightMode", 0, 365);
    body.removeClass("night-mode");
    navbar.removeClass("navbar-inverse").addClass("navbar-default");
  }
  else
  {
    setCookie("nightMode", 1, 365);
    control.prop("checked", true); 
    body.addClass("night-mode");
    navbar.removeClass("navbar-default").addClass("navbar-inverse");
  }
}

function pomodoroCheck()
{
  if(timeElapsed % (60 * 25 * 4) == 0)
  {
    pomodori++; 
    renderPomodori(); 
    anvil.play();
    longBreak(); 
  }
  else if(timeElapsed % (60 * 25) == 0)
  {
    pomodori++; 
    renderPomodori(); 
    woodBlock.play();
    shortBreak(); 
  }
}

function renderPomodori()
{
  var pomodoriDiv = $("div#pomodori .icons"),
      i = 0,
      string = "";
      
  pomodoriDiv.html(""); 

  for(i = 1; i <= pomodori; i++)
  {
    console.log("i: " + i);
    if(i % 4 != 0)
    {
      string += "<span class='glyphicon glyphicon-ok-circle'></span>";    
    }
   
    if(i % 4 == 0)
    {
      string += "<span class='glyphicon glyphicon-ok-sign' style='padding-right: 20px'></span>";
    }
  }
  pomodoriDiv.html(string); 
}

function pomodoroToggle()
{
  if(pomodoroMode == 0)
  {
    $("#pomodori").show();
    pomodoroMode = 1;
    setCookie("pomodoroMode", 1, 365);
  }
  else
  {
    $("#pomodori").hide();
    $("#pomodori .message").html("");
    $("#pomodori .icons").html("");
    pomodoroMode = 0;
    setCookie("pomodoroMode", 0, 365);
  }
}

function shortBreak()
{
  isPaused = 1;
  $("#pomodori .message").html("Time for a five minute break.");
  setTimeout(function(){
    $("#pomodori .message").html("");
    isPaused = 0;
  }, (60*5*1000));
}

function longBreak()
{
  isPaused = 1; 
  $("#pomodori .message").html("Four pomodori! You've earned a 30 minute break.");
  setTimeout(function(){
    isPaused = 0; 
    $("#pomodori .message").html("");
  }, (60*30*1000));
}