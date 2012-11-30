$(function(){
  $("nav span").each(function(index){
    $(this).css('min-width',function(){
      return $(this).width() + 5;
    });
    $(this).data('original-width',$(this).width()+5);
  });

  $("nav li").hover(function(){

  });
});