/**
 * @name jQuery Stick 'em
 * @author Trevor Davis
 * @version 1.4
 *
 *  $('.container').stickem({
 *    item: '.stickem',
 *    container: '.stickem-container',
 *    stickClass: 'stickit',
 *    endStickClass: 'stickit-end',
 *    offset: 0,
 *    onStick: null,
 *    onUnstick: null
 *  });
 */

;(function($, window, document, undefined) {

  var Stickem = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data("stickem-options");
    this.$win = $(window);
  };

  Stickem.prototype = {
    defaults: {
      item: '.stickem',
      container: '.stickem-container',
      stickClass: 'stickit',
      endStickClass: 'stickit-end',
      offset: 0,
      start: 0,
      onStick: null,
      onUnstick: null
    },

    init: function() {
      var _self = this;

      //Merge options
      _self.config = $.extend({}, _self.defaults, _self.options, _self.metadata);

      _self.setWindowHeight();
      _self.getItems();
      _self.bindEvents();

      return _self;
    },

    bindEvents: function() {
      var _self = this;

      _self.$win.on('scroll.stickem', $.proxy(_self.handleScroll, _self));
      _self.$win.on('resize.stickem', $.proxy(_self.handleResize, _self));
    },

    destroy: function() {
      var _self = this;

      _self.$win.off('scroll.stickem');
      _self.$win.off('resize.stickem');
    },

    getItem: function(index, element) {
      var _self = this;
      var $this = $(element);
      var item = {
        $elem: $this,
        elemHeight: $this.height(),
        $container: $this.parents(_self.config.container),
        isStuck: false
      };

      //If the element is smaller than the window
      if(_self.windowHeight > item.elemHeight) {
        item.containerHeight = item.$container.outerHeight();
        item.containerInner = {
          border: {
            bottom: parseInt(item.$container.css('border-bottom'), 10) || 0,
            top: parseInt(item.$container.css('border-top'), 10) || 0
          },
          padding: {
            bottom: parseInt(item.$container.css('padding-bottom'), 10) || 0,
            top: parseInt(item.$container.css('padding-top'), 10) || 0
          }
        };

        item.containerInnerHeight = item.$container.height();
        item.containerStart = item.$container.offset().top - _self.config.offset + _self.config.start + item.containerInner.padding.top + item.containerInner.border.top;
        item.scrollFinish = item.containerStart - _self.config.start + (item.containerInnerHeight - item.elemHeight);

        //If the element is smaller than the container
        if(item.containerInnerHeight > item.elemHeight) {
          _self.items.push(item);
        }
      } else {
        item.$elem.removeClass(_self.config.stickClass + ' ' + _self.config.endStickClass);
      }
    },

    getItems: function() {
      var _self = this;

      _self.items = [];

      _self.$elem.find(_self.config.item).each($.proxy(_self.getItem, _self));
    },

    handleResize: function() {
      var _self = this;

      _self.getItems();
      _self.setWindowHeight();
    },

    handleScroll: function() {
      var _self = this;

      if(_self.items.length > 0) {
        var pos = _self.$win.scrollTop();

        for(var i = 0, len = _self.items.length; i < len; i++) {
          var item = _self.items[i];

          //If it's stuck, and we need to unstick it
          if(item.isStuck && (pos < item.containerStart || pos > item.scrollFinish)) {
            item.$elem.removeClass(_self.config.stickClass);

            //only at the bottom
            if(pos > item.scrollFinish) {
              item.$elem.addClass(_self.config.endStickClass);
            }

            item.isStuck = false;

            //if supplied fire the onUnstick callback
            if(_self.config.onUnstick) {
              _self.config.onUnstick(item);
            }

          //If we need to stick it
          } else if(item.isStuck === false && pos > item.containerStart && pos < item.scrollFinish) {
              item.$elem.removeClass(_self.config.endStickClass).addClass(_self.config.stickClass);
              item.isStuck = true;

              //if supplied fire the onStick callback
              if(_self.config.onStick) {
                _self.config.onStick(item);
              }
          }
        }
      }
    },

    setWindowHeight: function() {
      var _self = this;

      _self.windowHeight = _self.$win.height() - _self.config.offset;
    }
  };

  Stickem.defaults = Stickem.prototype.defaults;

  $.fn.stickem = function(options) {
    //Create a destroy method so that you can kill it and call it again.
    this.destroy = function() {
      this.each(function() {
        new Stickem(this, options).destroy();
      });
    };

    return this.each(function() {
      new Stickem(this, options).init();
    });
  };

})(jQuery, window , document);

/*
 jCanvas
Copyright 2012, Caleb Evans
Licensed under the MIT license
*/
(function(d,T,W,R,X,v,F,i,A){function B(){}function D(c){c?y(Y,c):D.prefs=Y=B.prototype=y({},O);return this}function J(c,a){c.fillStyle=a.fillStyle;c.strokeStyle=a.strokeStyle;c.lineWidth=a.strokeWidth;a.rounded?(c.lineCap="round",c.lineJoin="round"):(c.lineCap=a.strokeCap,c.lineJoin=a.strokeJoin,c.miterLimit=a.miterLimit);c.shadowOffsetX=a.shadowX;c.shadowOffsetY=a.shadowY;c.shadowBlur=a.shadowBlur;c.shadowColor=a.shadowColor;c.globalAlpha=a.opacity;c.globalCompositeOperation=a.compositing}function z(c){return c&&
c.getContext?c.getContext("2d"):i}function M(c,a){a.closed&&c.closePath();c.fill();"transparent"!==a.fillStyle&&(c.shadowColor="transparent");c.stroke();a.closed||c.closePath();a._toRad&&c.restore();a.mask&&(a.autosave&&c.save(),c.clip())}function Z(c,a,b){a.translate&&(a.translateX=a.translateY=a.translate);c.translate(a.translateX,a.translateY);b.translateX+=a.translateX;b.translateY+=a.translateY}function $(c,a,b){1!==a.scale&&(a.scaleX=a.scaleY=a.scale);c.translate(a.x,a.y);c.scale(a.scaleX,a.scaleY);
c.translate(-a.x,-a.y);b.scaleX*=a.scaleX;b.scaleY*=a.scaleY}function aa(c,a,b){a._toRad=a.inDegrees?C/180:1;c.translate(a.x,a.y);c.rotate(a.rotate*a._toRad);c.translate(-a.x,-a.y);b.rotate+=a.rotate}function H(c,a,b,e,g){b._toRad=b.inDegrees?C/180:1;a.save();g===A&&(g=e);!c&&!b.fromCenter&&(b.x+=e/2,b.y+=g/2);b.rotate&&aa(a,b,{});(1!==b.scale||1!==b.scaleX||1!==b.scaleY)&&$(a,b,{});(b.translate||b.translateX||b.translateY)&&Z(a,b,{})}function U(c){c.draggable&&(c.translateX+=c.x,c.translateY+=c.y)}
function I(c){var a;E.elem===c?a=E.data:(a=d.data(c,"jCanvas"),a||(a={layers:[],intersects:[],drag:{},event:{},transforms:{rotate:0,scaleX:1,scaleY:1,translateX:0,translateY:0}},a.savedTransforms=a.transforms,d.data(c,"jCanvas",a)),E.elem=c,E.data=a);return a}function ba(c,a,b){b&&b.visible&&(b.method===d.fn.draw?b.fn.call(c[0],a):b.method&&b.method.call(c,b))}function G(c,a,b){var e,g,f,n="function"===typeof a,p,a=a||{};if(a.layer&&!a._layer){e=d(c);g=e.getLayers();n&&(a={method:d.fn.draw,fn:a});
a=y(new B,a);if(!n){a.method=d.fn[a.method]||b;p=I(c);for(f in D.events)D.events.hasOwnProperty(f)&&a[f]&&(D.events[f](e,p),a._event=v);if(a.draggable||a.cursor){a._event=v;c=["mousedown","mousemove","mouseup"];for(b=0;b<c.length;b+=1)f=c[b],D.events[f](e,p);p.mouseout||(e.bind("mouseout.jCanvas",function(){p.drag={};e.drawLayers()}),p.mouseout=v)}}a.layer=v;a._layer=v;a.index===A&&(a.index=g.length);g.splice(a.index,0,a)}}function ca(c){var a;for(a=0;a<L.length;a+=1)c[L[a]]=c["_"+L[a]]}function da(c,
a){var b;for(b=0;b<L.length;b+=1)c["_"+L[b]]=c[L[b]],V[L[b]]=1,a&&delete c[L[b]]}function ea(c){var a,b,e=[],g=1;c.match(/^#?\w+$/i)&&("transparent"===c&&(c="rgba(0,0,0,0)"),b=T.head,a=b.style.color,b.style.color=c,c=d.css(b,"color"),b.style.color=a);c.match(/^rgb/i)&&(e=c.match(/\d+/gi),c.match(/%/gi)&&(g=2.55),e[0]*=g,e[1]*=g,e[2]*=g,e[3]=e[3]!==A?X(e[3]):1);return e}function ga(c){var a=3,b;"object"!==typeof c.start&&(c.start=ea(c.start),c.end=ea(c.end));c.now=[];if(1!==c.start[3]||1!==c.end[3])a=
4;for(b=0;b<a;b+=1)c.now[b]=c.start[b]+(c.end[b]-c.start[b])*c.pos,3>b&&(c.now[b]=P(c.now[b]));1!==c.start[3]||1!==c.end[3]?c.now="rgba("+c.now.join(",")+")":(c.now.slice(0,3),c.now="rgb("+c.now.join(",")+")");c.elem.nodeName?c.elem.style[c.prop]=c.now:c.elem[c.prop]=c.now}function N(c){D.events[c]=function(a,b){var e="mouseover"===c||"mouseout"===c?"mousemove":c,g=b.event;b[e]||(a.bind(e+".jCanvas",function(b){g.x=b.offsetX;g.y=b.offsetY;g.type=e;a.drawLayers(v);b.preventDefault()}),b[e]=v)}}function K(c,
a,b){var c=I(c),e=c.event,a=a.isPointInPath(e.x,e.y),g=c.transforms,f,n;b.mouseX=e.x;b.mouseY=e.y;n=c.transforms.rotate*C/180;e=b.mouseX;f=b.mouseY;b._mouseX=e*Q(-n)-f*S(-n);b._mouseY=f*Q(-n)+e*S(-n);b._mouseX/=g.scaleX;b._mouseY/=g.scaleY;!a&&(b._hovered&&!b._fired)&&(b._mousedout=v);a&&c.intersects.push(b)}function fa(c,a,b,e,g){var f=/\b(\d*\.?\d*)\w\w\b/gi,n;if(E.text===e.text&&E.font===e.font&&E.maxWidth===e.maxWidth&&E.lineHeight===e.lineHeight)e.width=E.width,e.height=E.height;else if(!a){e.width=
b.measureText(g[0]).width;for(a=1;a<g.length;a+=1)n=b.measureText(g[a]).width,n>e.width&&(e.width=n);b=c.style.fontSize;if(a=e.font.match(f))c.style.fontSize=e.font.match(f)[0];e.height=X(d.css(c,"fontSize"))*g.length*e.lineHeight;c.style.fontSize=b}}var O,Y,y=d.extend,P=R.round,C=R.PI,S=R.sin,Q=R.cos,ha=d.event.fix,E={},L,V;d.fn.jCanvas=D;D.events={};O={align:"center",autosave:v,baseline:"middle",bringToFront:F,ccw:F,closed:F,compositing:"source-over",cornerRadius:0,cropFromCenter:v,draggable:F,
disableDrag:F,each:i,end:360,fillStyle:"transparent",font:"12pt sans-serif",fromCenter:v,height:i,inDegrees:v,lineHeight:1,load:i,mask:F,maxWidth:i,method:i,miterLimit:10,opacity:1,projection:0,r1:i,r2:i,radius:0,repeat:"repeat",rotate:0,rounded:F,scale:1,scaleX:1,scaleY:1,shadowBlur:0,shadowColor:"transparent",shadowX:0,shadowY:0,sHeight:i,sides:3,source:"",start:0,strokeCap:"butt",strokeJoin:"miter",strokeStyle:"transparent",strokeWidth:1,sWidth:i,sx:i,sy:i,text:"",translate:0,translateX:0,translateY:0,
visible:v,width:i,x:0,y:0};D();D.extend=function(c){D.defaults=O=y(O,c.props);D();c.name&&(d.fn[c.name]=function b(e){var g,f,n,d=y(new B,e);for(f=0;f<this.length;f+=1)if(g=this[f],n=z(g))G(g,e,b),J(n,d),c.fn.call(g,n,d);return this});return d.fn[c.name]};d.fn.getLayers=function(){var c=this[0];return!c||!c.getContext?[]:I(c).layers};d.fn.getLayer=function(c){var a=this.getLayers(),b=d.type(c),e,g;if(c&&c.layer)e=c;else if("number"===b)e=a[c];else for(g=0;g<a.length;g+=1)if(a[g].index=g,a[g].name===
c||"regexp"===b&&a[g].name.match(c)){e=a[g];break}return e};d.fn.setLayer=function(c,a){var b,e;for(b=0;b<this.length;b+=1)e=d(this[b]).getLayer(c),y(e,a);return this};d.fn.removeLayer=function(c){var a,b,e;for(b=0;b<this.length;b+=1)a=d(this[b]),e=a.getLayers(),(a=a.getLayer(c))&&e.splice(a.index,1);return this};d.fn.removeLayers=function(){var c,a;for(c=0;c<this.length;c+=1)a=d(this[c]).getLayers(),a.length=0;return this};d.fn.getLayerGroup=function(c){var a=this.getLayers(),b=d.type(c),e=[],g;
if("array"===b)return c;for(g=0;g<a.length;g+=1)a[g].index=g,(a[g].group===c||"regexp"===b&&a[g].group.match(c))&&e.push(a[g]);return e};d.fn.setLayerGroup=function(c,a){var b,e,g;for(e=0;e<this.length;e+=1){b=d(this[e]);b=b.getLayerGroup(c);for(g=0;g<b.length;g+=1)y(b[g],a)}return this};d.fn.removeLayerGroup=function(c){var a,b,e=d.type(c),g;if(c!==A)for(b=0;b<this.length;b+=1){a=d(this[b]);a=a.getLayers();for(g=0;g<a.length;g+=1)if(a[g].index=g,a[g].group===c||"regexp"===e&&a[g].group.match(c))a.splice(g,
1),g-=1}return this};d.fn.drawLayer=function(c){var a,b,e,g;for(a=0;a<this.length;a+=1)e=d(this[a]),b=z(this[a]),g=e.getLayer(c),ba(e,b,g);return this};d.fn.drawLayers=function(c){var a,b,e,g,f,n,p,s;for(b=0;b<this.length;b+=1)if(a=d(this[b]),e=z(this[b])){I(this[b]);a.clearCanvas();E.elem===this[b]?p=E.data:(p=I(this[b]),E.elem=this[b],E.data=p);g=p.layers;for(n=0;n<g.length;n+=1)if(f=g[n],f.index=n,c&&(f._fired=F),ba(a,e,f),f._mousedout)f._mousedout=F,f._fired=v,f._hovered=F,f.mouseout&&f.mouseout.call(this[b],
f),f.cursor&&f._cursor&&a.css({cursor:f._cursor});f=p.intersects[p.intersects.length-1]||{};e=p.event;e=e.type;s=f[e];n=p.drag;if(f._event){if((f.mouseover||f.mouseout||f.cursor)&&!f._hovered&&!f._fired)f._fired=v,f._hovered=v,f.mouseover&&f.mouseover.call(this[b],f),f.cursor&&(f._cursor=a.css("cursor"),a.css({cursor:f.cursor}));s&&!f._fired&&(f._fired=v,s.call(this[b],f));f.draggable&&(!f.disableDrag&&"mousedown"===e)&&(f.bringToFront&&(g.splice(f.index,1),f.index=g.push(f)),n.layer=f,n.dragging=
v,n.startX=f.x,n.startY=f.y,n.endX=f._mouseX,n.endY=f._mouseY,f.dragstart&&f.dragstart.call(this[b],f))}if(n.layer&&(n.dragging&&"mouseup"===e&&(n.layer.dragstop&&n.layer.dragstop.call(this[b],n.layer),p.drag={}),n.dragging&&"mousemove"===e))n.layer.x=n.layer._mouseX-(n.endX-n.startX),n.layer.y=n.layer._mouseY-(n.endY-n.startY),n.layer.drag&&n.layer.drag.call(this[b],n.layer)}p.intersects=[];return this};d.fn.addLayer=function(c){var a,b,c=c||{};for(a=0;a<this.length;a+=1)if(b=z(this[a]))c.layer=
v,G(this[a],c);return this};L=["width","height","opacity","lineHeight"];V={};d.fn.animateLayer=function(){function c(a,b){return function(){ca(b);a.drawLayers();f[4]&&f[4].call(a[0],b)}}function a(a,b){return function(c,e){ca(b);a.drawLayers();f[5]&&f[5].call(a[0],c,e,b)}}var b,e,g,f=[].slice.call(arguments,0);"object"===typeof f[0]&&!f[0].layer&&f.unshift(0);"object"===typeof f[2]?(f.splice(2,0,f[2].duration||i),f.splice(3,0,f[3].easing||i),f.splice(4,0,f[4].complete||i),f.splice(5,0,f[5].step||
i)):(f[2]===A?(f.splice(2,0,i),f.splice(3,0,i),f.splice(4,0,i)):"function"===typeof f[2]&&(f.splice(2,0,i),f.splice(3,0,i)),f[3]===A)?(f[3]=i,f.splice(4,0,i)):"function"===typeof f[3]&&f.splice(3,0,i);f[1]=y({},f[1]);for(e=0;e<this.length;e+=1)if(b=d(this[e]),g=z(this[e]))if(I(this[e]),(g=b.getLayer(f[0]))&&g.method!==d.fn.draw)da(g),da(f[1],v),g.style=V,d(g).animate(f[1],{duration:f[2],easing:d.easing[f[3]]?f[3]:i,complete:c(b,g),step:a(b,g)});return this};d.fn.animateLayerGroup=function(c){var a,
b,e=[].slice.call(arguments,0),g,f;for(b=0;b<this.length;b+=1){a=d(this[b]);g=a.getLayerGroup(c);for(f=0;f<g.length;f+=1)a.animateLayer.apply(a,[g[f]].concat(e.slice(1)))}};d.fn.delayLayer=function(c,a){var b,e,a=a||0;for(b=0;b<this.length;b+=1)e=d(this[b]).getLayer(c),d(e).delay(a);return this};d.fn.delayLayerGroup=function(c,a){var b,e,g,f,a=a||0;for(e=0;e<this.length;e+=1){b=d(this[e]);g=b.getLayerGroup(c);for(f=0;f<g.length;f+=1)b.delayLayer.call(b,g[f],a)}};d.fn.stopLayer=function(c,a){var b,
e;for(b=0;b<this.length;b+=1)e=d(this[b]).getLayer(c),d(e).stop(a);return this};d.fn.stopLayerGroup=function(c,a){var b,e,g,f;for(e=0;e<this.length;e+=1){b=d(this[e]);g=b.getLayerGroup(c);for(f=0;f<g.length;f+=1)b.stopLayer.call(b,g[f],a)}};(function(c){var a;for(a=0;a<c.length;a+=1)d.fx.step[c[a]]=ga})("color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor fillStyle outlineColor strokeStyle shadowColor".split(" "));N("click");N("dblclick");N("mousedown");
N("mouseup");N("mousemove");N("mouseover");N("mouseout");d.event.fix=function(c){var a,c=ha.call(d.event,c);if(c.pageX!==A&&c.offsetX===A&&(a=d(c.target).offset()))c.offsetX=c.pageX-a.left,c.offsetY=c.pageY-a.top;return c};d.fn.draw=function a(b){var e,g,b=b||{};"function"===typeof b&&(b={fn:b});for(e=0;e<this.length;e+=1)if((g=z(this[e]))&&b.fn)G(this[e],b,a),b.fn.call(this[e],g);return this};d.fn.clearCanvas=function(a){for(var b,e=y(new B,a),a=0;a<this.length;a+=1)if(b=z(this[a]))H(a,b,e,e.width,
e.height),b.setTransform(1,0,0,1,0,0),!e.x||!e.y||!e.width||!e.height?b.clearRect(0,0,this[a].width,this[a].height):b.clearRect(e.x-e.width/2,e.y-e.height/2,e.width,e.height),b.restore();return this};d.fn.saveCanvas=function(){var a,b,e;for(a=0;a<this.length;a+=1)if(b=z(this[a]))e=I(this[a]),b.save(),e.savedTransforms=y({},e.transforms);return this};d.fn.restoreCanvas=function(){var a,b,e;for(a=0;a<this.length;a+=1)if(b=z(this[a]))e=I(this[a]),b.restore(),e.transforms=e.savedTransforms;return this};
d.fn.translateCanvas=function(a){for(var b,e=y(new B,a),g,a=0;a<this.length;a+=1)if(b=z(this[a]))g=I(this[a]),e.autosave&&b.save(),Z(b,e,g.transforms);return this};d.fn.scaleCanvas=function(a){for(var b,e=y(new B,a),g,a=0;a<this.length;a+=1)if(b=z(this[a]))g=I(this[a]),e.autosave&&b.save(),$(b,e,g.transforms);return this};d.fn.rotateCanvas=function(a){for(var b,e=y(new B,a),g,a=0;a<this.length;a+=1)if(b=z(this[a]))g=I(this[a]),e.autosave&&b.save(),aa(b,e,g.transforms);return this};d.fn.drawRect=function b(e){var g,
f,n=y(new B,e),d,s,u,q,j;for(g=0;g<this.length;g+=1)if(f=z(this[g]))G(this[g],e,b),J(f,n),H(g,f,n,n.width,n.height),f.beginPath(),d=n.x-n.width/2,s=n.y-n.height/2,(j=n.cornerRadius)?(n.closed=v,u=n.x+n.width/2,q=n.y+n.height/2,0>u-d-2*j&&(j=(u-d)/2),0>q-s-2*j&&(j=(q-s)/2),f.moveTo(d+j,s),f.lineTo(u-j,s),f.arc(u-j,s+j,j,3*C/2,2*C,F),f.lineTo(u,q-j),f.arc(u-j,q-j,j,0,C/2,F),f.lineTo(d+j,q),f.arc(d+j,q-j,j,C/2,C,F),f.lineTo(d,s+j),f.arc(d+j,s+j,j,C,3*C/2,F)):f.rect(d,s,n.width,n.height),n._event&&K(this[g],
f,e),M(f,n);return this};d.fn.drawArc=function e(g){var f,d,p=y(new B,g),g=g||{};!p.inDegrees&&360===p.end&&(g.end=p.end=2*C);for(f=0;f<this.length;f+=1)if(d=z(this[f]))G(this[f],g,e),J(d,p),H(f,d,p,2*p.radius),d.beginPath(),d.arc(p.x,p.y,p.radius,p.start*p._toRad-C/2,p.end*p._toRad-C/2,p.ccw),p._event&&K(this[f],d,g),M(d,p);return this};d.fn.drawEllipse=function g(f){var d,p,s=y(new B,f),u=4*s.width/3,q=s.height;s.closed=v;for(d=0;d<this.length;d+=1)if(p=z(this[d]))G(this[d],f,g),J(p,s),H(d,p,s,
s.width,s.height),p.beginPath(),p.moveTo(s.x,s.y-q/2),p.bezierCurveTo(s.x-u/2,s.y-q/2,s.x-u/2,s.y+q/2,s.x,s.y+q/2),p.bezierCurveTo(s.x+u/2,s.y+q/2,s.x+u/2,s.y-q/2,s.x,s.y-q/2),s._event&&K(this[d],p,f),M(p,s);return this};d.fn.drawPolygon=function f(d){var p,s,u=y(new B,d),q=2*C/u.sides,j=C/u.sides,l=j+C/2,m=u.radius*Q(q/2),o,i,k;u.closed=v;for(p=0;p<this.length;p+=1)if(s=z(this[p])){G(this[p],d,f);J(s,u);H(p,s,u,2*u.radius);s.beginPath();for(k=0;k<u.sides;k+=1)o=u.x+P(u.radius*Q(l)),i=u.y+P(u.radius*
S(l)),s.lineTo(o,i),u.projection&&(o=u.x+P((m+m*u.projection)*Q(l+j)),i=u.y+P((m+m*u.projection)*S(l+j)),s.lineTo(o,i)),l+=q;u._event&&K(this[p],s,d);M(s,u)}return this};d.fn.drawLine=function n(d){var i,u,q=y(new B,d),j,l,m;for(i=0;i<this.length;i+=1)if(u=z(this[i])){G(this[i],d,n);J(u,q);U(q);H(i,u,q,0);j=1;for(u.beginPath();v;)if(l=q["x"+j],m=q["y"+j],l!==A&&m!==A)u.lineTo(l,m),j+=1;else break;q._event&&K(this[i],u,d);M(u,q)}return this};d.fn.drawQuad=function p(d){var i,q,j=y(new B,d),l,m,o,r,
k;for(i=0;i<this.length;i+=1)if(q=z(this[i])){G(this[i],d,p);J(q,j);U(j);H(i,q,j,0);l=2;q.beginPath();for(q.moveTo(j.x1,j.y1);v;)if(m=j["x"+l],o=j["y"+l],r=j["cx"+(l-1)],k=j["cy"+(l-1)],m!==A&&o!==A&&r!==A&&k!==A)q.quadraticCurveTo(r,k,m,o),l+=1;else break;j._event&&K(this[i],q,d);M(q,j)}return this};d.fn.drawBezier=function s(d){var q,j,i=y(new B,d),m,o,r,k,h,t,w,x;for(q=0;q<this.length;q+=1)if(j=z(this[q])){G(this[q],d,s);J(j,i);U(i);H(q,j,i,0);m=2;o=1;j.beginPath();for(j.moveTo(i.x1,i.y1);v;)if(r=
i["x"+m],k=i["y"+m],h=i["cx"+o],t=i["cy"+o],w=i["cx"+(o+1)],x=i["cy"+(o+1)],r!==A&&k!==A&&h!==A&&t!==A&&w!==A&&x!==A)j.bezierCurveTo(h,t,w,x,r,k),m+=1,o+=2;else break;i._event&&K(this[q],j,d);M(j,i)}return this};d.fn.drawText=function u(q){var j,l,m=y(new B,q),o,r,k,h;for(j=0;j<this.length;j+=1)if(d(this[j]),l=z(this[j])){G(this[j],q,u);J(l,m);l.textBaseline=m.baseline;l.textAlign=m.align;l.font=m.font;if(!j&&m.maxWidth!==i){o=l;r=m.text;h=m.maxWidth;var t=m.text.split(" "),w=[],x="";if(o.measureText(r).width<
h)w=[r];else for(;0<t.length;)o.measureText(t[0]).width>h||o.measureText(x+t[0]).width<h?x+=t.shift()+" ":(w.push(x),x=""),0===t.length&&w.push(x);o=w;o=o.join("\n").replace(/( (\n))|( $)/gi,"$2").split("\n")}else j||(o=(""+m.text).split("\n"));fa(this[j],j,l,m,o);H(j,l,m,m.width,m.height);j||(k=m.x,"left"===m.align?k-=m.width/2:"right"===m.align&&(k+=m.width/2));for(r=0;r<o.length;r+=1)l.shadowColor=m.shadowColor,h=m.y+r*m.height/o.length-(o.length-1)*m.height/o.length/2,l.fillText(o[r],k,h),"transparent"!==
m.fillStyle&&(l.shadowColor="transparent"),l.strokeText(o[r],m.x,h);m._event?(l.beginPath(),l.rect(m.x-m.width/2,m.y-m.height/2,m.width,m.height),l.restore(),K(this[j],l,q),l.closePath()):l.restore()}E=m;return this};d.fn.measureText=function(d){var i;i=d!==A&&"object"!==typeof d?this.getLayer(d):y(new B,d);(d=z(this[0]))&&i.text!==A&&fa(this[0],0,d,i,i.text.split("\n"));return i};d.fn.drawImage=function q(d){function l(q,k,l){return function(){k||((x=t.width/t.height,h.width===i&&h.sWidth===i&&(d.width=
h.width=h.sWidth=t.width),h.height===i&&h.sHeight===i&&(d.height=h.height=h.sHeight=t.height),h.width===i&&h.sWidth!==i&&(h.width=h.sWidth),h.height===i&&h.sHeight!==i&&(h.height=h.sHeight),h.sWidth===i&&h.width!==i&&(d.sWidth=h.sWidth=t.width),h.sHeight===i&&h.height!==i&&(d.sHeight=h.sHeight=t.height),h.sx===i&&(h.sx=h.cropFromCenter?t.width/2:0),h.sy===i&&(h.sy=h.cropFromCenter?t.height/2:0),h.cropFromCenter||(h.sx+=h.sWidth/2,h.sy+=h.sHeight/2),h.sx+h.sWidth/2>t.width&&(h.sx=t.width-h.sWidth/
2),0>h.sx-h.sWidth/2&&(h.sx=h.sWidth/2),0>h.sy-h.sHeight/2&&(h.sy=h.sHeight/2),h.sy+h.sHeight/2>t.height&&(h.sy=t.height-h.sHeight/2),h.width!==i&&h.height===i)?d.height=h.height=h.width/x:h.width===i&&h.height!==i?d.width=h.width=h.height*x:h.width===i&&h.height===i&&(d.width=h.width=t.width,d.height=h.height=t.height));H(k,l,h,h.width,h.height);l.drawImage(t,h.sx-h.sWidth/2,h.sy-h.sHeight/2,h.sWidth,h.sHeight,h.x-h.width/2,h.y-h.height/2,h.width,h.height);h._event?(l.beginPath(),l.rect(h.x-h.width/
2,h.y-h.height/2,h.width,h.height),l.restore(),K(m[k],l,d),l.closePath()):l.restore();h.load&&h.load.call(q,d)}}var m=this,o,r,k,h=y(new B,d),t,w,x;w=h.source.getContext;h.source.src||w?(t=h.source,h.width=t.width,h.height=t.height):h.source&&(t=new W,t.src=h.source);for(r=0;r<m.length;r+=1)if(o=m[r],k=z(m[r]))G(m[r],d,q),J(k,h),t&&(t.complete||w?l(o,r,k)():(t.onload=l(o,r,k),t.src=t.src));return m};d.fn.createPattern=d.fn.pattern=function(d){function j(){k=m.createPattern(r,o.repeat);o.load&&o.load.call(l[0],
k)}var l=this,m,o=y(new B,d),r,k;(m=z(l[0]))?"function"===typeof o.source?(r=T.createElement("canvas"),r.width=o.width,r.height=o.height,d=z(r),o.source.call(r,d),j()):(d=o.source.getContext,o.source.src||d?r=o.source:(r=new W,r.src=o.source),r.complete||d?j():r.onload=j):k=i;return k};d.fn.createGradient=d.fn.gradient=function(d){var j,d=y(new B,d),l=[],m,o,r,k,h,t,w;if(j=z(this[0])){d.x1=d.x1||0;d.y1=d.y1||0;d.x2=d.x2||0;d.y2=d.y2||0;j=d.r1!==i||d.r2!==i?j.createRadialGradient(d.x1,d.y1,d.r1,d.x2,
d.y2,d.r2):j.createLinearGradient(d.x1,d.y1,d.x2,d.y2);for(k=1;d["c"+k]!==A;k+=1)d["s"+k]!==A?l.push(d["s"+k]):l.push(i);m=l.length;l[0]===i&&(l[0]=0);l[m-1]===i&&(l[m-1]=1);for(k=0;k<m;k+=1){if(l[k]!==i){t=1;w=0;o=l[k];for(h=k+1;h<m;h+=1)if(l[h]!==i){r=l[h];break}else t+=1;o>r&&(l[h]=l[k])}else l[k]===i&&(w+=1,l[k]=o+w*((r-o)/t));j.addColorStop(l[k],d["c"+(k+1)])}}else j=i;return j};d.fn.setPixels=function j(d){var i,o,r,k=y(new B,d),h={},t,w,x,v;for(o=0;o<this.length;o+=1)if(i=this[o],r=z(i)){G(this[o],
d,j);H(o,r,k,k.width,k.height);if(!k.x||!k.y||!k.width||!k.height)k.width=i.width,k.height=i.height,k.x=k.width/2,k.y=k.height/2;t=r.getImageData(k.x-k.width/2,k.y-k.height/2,k.width,k.height);w=t.data;v=w.length;h=[];if(k.each)for(x=0;x<v;x+=4)h.r=w[x],h.g=w[x+1],h.b=w[x+2],h.a=w[x+3],k.each.call(i,h),w[x]=h.r,w[x+1]=h.g,w[x+2]=h.b,w[x+3]=h.a;r.putImageData(t,k.x-k.width/2,k.y-k.height/2);r.restore()}return this};d.fn.getCanvasImage=function(d,l){var m=this[0];return m&&m.toDataURL?m.toDataURL("image/"+
d,l):i};d.support.canvas=T.createElement("canvas").getContext!==A;D.defaults=O;D.checkEvents=K;d.jCanvas=D})(jQuery,document,Image,Math,parseFloat,!0,!1,null);

/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize', resizer);

    });

  };

})( jQuery );