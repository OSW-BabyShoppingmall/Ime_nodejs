

$(document).ready(function(){
    $("#infobtn").click(function(){
      $(".infodescription").fadeIn(3000);
    });
  });


  $(document).ready(function(){
    $("#image-frame1").mouseenter(function(){
      $("#image-caption1").slideDown("slow");
    });
    $("#image-frame1").mouseleave(function(){
      $("#image-caption1").slideUp("slow");
    });
  
    $("#image-frame2").mouseenter(function(){
      $("#image-caption2").slideDown("slow");
    });
    $("#image-frame2").mouseleave(function(){
      $("#image-caption2").slideUp("slow");
    });
  
    $("#image-frame3").mouseenter(function(){
      $("#image-caption3").slideDown("slow");
    });
    $("#image-frame3").mouseleave(function(){
      $("#image-caption3").slideUp("slow");
    });
  });