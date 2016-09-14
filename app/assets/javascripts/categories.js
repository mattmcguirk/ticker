$(document).ready(function(){
  
  $("#category-list .delete").on("click", removeCategory);    

});

function removeCategory()
{
  $(this).parents("tr").fadeOut(750);
}
