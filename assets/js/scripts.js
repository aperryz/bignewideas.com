$(function(){
  $("nav li span").each(function(){
    $(this).css('min-width',$(this).width()+20);
  });

  $("#intro-title").fitText(1, { maxFontSize: '55px' });

  $('.slidewrap').carousel({
        slider: '.slider',
        slide: '.slide',
        slideHed: '.slidehed',
        nextSlide : '.next',
        prevSlide : '.prev',
        addPagination: false,
        addNav : true
  });

  $("#home section").each(function(){
    $(this).on('inview',function(event, isInView){
      $menuItem = $('nav').find('.'+$(this).prop('id'));
      if (isInView && $(window).scrollTop() >= $(this).offset().top-100) {
        $menuItem.addClass('extend');
      } else {
        $menuItem.removeClass('extend');
      }
    });
  });

  $("nav a").each(function(){
    $(this).on('click',function(){
      $("nav a").removeClass('extend');
      $(this).addClass('extend');
    });
  });

  $("#canvas").exists( function () {
    return;
    var $canvas = $(this);

    var base_radius  = $canvas.width()/6,
        multiplier     = base_radius*2.75,
        default_opacity = 0.7,
        shape_colour = "white",
        font_style = '18pt "league-gothic-1","league-gothic-2" sans-serif',
        alt_style = '16pt "league-gothic-1","league-gothic-2" sans-serif';

    var initial_coordinates    = [[base_radius*3, base_radius],[base_radius*1.75, multiplier],[base_radius*4.25, multiplier]];
    var center_coordinates    = [[base_radius*3, base_radius*1.65],[base_radius*2.4, multiplier],[base_radius*3.6, multiplier]];

    var previous_click = 0;

    var moveGroup = function (layer) {

      $canvas.animateLayerGroup("circles",true);

      var distance = base_radius;
      var sign = "-";

      var top_circle = $canvas.getLayer("top_circle");
      var current_layer = $canvas.getLayer(layer).name.split("_")[0];

      console.log(current_layer);

      if (current_layer == "top") {
        current_layer = "right";
      } else if (current_layer == "left") {
        sign = "+";
      }

      if (current_layer === previous_click) return;

      if ($canvas.width()/2 != top_circle.x) {
        distance = distance*2;
      }

      $canvas.animateLayerGroup("circles", {
        x: sign+"="+distance
      },"slow");
      $canvas.animateLayerGroup("main_text", {
        x: sign+"="+distance
      },"slow");
      $canvas.animateLayerGroup("alternate_text", {
        x: sign+"="+distance
      },"slow");
      $canvas.animateLayerGroup("center_text", {
        x: sign+"="+distance
      },"slow");

      previous_click = current_layer;

    };

    $("#canvas").addLayer({
      method: "drawArc",
      name: "top_circle",
      group: "circles",
      fillStyle: shape_colour,
      opacity: default_opacity,
      x: initial_coordinates[0][0], y: initial_coordinates[0][1],
      radius: base_radius,
      click: moveGroup
    }).addLayer({
      method: "drawArc",
      name: "left_circle",
      group: "circles",
      fillStyle: shape_colour,
      opacity: default_opacity,
      x: initial_coordinates[1][0], y: initial_coordinates[1][1],
      radius: base_radius,
      click: moveGroup
    }).addLayer({
      method: "drawArc",
      name: "right_circle",
      group: "circles",
      fillStyle: shape_colour,
      opacity: default_opacity,
      x: initial_coordinates[2][0], y: initial_coordinates[2][1],
      radius: base_radius,
      click: moveGroup
    })
    .addLayer( {
      method: "drawText",
      name: "top_text",
      group: "main_text",
      fillStyle: "#fff",
      opacity: 0,
      x: initial_coordinates[0][0], y: initial_coordinates[0][1],
      font: font_style,
      text: "DESIGN"
    })
    .addLayer( {
      method: "drawText",
      name: "left_text",
      group: "main_text",
      fillStyle: "#fff",
      opacity: 0,
      x: initial_coordinates[1][0], y: initial_coordinates[1][1],
      font: font_style,
      text: "COMMUNICATION"
    })
    .addLayer( {
      method: "drawText",
      name: "right_text",
      group: "main_text",
      fillStyle: "#fff",
      opacity: 0,
      x: initial_coordinates[2][0], y: initial_coordinates[2][1],
      font: font_style,
      text: "STRATEGY"
    })
    .addLayer( {
      method: "drawText",
      name: "topleft_text",
      group: "alternate_text",
      fillStyle: "#000",
      opacity: 0,
      x: center_coordinates[0][0]-60, y: center_coordinates[0][1]+50,
      font: alt_style,
      text: "NARRATIVE"
    })
    .addLayer( {
      method: "drawText",
      name: "topright_text",
      group: "alternate_text",
      fillStyle: "#000",
      opacity: 0,
      x: center_coordinates[2][0]-15, y: center_coordinates[2][1]-80,
      font: alt_style,
      text: "PROCESS"
    })
    .addLayer( {
      method: "drawText",
      name: "leftright_text",
      group: "alternate_text",
      fillStyle: "#000",
      opacity: 0,
      x: center_coordinates[2][0]-70, y: center_coordinates[2][1]+20,
      font: alt_style,
      text: "ENGAGEMENT"
    })
    .addLayer( {
      method: "drawText",
      name: "center_text",
      group: "center_text",
      fillStyle: "#000",
      opacity: 0,
      x: center_coordinates[2][0]-70, y: center_coordinates[2][1]-45,
      fromCenter: true,
      font: alt_style,
      text: "COMMUNITY"
    })
    .drawLayers();

    $("#canvas").bind('inview', function(event, isInView) {
      if (isInView) {
        $(this).animateLayer("top_circle", {
          x: center_coordinates[0][0], y: center_coordinates[0][1],
        }, 1500, "swing")
        .animateLayer("top_text", {
          x: center_coordinates[0][0], y: center_coordinates[0][1],
          opacity: 1
        }, 1500, "swing")
        .animateLayer("left_circle", {
          x: center_coordinates[1][0], y: center_coordinates[1][1],
        }, 1500, "swing")
        .animateLayer("left_text", {
          x: center_coordinates[1][0]-40, y: center_coordinates[1][1]+10,
          opacity: 1
        }, 1500, "swing")
        .animateLayer("right_circle", {
          x: center_coordinates[2][0], y: center_coordinates[2][1],
        }, 1500, "swing")
        .animateLayer("right_text", {
          x: center_coordinates[2][0]+30, y: center_coordinates[2][1]+10,
          opacity: 1
        }, 1500, "swing");

        $(this).animateLayerGroup("alternate_text",{
          opacity: 1
        }, 3000,"swing");
        $(this).animateLayerGroup("center_text",{
          opacity: 1
        }, 4000,"swing");
      } else {
        $(this).animateLayer("top_circle", {
          x: center_coordinates[0][0], y: center_coordinates[0][1],
        }, "fast", "swing")
        .animateLayer("left_circle", {
          x: center_coordinates[1][0], y: center_coordinates[1][1],
        }, "fast", "swing")
        .animateLayer("right_circle", {
          x: center_coordinates[2][0], y: center_coordinates[2][1],
        }, "fast", "swing");
        $(this).animateLayerGroup("alternate_text",{
          opacity: 0
        },"fast");
        previous_click = 0;
      }
    });
  } );

  $projects = $(".thumb-grid").find(".slides");

  $projects.imagesLoaded(function(){
    $(this).each(function(){
      var $this = $(this);
      var images = $this.find("img");
      var firstImage = $this.find("img").last();

      firstImage.parent().addClass("first-image");

      $this
      .height(firstImage.height()).animate({
        opacity: 1
      }, 500);

      imageSlideshow = function(){};
      $this.on("mouseenter", function(){
        imageSlideshow = setInterval(function(){
          $this.find("li:last").hide(0,function(){
            $(this).prependTo($this);
            $(this).show();
          });
        }, 350);
      })
      .on("mouseleave", function(){
        clearInterval(imageSlideshow);
        $this.find('li.first-image').appendTo($this).show();
      });
    });
  });
});