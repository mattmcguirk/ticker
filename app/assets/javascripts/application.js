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
    timeElapsed = 0;

$("body").css("transition","none");

$(document).on('ready', function(){
  
  var minutes = $(".minutes"),
      seconds = $(".seconds"),
      startButton =  $("#start"),
      finishButton = $("#finish"),
      resetButton = $("#reset"),
      categorySelect = $("#category"),
      nightModeControl = $("#night-mode-control");

  startButton.on("click", startTimer);
  finishButton.on("click", finishTask);  
  resetButton.on("click", resetTimer);      
  $(".task-log .controls .delete").on("click", removeTask);    
  categorySelect.on("change", categoryChange);
  $(".task-log .date-header").on("click", toggleTable);
  $(".task-log:first-of-type thead span.glyphicon")
                                             .removeClass("glyphicon-chevron-down")
                                             .addClass("glyphicon-chevron-up");
  nightModeControl.on("click", nightMode);
  
  if(getCookie("nightMode") == 1)
  {
    nightMode(); 
  }
  
  if(getCookie("timerStart") != "")
  {
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
      setCookie("timerDescription", $("#description textarea").val(), 365);
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
  console.log("remove row");
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