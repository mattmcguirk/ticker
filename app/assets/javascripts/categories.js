$(document).ready(function(){
  
  $("#category-list .controls .delete").on("click", removeCategory);    

});

function removeCategory()
{
  $(this).parents("tr").fadeOut(750);
}
