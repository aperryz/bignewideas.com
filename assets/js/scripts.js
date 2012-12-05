$(function(){
  $("nav li span").each(function(){
    $(this).css('min-width',$(this).width()+20);
  });

  var base_radius  = 117.5,
      multiplier     = base_radius*2.25,
      default_opacity = 0.7,
      shape_colour = "white";

  var expand_info = function(layer) {
    randomColour = '#'+Math.floor(Math.random()*16777215).toString(16);
    $(this).animateLayer(layer, {
      fillStyle: randomColour,
    }).bringToTop(layer);
  }

  var coordinates   = [[base_radius*1.75, base_radius],[base_radius, multiplier],[base_radius*2.5, multiplier]];

  $("canvas").addLayer({
    method: "drawArc",
    fillStyle: shape_colour,
    opacity: default_opacity,
    x: base_radius*1.75, y: base_radius,
    radius: base_radius,
    click: expand_info
  }).addLayer({
    method: "drawArc",
    fillStyle: shape_colour,
    opacity: default_opacity,
    x: base_radius, y: multiplier,
    radius: base_radius,
    click: expand_info
  }).addLayer({
    method: "drawArc",
    fillStyle: shape_colour,
    opacity: default_opacity,
    x: base_radius*2.5, y: multiplier,
    radius: base_radius,
    click: expand_info
  })
  .drawLayers();


  $("#intro-title").fitText(1.4);
});

// Get jCanvas layers
$.fn.bringToTop = function(layer) {
  var layers = $(this).getLayers();
  layers.splice(layer.index, 1);
  layer.index = layers.push(layer);
};
