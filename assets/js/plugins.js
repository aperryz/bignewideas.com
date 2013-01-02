/* jCanvas. Copyright 2012, Caleb Evans. Licensed under the MIT license. */
(function(d,T,W,R,X,v,F,i,A){function B(){}function D(c){c?y(Y,c):D.prefs=Y=B.prototype=y({},O);return this}function J(c,a){c.fillStyle=a.fillStyle;c.strokeStyle=a.strokeStyle;c.lineWidth=a.strokeWidth;a.rounded?(c.lineCap="round",c.lineJoin="round"):(c.lineCap=a.strokeCap,c.lineJoin=a.strokeJoin,c.miterLimit=a.miterLimit);c.shadowOffsetX=a.shadowX;c.shadowOffsetY=a.shadowY;c.shadowBlur=a.shadowBlur;c.shadowColor=a.shadowColor;c.globalAlpha=a.opacity;c.globalCompositeOperation=a.compositing}function z(c){return c&&c.getContext?c.getContext("2d"):i}function M(c,a){a.closed&&c.closePath();c.fill();"transparent"!==a.fillStyle&&(c.shadowColor="transparent");c.stroke();a.closed||c.closePath();a._toRad&&c.restore();a.mask&&(a.autosave&&c.save(),c.clip())}function Z(c,a,b){a.translate&&(a.translateX=a.translateY=a.translate);c.translate(a.translateX,a.translateY);b.translateX+=a.translateX;b.translateY+=a.translateY}function $(c,a,b){1!==a.scale&&(a.scaleX=a.scaleY=a.scale);c.translate(a.x,a.y);c.scale(a.scaleX,a.scaleY);c.translate(-a.x,-a.y);b.scaleX*=a.scaleX;b.scaleY*=a.scaleY}function aa(c,a,b){a._toRad=a.inDegrees?C/180:1;c.translate(a.x,a.y);c.rotate(a.rotate*a._toRad);c.translate(-a.x,-a.y);b.rotate+=a.rotate}function H(c,a,b,e,g){b._toRad=b.inDegrees?C/180:1;a.save();g===A&&(g=e);!c&&!b.fromCenter&&(b.x+=e/2,b.y+=g/2);b.rotate&&aa(a,b,{});(1!==b.scale||1!==b.scaleX||1!==b.scaleY)&&$(a,b,{});(b.translate||b.translateX||b.translateY)&&Z(a,b,{})}function U(c){c.draggable&&(c.translateX+=c.x,c.translateY+=c.y)}function I(c){var a;E.elem===c?a=E.data:(a=d.data(c,"jCanvas"),a||(a={layers:[],intersects:[],drag:{},event:{},transforms:{rotate:0,scaleX:1,scaleY:1,translateX:0,translateY:0}},a.savedTransforms=a.transforms,d.data(c,"jCanvas",a)),E.elem=c,E.data=a);return a}function ba(c,a,b){b&&b.visible&&(b.method===d.fn.draw?b.fn.call(c[0],a):b.method&&b.method.call(c,b))}function G(c,a,b){var e,g,f,n="function"===typeof a,p,a=a||{};if(a.layer&&!a._layer){e=d(c);g=e.getLayers();n&&(a={method:d.fn.draw,fn:a});a=y(new B,a);if(!n){a.method=d.fn[a.method]||b;p=I(c);for(f in D.events)D.events.hasOwnProperty(f)&&a[f]&&(D.events[f](e,p),a._event=v);if(a.draggable||a.cursor){a._event=v;c=["mousedown","mousemove","mouseup"];for(b=0;b<c.length;b+=1)f=c[b],D.events[f](e,p);p.mouseout||(e.bind("mouseout.jCanvas",function(){p.drag={};e.drawLayers()}),p.mouseout=v)}}a.layer=v;a._layer=v;a.index===A&&(a.index=g.length);g.splice(a.index,0,a)}}function ca(c){var a;for(a=0;a<L.length;a+=1)c[L[a]]=c["_"+L[a]]}function da(c,a){var b;for(b=0;b<L.length;b+=1)c["_"+L[b]]=c[L[b]],V[L[b]]=1,a&&delete c[L[b]]}function ea(c){var a,b,e=[],g=1;c.match(/^#?\w+$/i)&&("transparent"===c&&(c="rgba(0,0,0,0)"),b=T.head,a=b.style.color,b.style.color=c,c=d.css(b,"color"),b.style.color=a);c.match(/^rgb/i)&&(e=c.match(/\d+/gi),c.match(/%/gi)&&(g=2.55),e[0]*=g,e[1]*=g,e[2]*=g,e[3]=e[3]!==A?X(e[3]):1);return e}function ga(c){var a=3,b;"object"!==typeof c.start&&(c.start=ea(c.start),c.end=ea(c.end));c.now=[];if(1!==c.start[3]||1!==c.end[3])a=4;for(b=0;b<a;b+=1)c.now[b]=c.start[b]+(c.end[b]-c.start[b])*c.pos,3>b&&(c.now[b]=P(c.now[b]));1!==c.start[3]||1!==c.end[3]?c.now="rgba("+c.now.join(",")+")":(c.now.slice(0,3),c.now="rgb("+c.now.join(",")+")");c.elem.nodeName?c.elem.style[c.prop]=c.now:c.elem[c.prop]=c.now}function N(c){D.events[c]=function(a,b){var e="mouseover"===c||"mouseout"===c?"mousemove":c,g=b.event;b[e]||(a.bind(e+".jCanvas",function(b){g.x=b.offsetX;g.y=b.offsetY;g.type=e;a.drawLayers(v);b.preventDefault()}),b[e]=v)}}function K(c,a,b){var c=I(c),e=c.event,a=a.isPointInPath(e.x,e.y),g=c.transforms,f,n;b.mouseX=e.x;b.mouseY=e.y;n=c.transforms.rotate*C/180;e=b.mouseX;f=b.mouseY;b._mouseX=e*Q(-n)-f*S(-n);b._mouseY=f*Q(-n)+e*S(-n);b._mouseX/=g.scaleX;b._mouseY/=g.scaleY;!a&&(b._hovered&&!b._fired)&&(b._mousedout=v);a&&c.intersects.push(b)}function fa(c,a,b,e,g){var f=/\b(\d*\.?\d*)\w\w\b/gi,n;if(E.text===e.text&&E.font===e.font&&E.maxWidth===e.maxWidth&&E.lineHeight===e.lineHeight)e.width=E.width,e.height=E.height;else if(!a){e.width=b.measureText(g[0]).width;for(a=1;a<g.length;a+=1)n=b.measureText(g[a]).width,n>e.width&&(e.width=n);b=c.style.fontSize;if(a=e.font.match(f))c.style.fontSize=e.font.match(f)[0];e.height=X(d.css(c,"fontSize"))*g.length*e.lineHeight;c.style.fontSize=b}}var O,Y,y=d.extend,P=R.round,C=R.PI,S=R.sin,Q=R.cos,ha=d.event.fix,E={},L,V;d.fn.jCanvas=D;D.events={};O={align:"center",autosave:v,baseline:"middle",bringToFront:F,ccw:F,closed:F,compositing:"source-over",cornerRadius:0,cropFromCenter:v,draggable:F,disableDrag:F,each:i,end:360,fillStyle:"transparent",font:"12pt sans-serif",fromCenter:v,height:i,inDegrees:v,lineHeight:1,load:i,mask:F,maxWidth:i,method:i,miterLimit:10,opacity:1,projection:0,r1:i,r2:i,radius:0,repeat:"repeat",rotate:0,rounded:F,scale:1,scaleX:1,scaleY:1,shadowBlur:0,shadowColor:"transparent",shadowX:0,shadowY:0,sHeight:i,sides:3,source:"",start:0,strokeCap:"butt",strokeJoin:"miter",strokeStyle:"transparent",strokeWidth:1,sWidth:i,sx:i,sy:i,text:"",translate:0,translateX:0,translateY:0,visible:v,width:i,x:0,y:0};D();D.extend=function(c){D.defaults=O=y(O,c.props);D();c.name&&(d.fn[c.name]=function b(e){var g,f,n,d=y(new B,e);for(f=0;f<this.length;f+=1)if(g=this[f],n=z(g))G(g,e,b),J(n,d),c.fn.call(g,n,d);return this});return d.fn[c.name]};d.fn.getLayers=function(){var c=this[0];return!c||!c.getContext?[]:I(c).layers};d.fn.getLayer=function(c){var a=this.getLayers(),b=d.type(c),e,g;if(c&&c.layer)e=c;else if("number"===b)e=a[c];else for(g=0;g<a.length;g+=1)if(a[g].index=g,a[g].name===c||"regexp"===b&&a[g].name.match(c)){e=a[g];break}return e};d.fn.setLayer=function(c,a){var b,e;for(b=0;b<this.length;b+=1)e=d(this[b]).getLayer(c),y(e,a);return this};d.fn.removeLayer=function(c){var a,b,e;for(b=0;b<this.length;b+=1)a=d(this[b]),e=a.getLayers(),(a=a.getLayer(c))&&e.splice(a.index,1);return this};d.fn.removeLayers=function(){var c,a;for(c=0;c<this.length;c+=1)a=d(this[c]).getLayers(),a.length=0;return this};d.fn.getLayerGroup=function(c){var a=this.getLayers(),b=d.type(c),e=[],g;if("array"===b)return c;for(g=0;g<a.length;g+=1)a[g].index=g,(a[g].group===c||"regexp"===b&&a[g].group.match(c))&&e.push(a[g]);return e};d.fn.setLayerGroup=function(c,a){var b,e,g;for(e=0;e<this.length;e+=1){b=d(this[e]);b=b.getLayerGroup(c);for(g=0;g<b.length;g+=1)y(b[g],a)}return this};d.fn.removeLayerGroup=function(c){var a,b,e=d.type(c),g;if(c!==A)for(b=0;b<this.length;b+=1){a=d(this[b]);a=a.getLayers();for(g=0;g<a.length;g+=1)if(a[g].index=g,a[g].group===c||"regexp"===e&&a[g].group.match(c))a.splice(g,1),g-=1}return this};d.fn.drawLayer=function(c){var a,b,e,g;for(a=0;a<this.length;a+=1)e=d(this[a]),b=z(this[a]),g=e.getLayer(c),ba(e,b,g);return this};d.fn.drawLayers=function(c){var a,b,e,g,f,n,p,s;for(b=0;b<this.length;b+=1)if(a=d(this[b]),e=z(this[b])){I(this[b]);a.clearCanvas();E.elem===this[b]?p=E.data:(p=I(this[b]),E.elem=this[b],E.data=p);g=p.layers;for(n=0;n<g.length;n+=1)if(f=g[n],f.index=n,c&&(f._fired=F),ba(a,e,f),f._mousedout)f._mousedout=F,f._fired=v,f._hovered=F,f.mouseout&&f.mouseout.call(this[b],f),f.cursor&&f._cursor&&a.css({cursor:f._cursor});f=p.intersects[p.intersects.length-1]||{};e=p.event;e=e.type;s=f[e];n=p.drag;if(f._event){if((f.mouseover||f.mouseout||f.cursor)&&!f._hovered&&!f._fired)f._fired=v,f._hovered=v,f.mouseover&&f.mouseover.call(this[b],f),f.cursor&&(f._cursor=a.css("cursor"),a.css({cursor:f.cursor}));s&&!f._fired&&(f._fired=v,s.call(this[b],f));f.draggable&&(!f.disableDrag&&"mousedown"===e)&&(f.bringToFront&&(g.splice(f.index,1),f.index=g.push(f)),n.layer=f,n.dragging=v,n.startX=f.x,n.startY=f.y,n.endX=f._mouseX,n.endY=f._mouseY,f.dragstart&&f.dragstart.call(this[b],f))}if(n.layer&&(n.dragging&&"mouseup"===e&&(n.layer.dragstop&&n.layer.dragstop.call(this[b],n.layer),p.drag={}),n.dragging&&"mousemove"===e))n.layer.x=n.layer._mouseX-(n.endX-n.startX),n.layer.y=n.layer._mouseY-(n.endY-n.startY),n.layer.drag&&n.layer.drag.call(this[b],n.layer)}p.intersects=[];return this};d.fn.addLayer=function(c){var a,b,c=c||{};for(a=0;a<this.length;a+=1)if(b=z(this[a]))c.layer=v,G(this[a],c);return this};L=["width","height","opacity","lineHeight"];V={};d.fn.animateLayer=function(){function c(a,b){return function(){ca(b);a.drawLayers();f[4]&&f[4].call(a[0],b)}}function a(a,b){return function(c,e){ca(b);a.drawLayers();f[5]&&f[5].call(a[0],c,e,b)}}var b,e,g,f=[].slice.call(arguments,0);"object"===typeof f[0]&&!f[0].layer&&f.unshift(0);"object"===typeof f[2]?(f.splice(2,0,f[2].duration||i),f.splice(3,0,f[3].easing||i),f.splice(4,0,f[4].complete||i),f.splice(5,0,f[5].step||i)):(f[2]===A?(f.splice(2,0,i),f.splice(3,0,i),f.splice(4,0,i)):"function"===typeof f[2]&&(f.splice(2,0,i),f.splice(3,0,i)),f[3]===A)?(f[3]=i,f.splice(4,0,i)):"function"===typeof f[3]&&f.splice(3,0,i);f[1]=y({},f[1]);for(e=0;e<this.length;e+=1)if(b=d(this[e]),g=z(this[e]))if(I(this[e]),(g=b.getLayer(f[0]))&&g.method!==d.fn.draw)da(g),da(f[1],v),g.style=V,d(g).animate(f[1],{duration:f[2],easing:d.easing[f[3]]?f[3]:i,complete:c(b,g),step:a(b,g)});return this};d.fn.animateLayerGroup=function(c){var a,b,e=[].slice.call(arguments,0),g,f;for(b=0;b<this.length;b+=1){a=d(this[b]);g=a.getLayerGroup(c);for(f=0;f<g.length;f+=1)a.animateLayer.apply(a,[g[f]].concat(e.slice(1)))}};d.fn.delayLayer=function(c,a){var b,e,a=a||0;for(b=0;b<this.length;b+=1)e=d(this[b]).getLayer(c),d(e).delay(a);return this};d.fn.delayLayerGroup=function(c,a){var b,e,g,f,a=a||0;for(e=0;e<this.length;e+=1){b=d(this[e]);g=b.getLayerGroup(c);for(f=0;f<g.length;f+=1)b.delayLayer.call(b,g[f],a)}};d.fn.stopLayer=function(c,a){var b,e;for(b=0;b<this.length;b+=1)e=d(this[b]).getLayer(c),d(e).stop(a);return this};d.fn.stopLayerGroup=function(c,a){var b,e,g,f;for(e=0;e<this.length;e+=1){b=d(this[e]);g=b.getLayerGroup(c);for(f=0;f<g.length;f+=1)b.stopLayer.call(b,g[f],a)}};(function(c){var a;for(a=0;a<c.length;a+=1)d.fx.step[c[a]]=ga})("color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor fillStyle outlineColor strokeStyle shadowColor".split(" "));N("click");N("dblclick");N("mousedown");N("mouseup");N("mousemove");N("mouseover");N("mouseout");d.event.fix=function(c){var a,c=ha.call(d.event,c);if(c.pageX!==A&&c.offsetX===A&&(a=d(c.target).offset()))c.offsetX=c.pageX-a.left,c.offsetY=c.pageY-a.top;return c};d.fn.draw=function a(b){var e,g,b=b||{};"function"===typeof b&&(b={fn:b});for(e=0;e<this.length;e+=1)if((g=z(this[e]))&&b.fn)G(this[e],b,a),b.fn.call(this[e],g);return this};d.fn.clearCanvas=function(a){for(var b,e=y(new B,a),a=0;a<this.length;a+=1)if(b=z(this[a]))H(a,b,e,e.width,e.height),b.setTransform(1,0,0,1,0,0),!e.x||!e.y||!e.width||!e.height?b.clearRect(0,0,this[a].width,this[a].height):b.clearRect(e.x-e.width/2,e.y-e.height/2,e.width,e.height),b.restore();return this};d.fn.saveCanvas=function(){var a,b,e;for(a=0;a<this.length;a+=1)if(b=z(this[a]))e=I(this[a]),b.save(),e.savedTransforms=y({},e.transforms);return this};d.fn.restoreCanvas=function(){var a,b,e;for(a=0;a<this.length;a+=1)if(b=z(this[a]))e=I(this[a]),b.restore(),e.transforms=e.savedTransforms;return this};d.fn.translateCanvas=function(a){for(var b,e=y(new B,a),g,a=0;a<this.length;a+=1)if(b=z(this[a]))g=I(this[a]),e.autosave&&b.save(),Z(b,e,g.transforms);return this};d.fn.scaleCanvas=function(a){for(var b,e=y(new B,a),g,a=0;a<this.length;a+=1)if(b=z(this[a]))g=I(this[a]),e.autosave&&b.save(),$(b,e,g.transforms);return this};d.fn.rotateCanvas=function(a){for(var b,e=y(new B,a),g,a=0;a<this.length;a+=1)if(b=z(this[a]))g=I(this[a]),e.autosave&&b.save(),aa(b,e,g.transforms);return this};d.fn.drawRect=function b(e){var g,f,n=y(new B,e),d,s,u,q,j;for(g=0;g<this.length;g+=1)if(f=z(this[g]))G(this[g],e,b),J(f,n),H(g,f,n,n.width,n.height),f.beginPath(),d=n.x-n.width/2,s=n.y-n.height/2,(j=n.cornerRadius)?(n.closed=v,u=n.x+n.width/2,q=n.y+n.height/2,0>u-d-2*j&&(j=(u-d)/2),0>q-s-2*j&&(j=(q-s)/2),f.moveTo(d+j,s),f.lineTo(u-j,s),f.arc(u-j,s+j,j,3*C/2,2*C,F),f.lineTo(u,q-j),f.arc(u-j,q-j,j,0,C/2,F),f.lineTo(d+j,q),f.arc(d+j,q-j,j,C/2,C,F),f.lineTo(d,s+j),f.arc(d+j,s+j,j,C,3*C/2,F)):f.rect(d,s,n.width,n.height),n._event&&K(this[g],f,e),M(f,n);return this};d.fn.drawArc=function e(g){var f,d,p=y(new B,g),g=g||{};!p.inDegrees&&360===p.end&&(g.end=p.end=2*C);for(f=0;f<this.length;f+=1)if(d=z(this[f]))G(this[f],g,e),J(d,p),H(f,d,p,2*p.radius),d.beginPath(),d.arc(p.x,p.y,p.radius,p.start*p._toRad-C/2,p.end*p._toRad-C/2,p.ccw),p._event&&K(this[f],d,g),M(d,p);return this};d.fn.drawEllipse=function g(f){var d,p,s=y(new B,f),u=4*s.width/3,q=s.height;s.closed=v;for(d=0;d<this.length;d+=1)if(p=z(this[d]))G(this[d],f,g),J(p,s),H(d,p,s,s.width,s.height),p.beginPath(),p.moveTo(s.x,s.y-q/2),p.bezierCurveTo(s.x-u/2,s.y-q/2,s.x-u/2,s.y+q/2,s.x,s.y+q/2),p.bezierCurveTo(s.x+u/2,s.y+q/2,s.x+u/2,s.y-q/2,s.x,s.y-q/2),s._event&&K(this[d],p,f),M(p,s);return this};d.fn.drawPolygon=function f(d){var p,s,u=y(new B,d),q=2*C/u.sides,j=C/u.sides,l=j+C/2,m=u.radius*Q(q/2),o,i,k;u.closed=v;for(p=0;p<this.length;p+=1)if(s=z(this[p])){G(this[p],d,f);J(s,u);H(p,s,u,2*u.radius);s.beginPath();for(k=0;k<u.sides;k+=1)o=u.x+P(u.radius*Q(l)),i=u.y+P(u.radius*S(l)),s.lineTo(o,i),u.projection&&(o=u.x+P((m+m*u.projection)*Q(l+j)),i=u.y+P((m+m*u.projection)*S(l+j)),s.lineTo(o,i)),l+=q;u._event&&K(this[p],s,d);M(s,u)}return this};d.fn.drawLine=function n(d){var i,u,q=y(new B,d),j,l,m;for(i=0;i<this.length;i+=1)if(u=z(this[i])){G(this[i],d,n);J(u,q);U(q);H(i,u,q,0);j=1;for(u.beginPath();v;)if(l=q["x"+j],m=q["y"+j],l!==A&&m!==A)u.lineTo(l,m),j+=1;else break;q._event&&K(this[i],u,d);M(u,q)}return this};d.fn.drawQuad=function p(d){var i,q,j=y(new B,d),l,m,o,r,k;for(i=0;i<this.length;i+=1)if(q=z(this[i])){G(this[i],d,p);J(q,j);U(j);H(i,q,j,0);l=2;q.beginPath();for(q.moveTo(j.x1,j.y1);v;)if(m=j["x"+l],o=j["y"+l],r=j["cx"+(l-1)],k=j["cy"+(l-1)],m!==A&&o!==A&&r!==A&&k!==A)q.quadraticCurveTo(r,k,m,o),l+=1;else break;j._event&&K(this[i],q,d);M(q,j)}return this};d.fn.drawBezier=function s(d){var q,j,i=y(new B,d),m,o,r,k,h,t,w,x;for(q=0;q<this.length;q+=1)if(j=z(this[q])){G(this[q],d,s);J(j,i);U(i);H(q,j,i,0);m=2;o=1;j.beginPath();for(j.moveTo(i.x1,i.y1);v;)if(r=i["x"+m],k=i["y"+m],h=i["cx"+o],t=i["cy"+o],w=i["cx"+(o+1)],x=i["cy"+(o+1)],r!==A&&k!==A&&h!==A&&t!==A&&w!==A&&x!==A)j.bezierCurveTo(h,t,w,x,r,k),m+=1,o+=2;else break;i._event&&K(this[q],j,d);M(j,i)}return this};d.fn.drawText=function u(q){var j,l,m=y(new B,q),o,r,k,h;for(j=0;j<this.length;j+=1)if(d(this[j]),l=z(this[j])){G(this[j],q,u);J(l,m);l.textBaseline=m.baseline;l.textAlign=m.align;l.font=m.font;if(!j&&m.maxWidth!==i){o=l;r=m.text;h=m.maxWidth;var t=m.text.split(" "),w=[],x="";if(o.measureText(r).width<h)w=[r];else for(;0<t.length;)o.measureText(t[0]).width>h||o.measureText(x+t[0]).width<h?x+=t.shift()+" ":(w.push(x),x=""),0===t.length&&w.push(x);o=w;o=o.join("\n").replace(/( (\n))|( $)/gi,"$2").split("\n")}else j||(o=(""+m.text).split("\n"));fa(this[j],j,l,m,o);H(j,l,m,m.width,m.height);j||(k=m.x,"left"===m.align?k-=m.width/2:"right"===m.align&&(k+=m.width/2));for(r=0;r<o.length;r+=1)l.shadowColor=m.shadowColor,h=m.y+r*m.height/o.length-(o.length-1)*m.height/o.length/2,l.fillText(o[r],k,h),"transparent"!==m.fillStyle&&(l.shadowColor="transparent"),l.strokeText(o[r],m.x,h);m._event?(l.beginPath(),l.rect(m.x-m.width/2,m.y-m.height/2,m.width,m.height),l.restore(),K(this[j],l,q),l.closePath()):l.restore()}E=m;return this};d.fn.measureText=function(d){var i;i=d!==A&&"object"!==typeof d?this.getLayer(d):y(new B,d);(d=z(this[0]))&&i.text!==A&&fa(this[0],0,d,i,i.text.split("\n"));return i};d.fn.drawImage=function q(d){function l(q,k,l){return function(){k||((x=t.width/t.height,h.width===i&&h.sWidth===i&&(d.width=h.width=h.sWidth=t.width),h.height===i&&h.sHeight===i&&(d.height=h.height=h.sHeight=t.height),h.width===i&&h.sWidth!==i&&(h.width=h.sWidth),h.height===i&&h.sHeight!==i&&(h.height=h.sHeight),h.sWidth===i&&h.width!==i&&(d.sWidth=h.sWidth=t.width),h.sHeight===i&&h.height!==i&&(d.sHeight=h.sHeight=t.height),h.sx===i&&(h.sx=h.cropFromCenter?t.width/2:0),h.sy===i&&(h.sy=h.cropFromCenter?t.height/2:0),h.cropFromCenter||(h.sx+=h.sWidth/2,h.sy+=h.sHeight/2),h.sx+h.sWidth/2>t.width&&(h.sx=t.width-h.sWidth/2),0>h.sx-h.sWidth/2&&(h.sx=h.sWidth/2),0>h.sy-h.sHeight/2&&(h.sy=h.sHeight/2),h.sy+h.sHeight/2>t.height&&(h.sy=t.height-h.sHeight/2),h.width!==i&&h.height===i)?d.height=h.height=h.width/x:h.width===i&&h.height!==i?d.width=h.width=h.height*x:h.width===i&&h.height===i&&(d.width=h.width=t.width,d.height=h.height=t.height));H(k,l,h,h.width,h.height);l.drawImage(t,h.sx-h.sWidth/2,h.sy-h.sHeight/2,h.sWidth,h.sHeight,h.x-h.width/2,h.y-h.height/2,h.width,h.height);h._event?(l.beginPath(),l.rect(h.x-h.width/2,h.y-h.height/2,h.width,h.height),l.restore(),K(m[k],l,d),l.closePath()):l.restore();h.load&&h.load.call(q,d)}}var m=this,o,r,k,h=y(new B,d),t,w,x;w=h.source.getContext;h.source.src||w?(t=h.source,h.width=t.width,h.height=t.height):h.source&&(t=new W,t.src=h.source);for(r=0;r<m.length;r+=1)if(o=m[r],k=z(m[r]))G(m[r],d,q),J(k,h),t&&(t.complete||w?l(o,r,k)():(t.onload=l(o,r,k),t.src=t.src));return m};d.fn.createPattern=d.fn.pattern=function(d){function j(){k=m.createPattern(r,o.repeat);o.load&&o.load.call(l[0],k)}var l=this,m,o=y(new B,d),r,k;(m=z(l[0]))?"function"===typeof o.source?(r=T.createElement("canvas"),r.width=o.width,r.height=o.height,d=z(r),o.source.call(r,d),j()):(d=o.source.getContext,o.source.src||d?r=o.source:(r=new W,r.src=o.source),r.complete||d?j():r.onload=j):k=i;return k};d.fn.createGradient=d.fn.gradient=function(d){var j,d=y(new B,d),l=[],m,o,r,k,h,t,w;if(j=z(this[0])){d.x1=d.x1||0;d.y1=d.y1||0;d.x2=d.x2||0;d.y2=d.y2||0;j=d.r1!==i||d.r2!==i?j.createRadialGradient(d.x1,d.y1,d.r1,d.x2,d.y2,d.r2):j.createLinearGradient(d.x1,d.y1,d.x2,d.y2);for(k=1;d["c"+k]!==A;k+=1)d["s"+k]!==A?l.push(d["s"+k]):l.push(i);m=l.length;l[0]===i&&(l[0]=0);l[m-1]===i&&(l[m-1]=1);for(k=0;k<m;k+=1){if(l[k]!==i){t=1;w=0;o=l[k];for(h=k+1;h<m;h+=1)if(l[h]!==i){r=l[h];break}else t+=1;o>r&&(l[h]=l[k])}else l[k]===i&&(w+=1,l[k]=o+w*((r-o)/t));j.addColorStop(l[k],d["c"+(k+1)])}}else j=i;return j};d.fn.setPixels=function j(d){var i,o,r,k=y(new B,d),h={},t,w,x,v;for(o=0;o<this.length;o+=1)if(i=this[o],r=z(i)){G(this[o],d,j);H(o,r,k,k.width,k.height);if(!k.x||!k.y||!k.width||!k.height)k.width=i.width,k.height=i.height,k.x=k.width/2,k.y=k.height/2;t=r.getImageData(k.x-k.width/2,k.y-k.height/2,k.width,k.height);w=t.data;v=w.length;h=[];if(k.each)for(x=0;x<v;x+=4)h.r=w[x],h.g=w[x+1],h.b=w[x+2],h.a=w[x+3],k.each.call(i,h),w[x]=h.r,w[x+1]=h.g,w[x+2]=h.b,w[x+3]=h.a;r.putImageData(t,k.x-k.width/2,k.y-k.height/2);r.restore()}return this};d.fn.getCanvasImage=function(d,l){var m=this[0];return m&&m.toDataURL?m.toDataURL("image/"+d,l):i};d.support.canvas=T.createElement("canvas").getContext!==A;D.defaults=O;D.checkEvents=K;d.jCanvas=D})(jQuery,document,Image,Math,parseFloat,!0,!1,null);

/* Inview Event plugin */
(function(d){var p={},e,a,i=document,j=window,f=i.documentElement,k=d.expando;d.event.special.inview={add:function(a){p[a.guid+"-"+this[k]]={data:a,$element:d(this)}},remove:function(a){try{delete p[a.guid+"-"+this[k]]}catch(d){}}};d(j).bind("scroll resize",function(){e=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null});setInterval(function(){var l=d(),k,n=0;d.each(p,function(a,b){var c=b.data.selector,d=b.$element;l=l.add(c?d.find(c):d)});if(k=l.length){var b;
if(!(b=e)){var g={height:j.innerHeight,width:j.innerWidth};if(!g.height&&((b=i.compatMode)||!d.support.boxModel))b="CSS1Compat"===b?f:i.body,g={height:b.clientHeight,width:b.clientWidth};b=g}e=b;for(a=a||{top:j.pageYOffset||f.scrollTop||i.body.scrollTop,left:j.pageXOffset||f.scrollLeft||i.body.scrollLeft};n<k;n++)if(d.contains(f,l[n])){var h=l[n];b=d(h);var m=b.height(),q=b.width(),c=b.offset(),g=b.data("inview");if(!a||!e)break;0<h.offsetWidth&&0<h.offsetHeight&&"none"!=h.style.display&&c.top+m>
a.top&&c.top<a.top+e.height&&c.left+q>a.left&&c.left<a.left+e.width?(h=a.left>c.left?"right":a.left+e.width<c.left+q?"left":"both",m=a.top>c.top?"bottom":a.top+e.height<c.top+m?"top":"both",c=h+"-"+m,(!g||g!==c)&&b.data("inview",c).trigger("inview",[!0,h,m])):g&&b.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);

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

/*! (c) Mat Marquis (@wilto). MIT License. http://wil.to/3a */
(function( $, undefined ) {

  var inst = 0;

  $.fn.getPercentage = function() {
    var oPercent = this.attr('style').match(/margin\-left:(.*[0-9])/i) && parseInt(RegExp.$1);

    return oPercent;
  };

  $.fn.adjRounding = function(slide) {
    var $el = $(this),
      $slides = $el.find( slide ),
      diff = $el.parent().width() - $slides.eq(0).width();

    if (diff !== 0) {
      $slides.css( "position", "relative" );

      for (var i = 0; i < $slides.length; i++) {
        $slides.eq(i).css( "left", (diff * i) + "px" );
      }
    }

    return this;
  };

  $.fn.carousel = function(config) {

    // Prevent re-init:
    if( this.data( "carousel-initialized" ) ) { return; }

    // Carousel is being initialized:
    this.data( "carousel-initialized", true );

    var defaults = {
      slider      : '.slider',
      slide     : '.slide',
      prevSlide   : null,
      nextSlide   : null,
      slideHed    : null,
      addPagination : false,
      addNav      : ( config != undefined && ( config.prevSlide || config.nextSlide ) ) ? false : true,
      namespace   : 'carousel',
      speed     : 300
    },
    opt               = $.extend(defaults, config),
    $slidewrap        = this,
    dBody            = (document.body || document.documentElement),
    transitionSupport = function() {
        dBody.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;');
      var tSupport = !!(dBody.style.transition || dBody.style.webkitTransition || dBody.style.msTransition || dBody.style.OTransition || dBody.style.MozTransition )

      return tSupport;
    },
    carousel = {
      init : function() {
        inst++;

        $slidewrap.each(function(carInt) {
            var $wrap      = $(this),
              $slider    = $wrap.find(opt.slider),
              $slide     = $wrap.find(opt.slide),
              slidenum   = $slide.length,
              transition = "margin-left " + ( opt.speed / 1000 ) + "s ease",
              tmp        = 'carousel-' + inst + '-' + carInt;

            if( $slide.length <= 1 ) {
              return; /* No sense running all this code if the carousel functionality is unnecessary. */
            }

            $wrap
              .css({
                "overflow"           : "hidden",
                "width"              : "100%"
              })
              .attr('role' , 'application');

            $slider
              .attr( 'id', ( $slider[0].id || 'carousel-' + inst + '-' + carInt ) )
              .css({
                "marginLeft"         : "0px",
                "float"              : "left",
                "width"              : 100 * slidenum + "%",
                "-webkit-transition" : transition,
                "-moz-transition"    : transition,
                "-ms-transition"     : transition,
                "-o-transition"      : transition,
                "transition"         : transition
              })
              .bind( 'carouselmove' , carousel.move )
              .bind( 'nextprev'     , carousel.nextPrev )
              .bind( 'navstate'     , carousel.navState );

            $slide
              .css({
                "float": "left",
                width: (100 / slidenum) + "%"
              })
              .each(function(i) {
                var $el = $(this);

                $el.attr({
                  "role" : "tabpanel document",
                  "id"   : tmp + '-slide' + i
                });

                if( opt.addPagination ) {
                  $el.attr('aria-labelledby', tmp + '-tab' + i);
                }
              });

            // Build and insert navigation/pagination, if specified in the options:
            opt.addPagination   && carousel.addPagination();
            opt.addNav      && carousel.addNav();

            $slider.trigger( "navstate", { "current": 0 });
        });
      },
      addNav : function() {
        $slidewrap.each(function(i) {
          var $oEl = $(this),
            $slider = $oEl.find(opt.slider),
            currentSlider = $slider[0].id,
            navMarkup = [
              '<ul class="slidecontrols" role="navigation">',
              ' <li role="presentation"><a href="#' + currentSlider + '" class="' + opt.namespace + '-next">Next</a></li>',
              ' <li role="presentation"><a href="#' + currentSlider + '" class="' + opt.namespace + '-prev">Prev</a></li>',
              '</ul>'
              ].join(''),
            nextprev = {
              nextSlide : '.' + opt.namespace + '-next',
              prevSlide : '.' + opt.namespace + '-prev'
            };

          opt = $.extend(opt, nextprev);

          $oEl.prepend(navMarkup);
        });
      },
      addPagination : function() {
        $slidewrap.each(function(i) {
          var $oEl        = $(this),
            $pagination = $('<ol class="' + opt.namespace + '-tabs" role="tablist navigation" />'),
            $slider     = $oEl.find(opt.slider),
            $slides     = $oEl.find(opt.slide)
            slideNum    = $slides.length,
            associated  = 'carousel-' + inst + '-' + i;

          while( slideNum-- ) {
            var hed = $slides.eq(slideNum).find( opt.slideHed ).text() || 'Page ' + ( slideNum + 1 ),
              tabMarkup = [
                '<li role="presentation">',
                  '<a href="#' + associated + '-slide' + slideNum +'"',
                  ' aria-controls="' + associated + '-slide' + slideNum +'"',
                  ' id="' + associated + '-tab' + slideNum + '" role="tab">' + hed + '</a>',
                '</li>'
              ].join('');

            $pagination.prepend(tabMarkup);
          };

          $pagination
            .appendTo( $oEl )
            .find('li').keydown( function(e) {
              var $el      = $(this),
                $prevTab = $el.prev().find('a'),
                $nextTab = $el.next().find('a');

              switch( e.which ) {
                case 37:
                case 38:
                  $prevTab.length && $prevTab.trigger('click').focus();
                  e.preventDefault();
                  break;
                case 39:
                case 40:
                  $nextTab.length && $nextTab.trigger('click').focus();
                  e.preventDefault();
                  break;
              }
            })
            .find('a').click( function(e) {
              var $el = $(this);

              if( $el.attr('aria-selected') == 'false' ) {
                var current = $el.parent().index(),
                  move    = -( 100 * ( current ) ),
                  $slider = $oEl.find( opt.slider );

                $slider.trigger( 'carouselmove', { moveTo: move });
              }
              e.preventDefault();
            });
        });
      },
      roundDown : function(oVal) {
        var val = parseInt(oVal, 10);

        return Math.ceil( (val - (val % 100 ) ) / 100) * 100;
      },
      navState : function(e, ui) {
        var $el          = $(this),
          $slides      = $el.find(opt.slide),
          ind          = -(ui.current / 100),
          $activeSlide = $slides.eq(ind);

        $el.attr('aria-activedescendant', $activeSlide[0].id);

        // Update state of active tabpanel:
        $activeSlide
          .addClass( opt.namespace + "-active-slide" )
          .attr( 'aria-hidden', false )
          .siblings()
            .removeClass( opt.namespace + "-active-slide" )
            .attr( 'aria-hidden', true );

        // Update state of next/prev navigation:
        if( ( !!opt.prevSlide || !!opt.nextSlide ) ) {
          var $target = $('[href*="#' + this.id + '"]');

          $target.removeClass( opt.namespace + '-disabled' );

          if( ind == 0 ) {
            $target.filter(opt.prevSlide).addClass( opt.namespace + '-disabled' );
          } else if( ind == $slides.length - 1 ) {
            $target.filter(opt.nextSlide).addClass( opt.namespace + '-disabled' );
          }
        }

        // Update state of pagination tabs:
        if( !!opt.addPagination ) {
          var tabId = $activeSlide.attr('aria-labelledby'),
            $tab  = $('#' + tabId );

          $tab
            .parent()
            .addClass(opt.namespace + '-active-tab')
            .siblings()
            .removeClass(opt.namespace + '-active-tab')
            .find('a')
              .attr({
                'aria-selected' : false,
                'tabindex' : -1
              });

          $tab.attr({
            'aria-selected' : true,
            'tabindex' : 0
          });
        }
      },
      move : function(e, ui) {
        var $el = $(this);

        $el
          .trigger(opt.namespace + "-beforemove")
          .trigger("navstate", { current: ui.moveTo });

        if( transitionSupport() ) {

          $el
            .adjRounding( opt.slide ) /* Accounts for browser rounding errors. Lookin’ at you, iOS Safari. */
            .css('marginLeft', ui.moveTo + "%")
            .one("transitionend webkitTransitionEnd OTransitionEnd", function() {
              $(this).trigger( opt.namespace + "-aftermove" );
            });

        } else {
          $el
            .adjRounding( opt.slide )
            .animate({ "marginLeft": ui.moveTo + "%" }, { "duration" : opt.speed, "queue" : false }, function() {
              $(this).trigger( opt.namespace + "-aftermove" );
            });
        }
      },
      nextPrev : function(e, ui) {
        var $el = $(this),
          left = ( $el ) ? $el.getPercentage() : 0,
          $slide = $el.find(opt.slide),
          constrain = ui.dir === 'prev' ? left != 0 : -left < ($slide.length - 1) * 100,
          $target = $( '[href="#' + this.id + '"]');

        if (!$el.is(":animated") && constrain ) {

          if ( ui.dir === 'prev' ) {
            left = ( left % 100 != 0 ) ? carousel.roundDown(left) : left + 100;
          } else {
            left = ( ( left % 100 ) != 0 ) ? carousel.roundDown(left) - 100 : left - 100;
          }

          $el.trigger('carouselmove', { 'moveTo': left });

          $target
            .removeClass( opt.namespace + '-disabled')
            .removeAttr('aria-disabled');

          switch( left ) {
            case ( -($slide.length - 1) * 100 ):
              $target.filter(opt.nextSlide)
                .addClass( opt.namespace + '-disabled')
                .attr('aria-disabled', true);
              break;
            case 0:
              $target.filter(opt.prevSlide)
                .addClass( opt.namespace + '-disabled')
                .attr('aria-disabled', true);
              break;
          }
        } else {
          var reset = carousel.roundDown(left);

          $el.trigger('carouselmove', { 'moveTo': reset });
        }

      }
    };

    carousel.init(this);

    $(opt.nextSlide + ',' + opt.prevSlide)
      .bind('click', function(e) {
        var $el = $(this),
          link = this.hash,
          dir = ( $el.is(opt.prevSlide) ) ? 'prev' : 'next',
          $slider = $(link);

          if ( $el.is('.' + opt.namespace + '-disabled') ) {
            return false;
          }

          $slider.trigger('nextprev', { 'dir': dir });

        e.preventDefault();
      })
      .bind('keydown', function(e) {
        var $el = $(this),
          link = this.hash;

        switch (e.which) {
          case 37:
          case 38:
            $('#' + link).trigger('nextprev', { 'dir': 'next' });
            e.preventDefault();
            break;
          case 39:
          case 40:
            $('#' + link).trigger('nextprev', { 'dir': 'prev' });
            e.preventDefault();
            break;
        }
      });

    var setup = {
      'wrap' : this,
      'slider' : opt.slider
    };
    $slidewrap.bind( "dragSnap", setup, function(e, ui){
      var $slider = $(this).find( opt.slider ),
        dir = ( ui.direction === "left" ) ? 'next' : 'prev';

      $slider.trigger("nextprev", { 'dir': dir });
    });


    $slidewrap.filter('[data-autorotate]').each(function() {
      var auto,
        $el         = $(this),
        speed       = $el.attr('data-autorotate'),
        slidenum    = $el.find(opt.slide).length,
        autoAdvance = function() {
          var $slider  = $el.find(opt.slider),
            active   = -( $(opt.slider).getPercentage() / 100 ) + 1;

          switch( active ) {
            case slidenum:
              clearInterval(auto);

              auto = setInterval(function() {
                autoAdvance();
                $slider.trigger("nextprev", { 'dir': 'prev' });
              }, speed);

              break;
            case 1:
              clearInterval(auto);

              auto = setInterval(function() {
                autoAdvance();
                $slider.trigger("nextprev", { 'dir': 'next' });
              }, speed);

              break;
          }
        };

      auto = setInterval(autoAdvance, speed);

      $el
        .attr('aria-live', 'polite')
        .bind('mouseenter click touchstart', function() {
          clearInterval(auto);
        });
    });

    return this;
  };

  $.event.special.dragSnap = {
    setup: function(setup) {

      var $el = $(this),
        transitionSwap = function($el, tog) {
          var speed = .3,
            transition = ( tog ) ? "margin-left " + speed + "s ease" : 'none';

          $el.css({
            "-webkit-transition" : transition,
            "-moz-transition"    : transition,
            "-ms-transition"     : transition,
            "-o-transition"      : transition,
            "transition"         : transition
          });
        },
        roundDown = function(left) {
          var left = parseInt(left, 10);

          return Math.ceil( (left - (left % 100 ) ) / 100) * 100;
        },
        snapBack = function(e, ui) {
          var $el = ui.target,
            currentPos = ( $el.attr('style') != undefined ) ? $el.getPercentage() : 0,
            left = (ui.left === false) ? roundDown(currentPos) - 100 : roundDown(currentPos),
            dBody = document.body,
            transitionSupport = function() {
                dBody.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;');
              var tSupport = !!(dBody.style.transition || dBody.style.webkitTransition || dBody.style.MozTransition )

              return tSupport;
            };

          transitionSwap($el, true);

          if( transitionSupport() ) {
            $el.css('marginLeft', left + "%");
          } else {
            $el.animate({ marginLeft: left + "%" }, opt.speed);
          }
        };

      $el
        .bind("snapback", snapBack)
        .bind("touchstart", function(e) {
          var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
            $target = $(e.target),
            start = {
              'time': +new Date,
              'coords': [ data.pageX, data.pageY ],
              'origin': $target.closest( setup.wrap ),
              'interacting': false
            },
            stop,
            $tEl = $target.closest( setup.slider ),
            currentPos = ( $tEl.attr('style') != undefined ) ? $tEl.getPercentage() : 0;

          transitionSwap($tEl, false);

          function moveHandler(e) {
            var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
              stop = {
                'time': +new Date,
                'coords': [ data.pageX, data.pageY ]
              },
              deltaX = Math.abs( start.coords[0] - data.pageX ),
              deltaY = Math.abs( start.coords[1] - data.pageY );

            if( !start || deltaX < deltaY || deltaX < 55 ) {
              return;
            }

            // prevent scrolling
            if ( deltaX >= 55 ) {
              start.interacting = true;
              $tEl.css({"margin-left": currentPos + ( ( (stop.coords[0] - start.coords[0]) / start.origin.width() ) * 100 ) + '%' });
              e.preventDefault();
            } else {
              return;
            }
          };

          $el
            .bind("gesturestart", function(e) {
              $el
                .unbind("touchmove", moveHandler)
                .unbind("touchend", moveHandler);
            })
            .bind("touchmove", moveHandler)
            .one("touchend", function(e) {
              $el.unbind("touchmove", moveHandler);

              transitionSwap($tEl, true);

            if (start && stop ) {
                var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                left = start.coords[0] > stop.coords[0],
                jumppoint;

                if( deltaX > 20 && ( deltaX > deltaY ) ) {
                  e.preventDefault();
                } else {
                  if( start.interacting ) {
                    $el.trigger('snapback', { 'target': $tEl, 'left': left });
                  }
                  return;
                }

                jumppoint = start.origin.width() / 4;

                if( -deltaX > jumppoint || deltaX > jumppoint ) {
                  start.origin.trigger("dragSnap", {'direction': left ? "left" : "right"});
                } else {
                  $el.trigger('snapback', { 'target': $tEl, 'left': left });
                }
            }
            start = stop = undefined;
          });
      });
    }
  };

})(jQuery);

/* Holder - 1.7 - client side image placeholders. (c) 2012 Ivan Malopinsky / http://imsky.co.  Provided under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0. Commercial use requires attribution. */
/*

Holder - 1.7 - client side image placeholders
(c) 2012 Ivan Malopinsky / http://imsky.co

Provided under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0
Commercial use requires attribution.

*/

var Holder = Holder || {};
(function (app, win) {

var preempted = false,
fallback = false,
canvas = document.createElement('canvas');

//getElementsByClassName polyfill
document.getElementsByClassName||(document.getElementsByClassName=function(e){var t=document,n,r,i,s=[];if(t.querySelectorAll)return t.querySelectorAll("."+e);if(t.evaluate){r=".//*[contains(concat(' ', @class, ' '), ' "+e+" ')]",n=t.evaluate(r,t,null,0,null);while(i=n.iterateNext())s.push(i)}else{n=t.getElementsByTagName("*"),r=new RegExp("(^|\\s)"+e+"(\\s|$)");for(i=0;i<n.length;i++)r.test(n[i].className)&&s.push(n[i])}return s})

//getComputedStyle polyfill
window.getComputedStyle||(window.getComputedStyle=function(e,t){return this.el=e,this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;return t=="float"&&(t="styleFloat"),n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()})),e.currentStyle[t]?e.currentStyle[t]:null},this})

//http://javascript.nwbox.com/ContentLoaded by Diego Perini with modifications
function contentLoaded(n,t){var l="complete",s="readystatechange",u=!1,h=u,c=!0,i=n.document,a=i.documentElement,e=i.addEventListener?"addEventListener":"attachEvent",v=i.addEventListener?"removeEventListener":"detachEvent",f=i.addEventListener?"":"on",r=function(e){(e.type!=s||i.readyState==l)&&((e.type=="load"?n:i)[v](f+e.type,r,u),!h&&(h=!0)&&t.call(n,null))},o=function(){try{a.doScroll("left")}catch(n){setTimeout(o,50);return}r("poll")};if(i.readyState==l)t.call(n,"lazy");else{if(i.createEventObject&&a.doScroll){try{c=!n.frameElement}catch(y){}c&&o()}i[e](f+"DOMContentLoaded",r,u),i[e](f+s,r,u),n[e](f+"load",r,u)}};

//https://gist.github.com/991057 by Jed Schmidt with modifications
function selector(a){
  a=a.match(/^(\W)?(.*)/);var b=document["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2]);
  var ret=[]; b!=null&&(b.length?ret=b:b.length==0?ret=b:ret=[b]);  return ret;
}

//shallow object property extend
function extend(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];return c}

function text_size(width, height, template) {
  var dimension_arr = [height, width].sort();
  var maxFactor = Math.round(dimension_arr[1] / 16),
    minFactor = Math.round(dimension_arr[0] / 16);
  var text_height = Math.max(template.size, maxFactor);
  return {
    height: text_height
  }
}

function draw(ctx, dimensions, template, ratio) {
  var ts = text_size(dimensions.width, dimensions.height, template);
  var text_height = ts.height;
  var width = dimensions.width * ratio, height = dimensions.height * ratio;
  canvas.width = width;
  canvas.height = height;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = template.background;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = template.foreground;
  ctx.font = "bold " + text_height + "px sans-serif";
  var text = template.text ? template.text : (dimensions.width + "x" + dimensions.height);
  if (ctx.measureText(text).width / width > 1) {
    text_height = template.size / (ctx.measureText(text).width / width);
  }
  ctx.font = "bold " + (text_height * ratio) + "px sans-serif";
  ctx.fillText(text, (width / 2), (height / 2), width);
  return canvas.toDataURL("image/png");
}

function render(mode, el, holder, src) {

  var dimensions = holder.dimensions,
    theme = holder.theme,
    text = holder.text;
  var dimensions_caption = dimensions.width + "x" + dimensions.height;
  theme = (text ? extend(theme, {
    text: text
  }) : theme);

  var ratio = 1;
  if(window.devicePixelRatio && window.devicePixelRatio > 1){
    ratio = window.devicePixelRatio;
  }

  if (mode == "image") {
    el.setAttribute("data-src", src);
    el.setAttribute("alt", text ? text : theme.text ? theme.text + " [" + dimensions_caption + "]" : dimensions_caption);
    el.style.width = dimensions.width + "px";
    el.style.height = dimensions.height + "px";

    if (fallback) {
      el.style.backgroundColor = theme.background;
    }
    else{
      el.setAttribute("src", draw(ctx, dimensions, theme, ratio));
    }
  } else {
    if (!fallback) {
      el.style.backgroundImage = "url(" + draw(ctx, dimensions, theme, ratio) + ")";
      el.style.backgroundSize = dimensions.width+"px "+dimensions.height+"px";
    }
  }
};

function fluid(el, holder, src) {
  var dimensions = holder.dimensions,
    theme = holder.theme,
    text = holder.text;
  var dimensions_caption = dimensions.width + "x" + dimensions.height;
  theme = (text ? extend(theme, {
    text: text
  }) : theme);

  var fluid = document.createElement("div");

  fluid.style.backgroundColor = theme.background;
  fluid.style.color = theme.foreground;
  fluid.className = el.className + " holderjs-fluid";
  fluid.style.width = holder.dimensions.width + (holder.dimensions.width.indexOf("%")>0?"":"px");
  fluid.style.height = holder.dimensions.height + (holder.dimensions.height.indexOf("%")>0?"":"px");
  fluid.id = el.id;

  if (theme.text) {
    fluid.appendChild(document.createTextNode(theme.text))
  } else {
    fluid.appendChild(document.createTextNode(dimensions_caption))
    fluid_images.push(fluid);
    setTimeout(fluid_update, 0);
  }

  el.parentNode.replaceChild(fluid, el);
}

function fluid_update() {
  for (i in fluid_images) {
    var el = fluid_images[i],
      label = el.firstChild;

    el.style.lineHeight = el.offsetHeight+"px";
    label.data = el.offsetWidth + "x" + el.offsetHeight;
  }
}

function parse_flags(flags, options) {

  var ret = {
    theme: settings.themes.gray
  }, render = false;

  for (sl = flags.length, j = 0; j < sl; j++) {
    var flag = flags[j];
    if (app.flags.dimensions.match(flag)) {
      render = true;
      ret.dimensions = app.flags.dimensions.output(flag);
    } else if (app.flags.fluid.match(flag)) {
      render = true;
      ret.dimensions = app.flags.fluid.output(flag);
      ret.fluid = true;
    } else if (app.flags.colors.match(flag)) {
      ret.theme = app.flags.colors.output(flag);
    } else if (options.themes[flag]) {
      //If a theme is specified, it will override custom colors
      ret.theme = options.themes[flag];
    } else if (app.flags.text.match(flag)) {
      ret.text = app.flags.text.output(flag);
    }
  }

  return render ? ret : false;

};

if (!canvas.getContext) {
  fallback = true;
} else {
  if (canvas.toDataURL("image/png")
    .indexOf("data:image/png") < 0) {
    //Android doesn't support data URI
    fallback = true;
  } else {
    var ctx = canvas.getContext("2d");
  }
}

var fluid_images = [];

var settings = {
  domain: "holder.js",
  images: "img",
  elements: ".holderjs",
  themes: {
    "gray": {
      background: "#eee",
      foreground: "#aaa",
      size: 12
    },
      "social": {
      background: "#3a5a97",
      foreground: "#fff",
      size: 12
    },
      "industrial": {
      background: "#434A52",
      foreground: "#C2F200",
      size: 12
    }
  },
  stylesheet: ".holderjs-fluid {font-size:16px;font-weight:bold;text-align:center;font-family:sans-serif;margin:0}"
};


app.flags = {
  dimensions: {
    regex: /^(\d+)x(\d+)$/,
    output: function (val) {
      var exec = this.regex.exec(val);
      return {
        width: +exec[1],
        height: +exec[2]
      }
    }
  },
  fluid: {
    regex: /^([0-9%]+)x([0-9%]+)$/,
    output: function (val) {
      var exec = this.regex.exec(val);
      return {
        width: exec[1],
        height: exec[2]
      }
    }
  },
  colors: {
    regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
    output: function (val) {
      var exec = this.regex.exec(val);
      return {
        size: settings.themes.gray.size,
        foreground: "#" + exec[2],
        background: "#" + exec[1]
      }
    }
  },
  text: {
    regex: /text\:(.*)/,
    output: function (val) {
      return this.regex.exec(val)[1];
    }
  }
}

for (var flag in app.flags) {
  app.flags[flag].match = function (val) {
    return val.match(this.regex)
  }
}

app.add_theme = function (name, theme) {
  name != null && theme != null && (settings.themes[name] = theme);
  return app;
};

app.add_image = function (src, el) {
  var node = selector(el);
  if (node.length) {
    for (var i = 0, l = node.length; i < l; i++) {
      var img = document.createElement("img")
      img.setAttribute("data-src", src);
      node[i].appendChild(img);
    }
  }
  return app;
};

app.run = function (o) {
  var options = extend(settings, o),
    images_nodes = selector(options.images),
    elements = selector(options.elements),
    preempted = true,
    images = [];

  for (i = 0, l = images_nodes.length; i < l; i++) images.push(images_nodes[i]);

  var holdercss = document.createElement("style");
  holdercss.type = "text/css";
  holdercss.styleSheet ? holdercss.styleSheet.cssText = options.stylesheet : holdercss.textContent = options.stylesheet;
  document.getElementsByTagName("head")[0].appendChild(holdercss);

  var cssregex = new RegExp(options.domain + "\/(.*?)\"?\\)");

  for (var l = elements.length, i = 0; i < l; i++) {
    var src = window.getComputedStyle(elements[i], null)
      .getPropertyValue("background-image");
    var flags = src.match(cssregex);
    if (flags) {
      var holder = parse_flags(flags[1].split("/"), options);
      if (holder) {
        render("background", elements[i], holder, src);
      }
    }
  }

  for (var l = images.length, i = 0; i < l; i++) {
    var src = images[i].getAttribute("src") || images[i].getAttribute("data-src");
    if (src != null && src.indexOf(options.domain) >= 0) {
      var holder = parse_flags(src.substr(src.lastIndexOf(options.domain) + options.domain.length + 1)
        .split("/"), options);
      if (holder) {
        if (holder.fluid) {
          fluid(images[i], holder, src);
        } else {
          render("image", images[i], holder, src);
        }
      }
    }
  }
  return app;
};

contentLoaded(win, function () {
  if (window.addEventListener) {
    window.addEventListener("resize", fluid_update, false);
    window.addEventListener("orientationchange", fluid_update, false);
  } else {
    window.attachEvent("onresize", fluid_update)
  }
  preempted || app.run();
});

if ( typeof define === "function" && define.amd ) {
  define( "Holder", [], function () { return app; } );
}

})(Holder, window);

/* Lazy Load - jQuery plugin for lazy loading images. Copyright (c) 2007-2012 Mika Tuupola. Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php. Project home: http://www.appelsiini.net/projects/lazyload. Version:  1.8.2. */
(function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function j(){var b=0;g.each(function(){var c=a(this);if(i.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,i)&&!a.leftofbegin(this,i))if(!a.belowthefold(this,i)&&!a.rightoffold(this,i))c.trigger("appear"),b=0;else if(++b>i.failure_limit)return!1})}var g=this,h,i={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(i,f)),h=i.container===d||i.container===b?e:a(i.container),0===i.event.indexOf("scroll")&&h.bind(i.event,function(a){return j()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(i.appear){var d=g.length;i.appear.call(b,d,i)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(i.data_attribute))[i.effect](i.effect_speed),b.loaded=!0;var d=a.grep(g,function(a){return!a.loaded});g=a(d);if(i.load){var e=g.length;i.load.call(b,e,i)}}).attr("src",c.data(i.data_attribute))}}),0!==i.event.indexOf("scroll")&&c.bind(i.event,function(a){b.loaded||c.trigger("appear")})}),e.bind("resize",function(a){j()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent.persisted&&g.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){j()}),this},a.belowthefold=function(c,f){var g;return f.container===d||f.container===b?g=e.height()+e.scrollTop():g=a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return f.container===d||f.container===b?g=e.width()+e.scrollLeft():g=a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollTop():g=a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollLeft():g=a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightoffold(b,c)&&!a.leftofbegin(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})})(jQuery,window,document)

var Lorem;
(function() {

    //Create a class named Lorem and constructor
    Lorem = function() {
        //Default values.
        this.type = null;
        this.query = null;
        this.data = null;
    };
    //Static variables
    Lorem.IMAGE = 1;
    Lorem.TEXT = 2;
    Lorem.TYPE = {
        PARAGRAPH: 1,
        SENTENCE: 2,
        WORD: 3
    };
    //Words to create lorem ipsum text.
    Lorem.WORDS = [
        "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "ut", "aliquam,", "purus", "sit", "amet", "luctus", "venenatis,", "lectus", "magna", "fringilla", "urna,", "porttitor", "rhoncus", "dolor", "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo,", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam", "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum", "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac", "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc", "sed", "augue", "lacus,", "viverra", "vitae", "congue", "eu,", "consequat", "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat", "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum",
        "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut", "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum", "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lorem", "sed", "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor,", "at", "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis", "orci,", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus", "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor,", "id", "aliquet", "lectus", "proin", "nibh", "nisl,", "condimentum", "id", "venenatis", "a,", "condimentum", "vitae", "sapien", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "sed", "tempus,", "urna", "et", "pharetra", "pharetra,", "massa", "massa", "ultricies", "mi,", "quis", "hendrerit", "dolor", "magna", "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque", "sagittis,", "purus", "sit", "amet", "volutpat", "consequat,", "mauris", "nunc", "congue", "nisi,", "vitae", "suscipit", "tellus", "mauris", "a", "diam",
        "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget", "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis", "egestas", "pretium", "aenean", "pharetra,", "magna", "ac", "placerat", "vestibulum,", "lectus", "mauris", "ultrices", "eros,", "in", "cursus", "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet", "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod", "nisi", "porta", "lorem", "mollis", "aliquam", "ut", "porttitor", "leo", "a", "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum,", "faucibus", "vitae", "aliquet", "nec,", "ullamcorper", "sit", "amet", "risus", "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam", "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl", "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra", "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus", "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus,", "sed", "viverra", "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum", "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu", "dictum", "varius", "duis", "at", "consectetur", "lorem",
        "donec", "massa", "sapien,", "faucibus", "et", "molestie", "ac,", "feugiat", "sed", "lectus", "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi", "tincidunt", "ornare", "massa,", "eget", "egestas", "purus", "viverra", "accumsan", "in", "nisl", "nisi,", "scelerisque", "eu", "ultrices", "vitae,", "auctor", "eu", "augue", "ut", "lectus", "arcu,", "bibendum", "at", "varius", "vel,", "pharetra", "vel", "turpis", "nunc", "eget", "lorem", "dolor,", "sed", "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim,", "facilisis", "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque,", "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem", "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed", "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus", "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque,", "volutpat", "ac", "tincidunt", "vitae,", "semper", "quis", "lectus", "nulla", "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus", "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum", "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet", "suspendisse", "interdum", "consectetur", "libero,", "id", "faucibus", "nisl", "tincidunt", "eget", "nullam", "non", "nisi", "est,", "sit", "amet", "facilisis", "magna",
        "etiam", "tempor,", "orci", "eu", "lobortis", "elementum,", "nibh", "tellus", "molestie", "nunc,", "non", "blandit", "massa", "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum", "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla", "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi", "blandit", "cursus", "risus,", "at", "ultrices", "mi", "tempus", "imperdiet", "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes,", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies", "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra", "maecenas", "accumsan,", "lacus", "vel", "facilisis", "volutpat,", "est", "velit", "egestas", "dui,", "id", "ornare", "arcu", "odio", "ut", "sem", "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing", "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit",
        "sed", "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula", "ullamcorper", "malesuada", "proin", "libero", "nunc,", "consequat", "interdum", "varius", "sit", "amet,", "mattis", "vulputate", "enim", "nulla", "aliquet", "porttitor", "lacus,", "luctus", "accumsan", "tortor", "posuere", "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo,", "laoreet", "sit", "amet", "cursus", "sit", "amet,", "dictum", "sit", "amet", "justo", "donec", "enim", "diam,", "vulputate", "ut", "pharetra", "sit", "amet,", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget", "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod", "elementum", "nisi,", "quis", "eleifend", "quam", "adipiscing", "vitae", "proin", "sagittis,", "nisl", "rhoncus", "mattis", "rhoncus,", "urna", "neque", "viverra", "justo,", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin", "sed", "libero", "enim,", "sed", "faucibus", "turpis", "in", "eu", "mi", "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in", "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar", "mattis", "nunc,", "sed", "blandit", "libero", "volutpat", "sed", "cras", "ornare", "arcu", "dui", "vivamus", "arcu", "felis,", "bibendum", "ut", "tristique", "et,", "egestas", "quis", "ipsum", "suspendisse", "ultrices", "gravida", "dictum",
        "fusce", "ut", "placerat", "orci", "nulla", "pellentesque", "dignissim", "enim,", "sit", "amet", "venenatis", "urna", "cursus", "eget", "nunc", "scelerisque", "viverra", "mauris,", "in", "aliquam", "sem", "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit", "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies", "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat", "in", "ante", "metus,", "dictum", "at", "tempor", "commodo,", "ullamcorper", "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia", "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit", "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat", "velit,", "scelerisque", "in", "dictum", "non,", "consectetur", "a", "erat", "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus,", "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt", "arcu,", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet", "nisl", "purus,", "in", "mollis", "nunc",
        "sed", "id", "semper", "risus", "in", "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci,", "ac", "auctor", "augue", "mauris", "augue", "neque,", "gravida", "in", "fermentum", "et,", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus", "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam", "nulla", "facilisi", "cras", "fermentum,", "odio", "eu", "feugiat", "pretium,", "nibh", "ipsum", "consequat", "nisl,", "vel", "pretium", "lectus", "quam", "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse", "in", "est", "ante", "in", "nibh", "mauris,", "cursus", "mattis", "molestie", "a,", "iaculis", "at", "erat",
        "pellentesque", "adipiscing", "commodo", "elit,", "at", "imperdiet", "dui", "accumsan", "sit", "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna,", "id", "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac", "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus", "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc,", "faucibus", "a", "pellentesque", "sit", "amet,", "porttitor", "eget", "dolor", "morbi", "non", "arcu", "risus,", "quis", "varius", "quam", "quisque", "id", "diam", "vel", "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus", "suspendisse", "faucibus", "interdum", "posuere", "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "duis", "tristique", "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi",
        "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue", "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris", "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo", "urna,", "molestie", "at", "elementum", "eu,", "facilisis", "sed", "odio", "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam", "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in", "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper", "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit", "lectus", "a", "molestie"
    ];
    //random integer method.
    Lorem.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //text creator method with parameters: how many, what
    Lorem.prototype.createText = function(count, type) {
        switch (type) {
            //paragraphs are loads of sentences.
            case Lorem.TYPE.PARAGRAPH:
                var paragraphs = new Array;
                for (var i = 0; i < count; i++) {
                    var paragraphLength = this.randomInt(10, 20);
                    var paragraph = this.createText(paragraphLength, Lorem.TYPE.SENTENCE);
                    paragraphs.push(paragraph);
                }
                return paragraphs.join('\n');
                break;
            //sentences are loads of words.
            case Lorem.TYPE.SENTENCE:
                var sentences = new Array;
                for (var i = 0; i < count; i++) {
                    var sentenceLength = this.randomInt(5, 10);
                    var words = this.createText(sentenceLength, Lorem.TYPE.WORD).split(' ');
                    words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
                    var sentence = words.join(' ');

                    sentences.push(sentence);
                }
                return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
                break;
            //words are words
            case Lorem.TYPE.WORD:
                var wordIndex = this.randomInt(0, Lorem.WORDS.length - count - 1);

                return Lorem.WORDS.slice(wordIndex, wordIndex + count).join(' ').replace(/\.|\,/g, '');
                break;
        }
    };
    Lorem.prototype.createLorem = function(element) {

        var lorem = new Array;
        var count = parseInt(this.query);

        if (/\d+p/.test(this.query)) {
            var type = Lorem.TYPE.PARAGRAPH;
        }
        else if (/\d+s/.test(this.query)) {
            var type = Lorem.TYPE.SENTENCE;
        }
        else if (/\d+w/.test(this.query)) {
            var type = Lorem.TYPE.WORD;
        }

        lorem.push(this.createText(count, type));
        lorem = lorem.join(' ');

        if (element) {
            if (this.type == Lorem.TEXT)
                element.innerHTML += lorem;
            else if (this.type == Lorem.IMAGE) {
                //TODO: for now, using lorempixum.
                var path = '';
                var options = this.query.split(' ');
                if (options[0] == 'gray') {
                    path += '/g';
                    options[0] = '';
                }
                if (element.getAttribute('width'))
                    path += '/' + element.getAttribute('width');

                if (element.getAttribute('height'))
                    path += '/' + element.getAttribute('height');

                path += '/' + options.join(' ').replace(/(^\s+|\s+$)/, '');
                element.src = 'http://lorempixum.com'+path.replace(/\/\//, '/');
            }
        }

        if (element == null)
            return lorem;
    };

    //Register as jQuery
    if (typeof jQuery != 'undefined') {
        (function($) {
            $.fn.lorem = function() {
                $(this).each(function() {
                    var lorem = new Lorem;
                    lorem.type = $(this).is('img') ? Lorem.IMAGE : Lorem.TEXT;
                    //data-lorem can be taken with data function (thanks to http://forrst.com/people/webking)
                    lorem.query = $(this).data('lorem');
                    lorem.createLorem(this);
                })
            };

            //If developer run this javascript, then we can run the lorem.js
            $(document).ready(function() {
                $('[data-lorem]').lorem();
            });
        })(jQuery);
    }

})();

$.fn.bringToTop = function(layer) {
  var layers = $(this).getLayers();
  layers.splice(layer.index, 1);
  layer.index = layers.push(layer);
};

$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }

  return this;
};

(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);

/**
 * KineticJS JavaScript Library v4.2.0
 * http://www.kineticjs.com/
 * Copyright 2012, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Dec 16 2012
 *
 * Copyright (C) 2011 - 2012 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @namespace
 */
var Kinetic={};(function(){Kinetic.version="4.2.0",Kinetic.Filters={},Kinetic.Plugins={},Kinetic.Global={stages:[],idCounter:0,tempNodes:{},shapes:{},warn:function(a){window.console&&console.warn&&console.warn("Kinetic warning: "+a)},extend:function(a,b){for(var c in b.prototype)c in a.prototype||(a.prototype[c]=b.prototype[c])},_pullNodes:function(a){var b=this.tempNodes;for(var c in b){var d=b[c];d.getStage()!==undefined&&d.getStage()._id===a._id&&(a._addId(d),a._addName(d),this._removeTempNode(d))}},_addTempNode:function(a){this.tempNodes[a._id]=a},_removeTempNode:function(a){delete this.tempNodes[a._id]}}})(),function(a,b){typeof exports=="object"?module.exports=b():typeof define=="function"&&define.amd?define(b):a.returnExports=b()}(this,function(){return Kinetic});
(function(){Kinetic.Type={_isElement:function(a){return!!a&&a.nodeType==1},_isFunction:function(a){return!!(a&&a.constructor&&a.call&&a.apply)},_isObject:function(a){return!!a&&a.constructor==Object},_isArray:function(a){return Object.prototype.toString.call(a)=="[object Array]"},_isNumber:function(a){return Object.prototype.toString.call(a)=="[object Number]"},_isString:function(a){return Object.prototype.toString.call(a)=="[object String]"},_hasMethods:function(a){var b=[];for(var c in a)this._isFunction(a[c])&&b.push(c);return b.length>0},_getXY:function(a){if(this._isNumber(a))return{x:a,y:a};if(this._isArray(a)){if(a.length===1){var b=a[0];if(this._isNumber(b))return{x:b,y:b};if(this._isArray(b))return{x:b[0],y:b[1]};if(this._isObject(b))return b}else if(a.length>=2)return{x:a[0],y:a[1]}}else if(this._isObject(a))return a;return{x:0,y:0}},_getSize:function(a){if(this._isNumber(a))return{width:a,height:a};if(this._isArray(a))if(a.length===1){var b=a[0];if(this._isNumber(b))return{width:b,height:b};if(this._isArray(b)){if(b.length>=4)return{width:b[2],height:b[3]};if(b.length>=2)return{width:b[0],height:b[1]}}else if(this._isObject(b))return b}else{if(a.length>=4)return{width:a[2],height:a[3]};if(a.length>=2)return{width:a[0],height:a[1]}}else if(this._isObject(a))return a;return{width:0,height:0}},_getPoints:function(a){if(a===undefined)return[];if(this._isObject(a[0]))return a;var b=[];for(var c=0;c<a.length;c+=2)b.push({x:a[c],y:a[c+1]});return b},_getImage:function(a,b){if(!a)b(null);else if(this._isElement(a))b(a);else if(this._isString(a)){var c=new Image;c.onload=function(){b(c)},c.src=a}else if(a.data){var d=document.createElement("canvas");d.width=a.width,d.height=a.height;var e=d.getContext("2d");e.putImageData(a,0,0);var f=d.toDataURL(),c=new Image;c.onload=function(){b(c)},c.src=f}else b(null)},_rgbToHex:function(a,b,c){return((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)},_hexToRgb:function(a){var b=parseInt(a,16);return{r:b>>16&255,g:b>>8&255,b:b&255}},_getRandomColorKey:function(){var a=Math.round(Math.random()*255),b=Math.round(Math.random()*255),c=Math.round(Math.random()*255);return this._rgbToHex(a,b,c)},_merge:function(a,b){var c=this._clone(b);for(var d in a)this._isObject(a[d])?c[d]=this._merge(a[d],c[d]):c[d]=a[d];return c},_clone:function(a){var b={};for(var c in a)this._isObject(a[c])?b[c]=this._clone(a[c]):b[c]=a[c];return b},_degToRad:function(a){return a*Math.PI/180},_radToDeg:function(a){return a*180/Math.PI}}})();
(function(){Kinetic.Canvas=function(a,b){this.width=a,this.height=b,this.element=document.createElement("canvas"),this.context=this.element.getContext("2d"),this.setSize(a||0,b||0)};var a=document.createElement("canvas"),b=a.getContext("2d"),c=window.devicePixelRatio||1,d=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1;Kinetic.Canvas.pixelRatio=c/d,Kinetic.Canvas.prototype={clear:function(){var a=this.getContext(),b=this.getElement();a.clearRect(0,0,b.width,b.height)},getElement:function(){return this.element},getContext:function(){return this.context},setWidth:function(a){this.width=a,this.element.width=a*Kinetic.Canvas.pixelRatio,this.element.style.width=a+"px"},setHeight:function(a){this.height=a,this.element.height=a*Kinetic.Canvas.pixelRatio,this.element.style.height=a+"px"},getWidth:function(){return this.width},getHeight:function(){return this.height},setSize:function(a,b){this.setWidth(a),this.setHeight(b)},toDataURL:function(a,b){try{return this.element.toDataURL(a,b)}catch(c){try{return this.element.toDataURL()}catch(c){return Kinetic.Global.warn("Unable to get data URL. "+c.message),""}}},fill:function(a){this._fill(a)},stroke:function(a){this._stroke(a)},fillStroke:function(a){this._fill(a),this._stroke(a,a.getShadow()&&a.getFill())},applyShadow:function(a,b){var c=this.context;c.save(),this._applyShadow(a),b(),c.restore(),b()},_applyLineCap:function(a){var b=a.getLineCap();b&&(this.context.lineCap=b)},_applyOpacity:function(a){var b=a.getAbsoluteOpacity();b!==1&&(this.context.globalAlpha=b)},_applyLineJoin:function(a){var b=a.getLineJoin();b&&(this.context.lineJoin=b)},_handlePixelRatio:function(){var a=Kinetic.Canvas.pixelRatio;a!==1&&this.getContext().scale(a,a)}},Kinetic.SceneCanvas=function(a,b){Kinetic.Canvas.call(this,a,b)},Kinetic.SceneCanvas.prototype={_fill:function(a,b){var c=this.context,d=a.getFill(),e=a._getFillType(d),f=a.getShadow();if(d){c.save(),!b&&f&&this._applyShadow(a);switch(e){case"COLOR":c.fillStyle=d,c.fill(c);break;case"PATTERN":(d.x||d.y)&&c.translate(d.x||0,d.y||0),d.rotation&&c.rotate(d.rotation),d.scale&&c.scale(d.scale.x,d.scale.y),d.offset&&c.translate(-1*d.offset.x,-1*d.offset.y),c.fillStyle=c.createPattern(d.image,d.repeat||"repeat"),c.fill(c);break;case"LINEAR_GRADIENT":var g=d.start,h=d.end,i=c.createLinearGradient(g.x,g.y,h.x,h.y),j=d.colorStops;for(var k=0;k<j.length;k+=2)i.addColorStop(j[k],j[k+1]);c.fillStyle=i,c.fill(c);break;case"RADIAL_GRADIENT":var g=d.start,h=d.end,i=c.createRadialGradient(g.x,g.y,g.radius,h.x,h.y,h.radius),j=d.colorStops;for(var k=0;k<j.length;k+=2)i.addColorStop(j[k],j[k+1]);c.fillStyle=i,c.fill(c);break;default:c.fillStyle="black",c.fill(c)}c.restore(),!b&&f&&f.opacity&&this._fill(a,!0)}},_stroke:function(a,b){var c=this.context,d=a.getStroke(),e=a.getStrokeWidth(),f=a.getShadow(),g=a.getDashArray();if(d||e)c.save(),this._applyLineCap(a),g&&(c.setLineDash?c.setLineDash(g):Kinetic.Global.warn("Could not apply dash array because your browser does not support it.")),!b&&f&&this._applyShadow(a),c.lineWidth=e||2,c.strokeStyle=d||"black",c.stroke(c),c.restore(),!b&&f&&f.opacity&&this._stroke(a,!0)},_applyShadow:function(a){var b=this.context,c=a.getShadow();if(c){var d=a.getAbsoluteOpacity(),e=c.color||"black",f=c.blur||5,g=c.offset||{x:0,y:0};c.opacity&&(b.globalAlpha=c.opacity*d),b.shadowColor=e,b.shadowBlur=f,b.shadowOffsetX=g.x,b.shadowOffsetY=g.y}}},Kinetic.Global.extend(Kinetic.SceneCanvas,Kinetic.Canvas),Kinetic.HitCanvas=function(a,b){Kinetic.Canvas.call(this,a,b)},Kinetic.HitCanvas.prototype={_fill:function(a){var b=this.context;b.save(),b.fillStyle="#"+a.colorKey,b.fill(b),b.restore()},_stroke:function(a){var b=this.context,c=a.getStroke(),d=a.getStrokeWidth();if(c||d)this._applyLineCap(a),b.save(),b.lineWidth=d||2,b.strokeStyle="#"+a.colorKey,b.stroke(b),b.restore()}},Kinetic.Global.extend(Kinetic.HitCanvas,Kinetic.Canvas)})();
(function(){Kinetic.Tween=function(a,b,c,d,e,f){this._listeners=[],this.addListener(this),this.obj=a,this.propFunc=b,this.begin=d,this._pos=d,this.setDuration(f),this.isPlaying=!1,this._change=0,this.prevTime=0,this.prevPos=0,this.looping=!1,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.name="",this.func=c,this.setFinish(e)},Kinetic.Tween.prototype={setTime:function(a){this.prevTime=this._time,a>this.getDuration()?this.looping?(this.rewind(a-this._duration),this.update(),this.broadcastMessage("onLooped",{target:this,type:"onLooped"})):(this._time=this._duration,this.update(),this.stop(),this.broadcastMessage("onFinished",{target:this,type:"onFinished"})):a<0?(this.rewind(),this.update()):(this._time=a,this.update())},getTime:function(){return this._time},setDuration:function(a){this._duration=a===null||a<=0?1e5:a},getDuration:function(){return this._duration},setPosition:function(a){this.prevPos=this._pos,this.propFunc(a),this._pos=a,this.broadcastMessage("onChanged",{target:this,type:"onChanged"})},getPosition:function(a){return a===undefined&&(a=this._time),this.func(a,this.begin,this._change,this._duration)},setFinish:function(a){this._change=a-this.begin},getFinish:function(){return this.begin+this._change},start:function(){this.rewind(),this.startEnterFrame(),this.broadcastMessage("onStarted",{target:this,type:"onStarted"})},rewind:function(a){this.stop(),this._time=a===undefined?0:a,this.fixTime(),this.update()},fforward:function(){this._time=this._duration,this.fixTime(),this.update()},update:function(){this.setPosition(this.getPosition(this._time))},startEnterFrame:function(){this.stopEnterFrame(),this.isPlaying=!0,this.onEnterFrame()},onEnterFrame:function(){this.isPlaying&&this.nextFrame()},nextFrame:function(){this.setTime((this.getTimer()-this._startTime)/1e3)},stop:function(){this.stopEnterFrame(),this.broadcastMessage("onStopped",{target:this,type:"onStopped"})},stopEnterFrame:function(){this.isPlaying=!1},continueTo:function(a,b){this.begin=this._pos,this.setFinish(a),this._duration!==undefined&&this.setDuration(b),this.start()},resume:function(){this.fixTime(),this.startEnterFrame(),this.broadcastMessage("onResumed",{target:this,type:"onResumed"})},yoyo:function(){this.continueTo(this.begin,this._time)},addListener:function(a){return this.removeListener(a),this._listeners.push(a)},removeListener:function(a){var b=this._listeners,c=b.length;while(c--)if(b[c]==a)return b.splice(c,1),!0;return!1},broadcastMessage:function(){var a=[];for(var b=0;b<arguments.length;b++)a.push(arguments[b]);var c=a.shift(),d=this._listeners,e=d.length;for(var b=0;b<e;b++)d[b][c]&&d[b][c].apply(d[b],a)},fixTime:function(){this._startTime=this.getTimer()-this._time*1e3},getTimer:function(){return(new Date).getTime()-this._time}},Kinetic.Tweens={"back-ease-in":function(a,b,c,d,e,f){var g=1.70158;return c*(a/=d)*a*((g+1)*a-g)+b},"back-ease-out":function(a,b,c,d,e,f){var g=1.70158;return c*((a=a/d-1)*a*((g+1)*a+g)+1)+b},"back-ease-in-out":function(a,b,c,d,e,f){var g=1.70158;return(a/=d/2)<1?c/2*a*a*(((g*=1.525)+1)*a-g)+b:c/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},"elastic-ease-in":function(a,b,c,d,e,f){var g=0;return a===0?b:(a/=d)==1?b+c:(f||(f=d*.3),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f))+b)},"elastic-ease-out":function(a,b,c,d,e,f){var g=0;return a===0?b:(a/=d)==1?b+c:(f||(f=d*.3),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+c+b)},"elastic-ease-in-out":function(a,b,c,d,e,f){var g=0;return a===0?b:(a/=d/2)==2?b+c:(f||(f=d*.3*1.5),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),a<1?-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+b:e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*.5+c+b)},"bounce-ease-out":function(a,b,c,d){return(a/=d)<1/2.75?c*7.5625*a*a+b:a<2/2.75?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:a<2.5/2.75?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},"bounce-ease-in":function(a,b,c,d){return c-Kinetic.Tweens["bounce-ease-out"](d-a,0,c,d)+b},"bounce-ease-in-out":function(a,b,c,d){return a<d/2?Kinetic.Tweens["bounce-ease-in"](a*2,0,c,d)*.5+b:Kinetic.Tweens["bounce-ease-out"](a*2-d,0,c,d)*.5+c*.5+b},"ease-in":function(a,b,c,d){return c*(a/=d)*a+b},"ease-out":function(a,b,c,d){return-c*(a/=d)*(a-2)+b},"ease-in-out":function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},"strong-ease-in":function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},"strong-ease-out":function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},"strong-ease-in-out":function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},linear:function(a,b,c,d){return c*a/d+b}}})();
(function(){Kinetic.Transform=function(){this.m=[1,0,0,1,0,0]},Kinetic.Transform.prototype={translate:function(a,b){this.m[4]+=this.m[0]*a+this.m[2]*b,this.m[5]+=this.m[1]*a+this.m[3]*b},scale:function(a,b){this.m[0]*=a,this.m[1]*=a,this.m[2]*=b,this.m[3]*=b},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.m[0]*b+this.m[2]*c,e=this.m[1]*b+this.m[3]*c,f=this.m[0]*-c+this.m[2]*b,g=this.m[1]*-c+this.m[3]*b;this.m[0]=d,this.m[1]=e,this.m[2]=f,this.m[3]=g},getTranslation:function(){return{x:this.m[4],y:this.m[5]}},multiply:function(a){var b=this.m[0]*a.m[0]+this.m[2]*a.m[1],c=this.m[1]*a.m[0]+this.m[3]*a.m[1],d=this.m[0]*a.m[2]+this.m[2]*a.m[3],e=this.m[1]*a.m[2]+this.m[3]*a.m[3],f=this.m[0]*a.m[4]+this.m[2]*a.m[5]+this.m[4],g=this.m[1]*a.m[4]+this.m[3]*a.m[5]+this.m[5];this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},invert:function(){var a=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),b=this.m[3]*a,c=-this.m[1]*a,d=-this.m[2]*a,e=this.m[0]*a,f=a*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),g=a*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},getMatrix:function(){return this.m}}})();
(function(){Kinetic.Collection=function(){var a=[].slice.call(arguments),b=a.length,c=0;this.length=b;for(;c<b;c++)this[c]=a[c];return this},Kinetic.Collection.prototype=new Array,Kinetic.Collection.prototype.apply=function(a){args=[].slice.call(arguments),args.shift();for(var b=0;b<this.length;b++)Kinetic.Type._isFunction(this[b][a])&&this[b][a].apply(this[b],args)},Kinetic.Collection.prototype.each=function(a){for(var b=0;b<this.length;b++)a.call(this[b],b,this[b])}})();
(function(){Kinetic.Animation=function(a,b){this.func=a,this.node=b,this.id=Kinetic.Animation.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:(new Date).getTime()}},Kinetic.Animation.prototype={start:function(){this.stop(),this.frame.timeDiff=0,this.frame.lastTime=(new Date).getTime(),Kinetic.Animation._addAnimation(this),Kinetic.Animation._handleAnimation()},stop:function(){Kinetic.Animation._removeAnimation(this)},_updateFrameObject:function(){var a=(new Date).getTime();this.frame.timeDiff=a-this.frame.lastTime,this.frame.lastTime=a,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}},Kinetic.Animation.animations=[],Kinetic.Animation.animIdCounter=0,Kinetic.Animation.animRunning=!1,Kinetic.Animation.fixedRequestAnimFrame=function(a){window.setTimeout(a,1e3/60)},Kinetic.Animation._addAnimation=function(a){this.animations.push(a)},Kinetic.Animation._removeAnimation=function(a){var b=a.id,c=this.animations;for(var d=0;d<c.length;d++)if(c[d].id===b){this.animations.splice(d,1);break}},Kinetic.Animation._runFrames=function(){var a={};for(var b=0;b<this.animations.length;b++){var c=this.animations[b];c._updateFrameObject(),c.node&&c.node._id!==undefined&&(a[c.node._id]=c.node),c.func&&c.func(c.frame)}for(var d in a)a[d].draw()},Kinetic.Animation._animationLoop=function(){if(this.animations.length>0){this._runFrames();var a=this;Kinetic.Animation.requestAnimFrame(function(){a._animationLoop()})}else this.animRunning=!1},Kinetic.Animation._handleAnimation=function(){var a=this;this.animRunning||(this.animRunning=!0,a._animationLoop())},Kinetic.Animation.requestAnimFrame=function(a){var b=Kinetic.DD&&Kinetic.DD.moving?this.fixedRequestAnimFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||Kinetic.Animation.fixedRequestAnimFrame;b(a)}})();
(function(){Kinetic.Node=function(a){this._nodeInit(a)},Kinetic.Node.prototype={_nodeInit:function(a){this.defaultNodeAttrs={visible:!0,listening:!0,name:undefined,opacity:1,x:0,y:0,scale:{x:1,y:1},rotation:0,offset:{x:0,y:0},draggable:!1},this.setDefaultAttrs(this.defaultNodeAttrs),this.eventListeners={},this.setAttrs(a);var b=this;this.on("idChange.kinetic",function(a){var c=b.getStage();c&&(c._removeId(a.oldVal),c._addId(b))}),this.on("nameChange.kinetic",function(a){var c=b.getStage();c&&(c._removeName(a.oldVal,b._id),c._addName(b))})},on:function(a,b){var c=a.split(" "),d=c.length;for(var e=0;e<d;e++){var f=c[e],g=f,h=g.split("."),i=h[0],j=h.length>1?h[1]:"";this.eventListeners[i]||(this.eventListeners[i]=[]),this.eventListeners[i].push({name:j,handler:b})}},off:function(a){var b=a.split(" "),c=b.length;for(var d=0;d<c;d++){var e=b[d],f=e,g=f.split("."),h=g[0];if(g.length>1)if(h)this.eventListeners[h]&&this._off(h,g[1]);else for(var e in this.eventListeners)this._off(e,g[1]);else delete this.eventListeners[h]}},remove:function(){var a=this.getParent();if(a&&this.index!==undefined&&a.children[this.index]._id==this._id){var b=a.getStage();b&&(b._removeId(this.getId()),b._removeName(this.getName(),this._id)),Kinetic.Global._removeTempNode(this),a.children.splice(this.index,1),a._setChildrenIndices();var c=Kinetic.DD;c&&c.node&&c.node._id===this._id&&delete Kinetic.DD.node;while(this.children&&this.children.length>0)this.children[0].remove();delete this.parent}},getAttrs:function(){return this.attrs},setDefaultAttrs:function(a){this.attrs===undefined&&(this.attrs={});if(a)for(var b in a)this.attrs[b]===undefined&&(this.attrs[b]=a[b])},setAttrs:function(a){if(a)for(var b in a){var c="set"+b.charAt(0).toUpperCase()+b.slice(1);Kinetic.Type._isFunction(this[c])?this[c](a[b]):this.setAttr(b,a[b])}},getVisible:function(){var a=this.attrs.visible,b=this.getParent();return a&&b&&!b.getVisible()?!1:a},getListening:function(){var a=this.attrs.listening,b=this.getParent();return a&&b&&!b.getListening()?!1:a},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},getZIndex:function(){return this.index},getAbsoluteZIndex:function(){function e(b){var f=[],g=b.length;for(var h=0;h<g;h++){var i=b[h];d++,i.nodeType!=="Shape"&&(f=f.concat(i.getChildren())),i._id===c._id&&(h=g)}f.length>0&&f[0].getLevel()<=a&&e(f)}var a=this.getLevel(),b=this.getStage(),c=this,d=0;return c.nodeType!=="Stage"&&e(c.getStage().getChildren()),d},getLevel:function(){var a=0,b=this.parent;while(b)a++,b=b.parent;return a},setPosition:function(){var a=Kinetic.Type._getXY([].slice.call(arguments));this.setAttr("x",a.x),this.setAttr("y",a.y)},getPosition:function(){var a=this.attrs;return{x:a.x,y:a.y}},getAbsolutePosition:function(){var a=this.getAbsoluteTransform(),b=this.getOffset();return a.translate(b.x,b.y),a.getTranslation()},setAbsolutePosition:function(){var a=Kinetic.Type._getXY([].slice.call(arguments)),b=this._clearTransform();this.attrs.x=b.x,this.attrs.y=b.y,delete b.x,delete b.y;var c=this.getAbsoluteTransform();c.invert(),c.translate(a.x,a.y),a={x:this.attrs.x+c.getTranslation().x,y:this.attrs.y+c.getTranslation().y},this.setPosition(a.x,a.y),this._setTransform(b)},move:function(){var a=Kinetic.Type._getXY([].slice.call(arguments)),b=this.getX(),c=this.getY();a.x!==undefined&&(b+=a.x),a.y!==undefined&&(c+=a.y),this.setPosition(b,c)},getRotationDeg:function(){return Kinetic.Type._radToDeg(this.getRotation())},setRotationDeg:function(a){this.setRotation(Kinetic.Type._degToRad(a))},rotate:function(a){this.setRotation(this.getRotation()+a)},rotateDeg:function(a){this.setRotation(this.getRotation()+Kinetic.Type._degToRad(a))},moveToTop:function(){var a=this.index;return this.parent.children.splice(a,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0},moveUp:function(){var a=this.index,b=this.parent.getChildren().length;if(a<b-1)return this.parent.children.splice(a,1),this.parent.children.splice(a+1,0,this),this.parent._setChildrenIndices(),!0},moveDown:function(){var a=this.index;if(a>0)return this.parent.children.splice(a,1),this.parent.children.splice(a-1,0,this),this.parent._setChildrenIndices(),!0},moveToBottom:function(){var a=this.index;if(a>0)return this.parent.children.splice(a,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0},setZIndex:function(a){var b=this.index;this.parent.children.splice(b,1),this.parent.children.splice(a,0,this),this.parent._setChildrenIndices()},getAbsoluteOpacity:function(){var a=this.getOpacity();return this.getParent()&&(a*=this.getParent().getAbsoluteOpacity()),a},moveTo:function(a){var b=this.parent;b.children.splice(this.index,1),b._setChildrenIndices(),a.children.push(this),this.index=a.children.length-1,this.parent=a,a._setChildrenIndices()},toObject:function(){var a=Kinetic.Type,b={},c=this.attrs;b.attrs={};for(var d in c){var e=c[d];!a._isFunction(e)&&!a._isElement(e)&&(!a._isObject(e)||!a._hasMethods(e))&&(b.attrs[d]=e)}return b.nodeType=this.nodeType,b.shapeType=this.shapeType,b},toJSON:function(){return JSON.stringify(this.toObject())},getParent:function(){return this.parent},getLayer:function(){return this.getParent().getLayer()},getStage:function(){return this.getParent()?this.getParent().getStage():undefined},simulate:function(a,b){this._handleEvent(a,b||{})},fire:function(a,b){this._executeHandlers(a,b||{})},getAbsoluteTransform:function(){var a=new Kinetic.Transform,b=[],c=this.parent;b.unshift(this);while(c)b.unshift(c),c=c.parent;var d=b.length;for(var e=0;e<d;e++){var f=b[e],g=f.getTransform();a.multiply(g)}return a},getTransform:function(){var a=new Kinetic.Transform,b=this.attrs,c=b.x,d=b.y,e=b.rotation,f=b.scale,g=f.x,h=f.y,i=b.offset,j=i.x,k=i.y;return(c!==0||d!==0)&&a.translate(c,d),e!==0&&a.rotate(e),(g!==1||h!==1)&&a.scale(g,h),(j!==0||k!==0)&&a.translate(-1*j,-1*k),a},clone:function(a){var b=this.shapeType||this.nodeType,c=new Kinetic[b](this.attrs);for(var d in this.eventListeners){var e=this.eventListeners[d],f=e.length;for(var g=0;g<f;g++){var h=e[g];h.name.indexOf("kinetic")<0&&(c.eventListeners[d]||(c.eventListeners[d]=[]),c.eventListeners[d].push(h))}}return c.setAttrs(a),c},toDataURL:function(a){a=a||{};var b=a.mimeType||null,c=a.quality||null,d,e,f=a.x||0,g=a.y||0;return a.width&&a.height?d=new Kinetic.SceneCanvas(a.width,a.height):(d=this.getStage().bufferCanvas,d.clear()),e=d.getContext(),e.save(),(f||g)&&e.translate(-1*f,-1*g),this.drawScene(d),e.restore(),d.toDataURL(b,c)},toImage:function(a){Kinetic.Type._getImage(this.toDataURL(a),function(b){a.callback(b)})},setOffset:function(){var a=Kinetic.Type._getXY([].slice.call(arguments));a.x===undefined&&(a.x=this.getOffset().x),a.y===undefined&&(a.y=this.getOffset().y),this.setAttr("offset",a)},setScale:function(){var a=Kinetic.Type._getXY([].slice.call(arguments));a.x===undefined&&(a.x=this.getScale().x),a.y===undefined&&(a.y=this.getScale().y),this.setAttr("scale",a)},setSize:function(){var a=Kinetic.Type._getSize(Array.prototype.slice.call(arguments));this.setWidth(a.width),this.setHeight(a.height)},getSize:function(){return{width:this.getWidth(),height:this.getHeight()}},getWidth:function(){return this.attrs.width||0},getHeight:function(){return this.attrs.height||0},_get:function(a){return this.nodeType===a?[this]:[]},_off:function(a,b){for(var c=0;c<this.eventListeners[a].length;c++)if(this.eventListeners[a][c].name===b){this.eventListeners[a].splice(c,1);if(this.eventListeners[a].length===0){delete this.eventListeners[a];break}c--}},_clearTransform:function(){var a=this.attrs,b=a.scale,c=a.offset,d={x:a.x,y:a.y,rotation:a.rotation,scale:{x:b.x,y:b.y},offset:{x:c.x,y:c.y}};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scale={x:1,y:1},this.attrs.offset={x:0,y:0},d},_setTransform:function(a){for(var b in a)this.attrs[b]=a[b]},_fireBeforeChangeEvent:function(a,b,c){this._handleEvent("before"+a.toUpperCase()+"Change",{oldVal:b,newVal:c})},_fireChangeEvent:function(a,b,c){this._handleEvent(a+"Change",{oldVal:b,newVal:c})},setAttr:function(a,b){if(b!==undefined){var c=this.attrs[a];this._fireBeforeChangeEvent(a,c,b),this.attrs[a]=b,this._fireChangeEvent(a,c,b)}},_handleEvent:function(a,b,c){b&&this.nodeType==="Shape"&&(b.shape=this);var d=this.getStage(),e=this.eventListeners,f=!0;a==="mouseenter"&&c&&this._id===c._id?f=!1:a==="mouseleave"&&c&&this._id===c._id&&(f=!1),f&&(e[a]&&this.fire(a,b),b&&!b.cancelBubble&&this.parent&&(c&&c.parent?this._handleEvent.call(this.parent,a,b,c.parent):this._handleEvent.call(this.parent,a,b)))},_executeHandlers:function(a,b){var c=this.eventListeners[a],d=c.length;for(var e=0;e<d;e++)c[e].handler.apply(this,[b])}},Kinetic.Node.addSetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addSetter(constructor,d)}},Kinetic.Node.addGetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addGetter(constructor,d)}},Kinetic.Node.addGettersSetters=function(constructor,a){this.addSetters(constructor,a),this.addGetters(constructor,a)},Kinetic.Node._addSetter=function(constructor,a){var b=this,c="set"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(b){this.setAttr(a,b)}},Kinetic.Node._addGetter=function(constructor,a){var b=this,c="get"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(b){return this.attrs[a]}},Kinetic.Node.create=function(a,b){return this._createNode(JSON.parse(a),b)},Kinetic.Node._createNode=function(a,b){var c;a.nodeType==="Shape"?a.shapeType===undefined?c="Shape":c=a.shapeType:c=a.nodeType,b&&(a.attrs.container=b);var d=new Kinetic[c](a.attrs);if(a.children){var e=a.children.length;for(var f=0;f<e;f++)d.add(this._createNode(a.children[f]))}return d},Kinetic.Node.addGettersSetters(Kinetic.Node,["x","y","rotation","opacity","name","id"]),Kinetic.Node.addGetters(Kinetic.Node,["scale","offset"]),Kinetic.Node.addSetters(Kinetic.Node,["width","height","listening","visible"]),Kinetic.Node.prototype.isListening=Kinetic.Node.prototype.getListening,Kinetic.Node.prototype.isVisible=Kinetic.Node.prototype.getVisible;var a=["on","off"];for(var b=0;b<2;b++)(function(b){var c=a[b];Kinetic.Collection.prototype[c]=function(){var a=[].slice.call(arguments);a.unshift(c),this.apply.apply(this,a)}})(b)})();
(function(){Kinetic.Transition=function(a,b){function d(a,b,e,f){for(var g in a)g!=="duration"&&g!=="easing"&&g!=="callback"&&(Kinetic.Type._isObject(a[g])?(e[g]={},d(a[g],b[g],e[g],f)):c._add(c._getTween(b,g,a[g],e,f)))}this.node=a,this.config=b,this.tweens=[];var c=this,e={};d(b,a.attrs,e,e);var f=0;for(var g=0;g<this.tweens.length;g++){var h=this.tweens[g];h.onFinished=function(){f++,f>=c.tweens.length&&c.onFinished()}}},Kinetic.Transition.prototype={start:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].start()},stop:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].stop()},resume:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].resume()},_onEnterFrame:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].onEnterFrame()},_add:function(a){this.tweens.push(a)},_getTween:function(a,b,c,d,e){var f=this.config,g=this.node,h=f.easing;h===undefined&&(h="linear");var i=new Kinetic.Tween(g,function(a){d[b]=a,g.setAttrs(e)},Kinetic.Tweens[h],a[b],c,f.duration);return i}},Kinetic.Node.prototype.transitionTo=function(a){this.transAnim||(this.transAnim=new Kinetic.Animation);var b=this.nodeType==="Stage"?this:this.getLayer(),c=this,d=new Kinetic.Transition(this,a);return this.transAnim.func=function(){d._onEnterFrame()},this.transAnim.node=b,d.onFinished=function(){c.transAnim.stop(),a.callback&&a.callback()},d.start(),this.transAnim.start(),d}})();
(function(){Kinetic.Container=function(a){this._containerInit(a)},Kinetic.Container.prototype={_containerInit:function(a){this.children=[],Kinetic.Node.call(this,a)},getChildren:function(){return this.children},removeChildren:function(){while(this.children.length>0)this.children[0].remove()},add:function(a){var b=Kinetic.Global,c=this.children;a._id=Kinetic.Global.idCounter++,a.index=c.length,a.parent=this,c.push(a);var d=a.getStage();return d?(d._addId(a),d._addName(a),b._pullNodes(d)):b._addTempNode(a),this},get:function(a){var b=new Kinetic.Collection;if(a.charAt(0)==="#"){var c=this._getNodeById(a.slice(1));c&&b.push(c)}else if(a.charAt(0)==="."){var d=this._getNodesByName(a.slice(1));Kinetic.Collection.apply(b,d)}else{var e=[],f=this.getChildren(),g=f.length;for(var h=0;h<g;h++)e=e.concat(f[h]._get(a));Kinetic.Collection.apply(b,e)}return b},_getNodeById:function(a){var b=this.getStage();return b.ids[a]!==undefined&&this.isAncestorOf(b.ids[a])?b.ids[a]:null},_getNodesByName:function(a){var b=this.getStage().names[a]||[];return this._getDescendants(b)},_get:function(a){var b=Kinetic.Node.prototype._get.call(this,a),c=this.getChildren(),d=c.length;for(var e=0;e<d;e++)b=b.concat(c[e]._get(a));return b},toObject:function(){var a=Kinetic.Node.prototype.toObject.call(this);a.children=[];var b=this.getChildren(),c=b.length;for(var d=0;d<c;d++){var e=b[d];a.children.push(e.toObject())}return a},_getDescendants:function(a){var b=[],c=a.length;for(var d=0;d<c;d++){var e=a[d];this.isAncestorOf(e)&&b.push(e)}return b},isAncestorOf:function(a){var b=a.getParent();while(b){if(b._id===this._id)return!0;b=b.getParent()}return!1},clone:function(a){var b=Kinetic.Node.prototype.clone.call(this,a);for(var c in this.children)b.add(this.children[c].clone());return b},getIntersections:function(){var a=Kinetic.Type._getXY(Array.prototype.slice.call(arguments)),b=[],c=this.get("Shape"),d=c.length;for(var e=0;e<d;e++){var f=c[e];f.isVisible()&&f.intersects(a)&&b.push(f)}return b},_setChildrenIndices:function(){var a=this.children,b=a.length;for(var c=0;c<b;c++)a[c].index=c},draw:function(){this.drawScene(),this.drawHit()},drawScene:function(a){if(this.isVisible()){var b=this.children,c=b.length;for(var d=0;d<c;d++)b[d].drawScene(a)}},drawHit:function(){if(this.isVisible()&&this.isListening()){var a=this.children,b=a.length;for(var c=0;c<b;c++)a[c].drawHit()}}},Kinetic.Global.extend(Kinetic.Container,Kinetic.Node)})();
(function(){Kinetic.Stage=function(a){this._initStage(a)},Kinetic.Stage.prototype={_initStage:function(a){this.setDefaultAttrs({width:400,height:200}),Kinetic.Container.call(this,a),this._setStageDefaultProperties(),this._id=Kinetic.Global.idCounter++,this._buildDOM(),this._bindContentEvents();var b=Kinetic.Global;b.stages.push(this),this._addId(this),this._addName(this)},setContainer:function(a){typeof a=="string"&&(a=document.getElementById(a)),this.setAttr("container",a)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this._resizeDOM()},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this._resizeDOM()},clear:function(){var a=this.children;for(var b=0;b<a.length;b++)a[b].clear()},reset:function(){this.removeChildren(),this._setStageDefaultProperties(),this.setAttrs(this.defaultNodeAttrs)},getMousePosition:function(){return this.mousePos},getTouchPosition:function(){return this.touchPos},getUserPosition:function(){return this.getTouchPosition()||this.getMousePosition()},getStage:function(){return this},getDOM:function(){return this.content},toDataURL:function(a){function i(d){var e=h[d],j=e.toDataURL(),k=new Image;k.onload=function(){g.drawImage(k,0,0),d<h.length-1?i(d+1):a.callback(f.toDataURL(b,c))},k.src=j}a=a||{};var b=a.mimeType||null,c=a.quality||null,d=a.x||0,e=a.y||0,f=new Kinetic.SceneCanvas(a.width||this.getWidth(),a.height||this.getHeight()),g=f.getContext(),h=this.children;(d||e)&&g.translate(-1*d,-1*e),i(0)},toImage:function(a){var b=a.callback;a.callback=function(a){Kinetic.Type._getImage(a,function(a){b(a)})},this.toDataURL(a)},getIntersection:function(a){var b,c=this.getChildren();for(var d=c.length-1;d>=0;d--){var e=c[d];if(e.isVisible()&&e.isListening()){var f=e.hitCanvas.context.getImageData(Math.round(a.x),Math.round(a.y),1,1).data;if(f[3]===255){var g=Kinetic.Type._rgbToHex(f[0],f[1],f[2]);return b=Kinetic.Global.shapes[g],{shape:b,pixel:f}}if(f[0]>0||f[1]>0||f[2]>0||f[3]>0)return{pixel:f}}}return null},_getNodeById:function(a){return this.ids[a]||null},_getNodesByName:function(a){return this.names[a]||[]},_resizeDOM:function(){if(this.content){var a=this.attrs.width,b=this.attrs.height;this.content.style.width=a+"px",this.content.style.height=b+"px",this.bufferCanvas.setSize(a,b),this.hitCanvas.setSize(a,b);var c=this.children;for(var d=0;d<c.length;d++){var e=c[d];e.getCanvas().setSize(a,b),e.hitCanvas.setSize(a,b),e.draw()}}},add:function(a){return Kinetic.Container.prototype.add.call(this,a),a.canvas.setSize(this.attrs.width,this.attrs.height),a.hitCanvas.setSize(this.attrs.width,this.attrs.height),a.draw(),this.content.appendChild(a.canvas.element),this},_setUserPosition:function(a){a||(a=window.event),this._setMousePosition(a),this._setTouchPosition(a)},_bindContentEvents:function(){var a=Kinetic.Global,b=this,c=["mousedown","mousemove","mouseup","mouseout","touchstart","touchmove","touchend"];for(var d=0;d<c.length;d++){var e=c[d];(function(){var a=e;b.content.addEventListener(a,function(c){b["_"+a](c)},!1)})()}},_mouseout:function(a){this._setUserPosition(a);var b=Kinetic.DD,c=this.targetShape;c&&(!b||!b.moving)&&(c._handleEvent("mouseout",a),c._handleEvent("mouseleave",a),this.targetShape=null),this.mousePos=undefined,b&&b._endDrag(a)},_mousemove:function(a){this._setUserPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getUserPosition());if(c){var d=c.shape;d&&(!!b&&!!b.moving||c.pixel[3]!==255||!!this.targetShape&&this.targetShape._id===d._id?d._handleEvent("mousemove",a):(this.targetShape&&(this.targetShape._handleEvent("mouseout",a,d),this.targetShape._handleEvent("mouseleave",a,d)),d._handleEvent("mouseover",a,this.targetShape),d._handleEvent("mouseenter",a,this.targetShape),this.targetShape=d))}else this.targetShape&&(!b||!b.moving)&&(this.targetShape._handleEvent("mouseout",a),this.targetShape._handleEvent("mouseleave",a),this.targetShape=null);b&&b._startDrag(a)},_mousedown:function(a){this._setUserPosition(a);var b=this.getIntersection(this.getUserPosition());if(b&&b.shape){var c=b.shape;this.clickStart=!0,c._handleEvent("mousedown",a)}Kinetic.DD&&this.attrs.draggable&&this._initDrag()},_mouseup:function(a){this._setUserPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getUserPosition()),d=this;if(c&&c.shape){var e=c.shape;e._handleEvent("mouseup",a),this.clickStart&&(!b||!b.moving||!b.node)&&(e._handleEvent("click",a),this.inDoubleClickWindow&&e._handleEvent("dblclick",a),this.inDoubleClickWindow=!0,setTimeout(function(){d.inDoubleClickWindow=!1},this.dblClickWindow))}this.clickStart=!1,b&&b._endDrag(a)},_touchstart:function(a){this._setUserPosition(a),a.preventDefault();var b=this.getIntersection(this.getUserPosition());if(b&&b.shape){var c=b.shape;this.tapStart=!0,c._handleEvent("touchstart",a)}Kinetic.DD&&this.attrs.draggable&&this._initDrag()},_touchend:function(a){this._setUserPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getUserPosition()),d=this;if(c&&c.shape){var e=c.shape;e._handleEvent("touchend",a),this.tapStart&&(!b||!b.moving||!b.node)&&(e._handleEvent("tap",a),this.inDoubleClickWindow&&e._handleEvent("dbltap",a),this.inDoubleClickWindow=!0,setTimeout(function(){d.inDoubleClickWindow=!1},this.dblClickWindow))}this.tapStart=!1,b&&b._endDrag(a)},_touchmove:function(a){this._setUserPosition(a);var b=Kinetic.DD;a.preventDefault();var c=this.getIntersection(this.getUserPosition());if(c&&c.shape){var d=c.shape;d._handleEvent("touchmove",a)}b&&b._startDrag(a)},_setMousePosition:function(a){var b=a.clientX-this._getContentPosition().left,c=a.clientY-this._getContentPosition().top;this.mousePos={x:b,y:c}},_setTouchPosition:function(a){if(a.touches!==undefined&&a.touches.length===1){var b=a.touches[0],c=b.clientX-this._getContentPosition().left,d=b.clientY-this._getContentPosition().top;this.touchPos={x:c,y:d}}},_getContentPosition:function(){var a=this.content.getBoundingClientRect();return{top:a.top,left:a.left}},_buildDOM:function(){this.content=document.createElement("div"),this.content.style.position="relative",this.content.style.display="inline-block",this.content.className="kineticjs-content",this.attrs.container.appendChild(this.content),this.bufferCanvas=new Kinetic.SceneCanvas,this.hitCanvas=new Kinetic.HitCanvas(0,0),this._resizeDOM()},_addId:function(a){a.attrs.id!==undefined&&(this.ids[a.attrs.id]=a)},_removeId:function(a){a!==undefined&&delete this.ids[a]},_addName:function(a){var b=a.attrs.name;b!==undefined&&(this.names[b]===undefined&&(this.names[b]=[]),this.names[b].push(a))},_removeName:function(a,b){if(a!==undefined){var c=this.names[a];if(c!==undefined){for(var d=0;d<c.length;d++){var e=c[d];e._id===b&&c.splice(d,1)}c.length===0&&delete this.names[a]}}},_onContent:function(a,b){var c=a.split(" ");for(var d=0;d<c.length;d++){var e=c[d];this.content.addEventListener(e,b,!1)}},_setStageDefaultProperties:function(){this.nodeType="Stage",this.dblClickWindow=400,this.targetShape=null,this.mousePos=undefined,this.clickStart=!1,this.touchPos=undefined,this.tapStart=!1,this.ids={},this.names={}}},Kinetic.Global.extend(Kinetic.Stage,Kinetic.Container),Kinetic.Node.addGetters(Kinetic.Stage,["container"])})();
(function(){Kinetic.Layer=function(a){this._initLayer(a)},Kinetic.Layer.prototype={_initLayer:function(a){this.setDefaultAttrs({clearBeforeDraw:!0}),this.nodeType="Layer",this.beforeDrawFunc=undefined,this.afterDrawFunc=undefined,this.canvas=new Kinetic.SceneCanvas,this.canvas.getElement().style.position="absolute",this.hitCanvas=new Kinetic.HitCanvas(0,0),Kinetic.Container.call(this,a)},draw:function(){this.beforeDrawFunc!==undefined&&this.beforeDrawFunc.call(this),Kinetic.Container.prototype.draw.call(this),this.afterDrawFunc!==undefined&&this.afterDrawFunc.call(this)},drawHit:function(){this.hitCanvas.clear(),Kinetic.Container.prototype.drawHit.call(this)},drawScene:function(a){a=a||this.getCanvas(),this.attrs.clearBeforeDraw&&a.clear(),Kinetic.Container.prototype.drawScene.call(this,a)},beforeDraw:function(a){this.beforeDrawFunc=a},afterDraw:function(a){this.afterDrawFunc=a},getCanvas:function(){return this.canvas},getContext:function(){return this.canvas.context},clear:function(){this.getCanvas().clear()},setVisible:function(a){Kinetic.Node.prototype.setVisible.call(this,a),a?(this.canvas.element.style.display="block",this.hitCanvas.element.style.display="block"):(this.canvas.element.style.display="none",this.hitCanvas.element.style.display="none")},setZIndex:function(a){Kinetic.Node.prototype.setZIndex.call(this,a);var b=this.getStage();b&&(b.content.removeChild(this.canvas.element),a<b.getChildren().length-1?b.content.insertBefore(this.canvas.element,b.getChildren()[a+1].canvas.element):b.content.appendChild(this.canvas.element))},moveToTop:function(){Kinetic.Node.prototype.moveToTop.call(this);var a=this.getStage();a&&(a.content.removeChild(this.canvas.element),a.content.appendChild(this.canvas.element))},moveUp:function(){if(Kinetic.Node.prototype.moveUp.call(this)){var a=this.getStage();a&&(a.content.removeChild(this.canvas.element),this.index<a.getChildren().length-1?a.content.insertBefore(this.canvas.element,a.getChildren()[this.index+1].canvas.element):a.content.appendChild(this.canvas.element))}},moveDown:function(){if(Kinetic.Node.prototype.moveDown.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.canvas.element),a.content.insertBefore(this.canvas.element,b[this.index+1].canvas.element)}}},moveToBottom:function(){if(Kinetic.Node.prototype.moveToBottom.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.canvas.element),a.content.insertBefore(this.canvas.element,b[1].canvas.element)}}},getLayer:function(){return this},remove:function(){var a=this.getStage();Kinetic.Node.prototype.remove.call(this);try{a.content.removeChild(this.canvas.element)}catch(b){Kinetic.Global.warn("unable to remove layer scene canvas element from the document")}}},Kinetic.Global.extend(Kinetic.Layer,Kinetic.Container),Kinetic.Node.addGettersSetters(Kinetic.Layer,["clearBeforeDraw"])})();
(function(){Kinetic.Group=function(a){this._initGroup(a)},Kinetic.Group.prototype={_initGroup:function(a){this.nodeType="Group",Kinetic.Container.call(this,a)}},Kinetic.Global.extend(Kinetic.Group,Kinetic.Container)})();
(function(){Kinetic.Shape=function(a){this._initShape(a)},Kinetic.Shape.prototype={_initShape:function(a){this.nodeType="Shape";var b=Kinetic.Global.shapes,c;for(;;){c=Kinetic.Type._getRandomColorKey();if(c&&!(c in b))break}this.colorKey=c,b[c]=this,Kinetic.Node.call(this,a)},getContext:function(){return this.getLayer().getContext()},getCanvas:function(){return this.getLayer().getCanvas()},_getFillType:function(a){var b=Kinetic.Type;return a?b._isString(a)?"COLOR":a.image?"PATTERN":a.start&&a.end&&!a.start.radius&&!a.end.radius?"LINEAR_GRADIENT":a.start&&a.end&&b._isNumber(a.start.radius)&&b._isNumber(a.end.radius)?"RADIAL_GRADIENT":"UNKNOWN":undefined},setShadow:function(a){var b=Kinetic.Type;a.offset!==undefined&&(a.offset=b._getXY(a.offset)),this.setAttr("shadow",b._merge(a,this.getShadow()))},setFill:function(a){var b=Kinetic.Type,c=this.getFill(),d=this._getFillType(a),e=this._getFillType(c),f=d==="COLOR"||e==="COLOR",g=d===e||d==="UNKNOWN";a.offset!==undefined&&(a.offset=b._getXY(a.offset)),a.scale!==undefined&&(a.scale=b._getXY(a.scale)),a.rotationDeg!==undefined&&(a.rotation=b._degToRad(a.rotationDeg)),!f&&g&&(a=b._merge(a,c)),this.setAttr("fill",a)},setSize:function(){var a=Kinetic.Type._getSize(Array.prototype.slice.call(arguments));this.setWidth(a.width),this.setHeight(a.height)},getSize:function(){return{width:this.getWidth(),height:this.getHeight()}},_get:function(a){return this.nodeType===a||this.shapeType===a?[this]:[]},intersects:function(){var a=Kinetic.Type._getXY(Array.prototype.slice.call(arguments)),b=this.getStage(),c=b.hitCanvas;c.clear(),this.drawScene(c);var d=c.context.getImageData(Math.round(a.x),Math.round(a.y),1,1).data;return d[3]>0},remove:function(){Kinetic.Node.prototype.remove.call(this),delete Kinetic.Global.shapes[this.colorKey]},drawScene:function(a){var b=this.attrs,c=b.drawFunc,a=a||this.getLayer().getCanvas(),d=a.getContext();if(c&&this.isVisible()){var e=this.getStage(),f=[],g=this.parent;f.unshift(this);while(g)f.unshift(g),g=g.parent;d.save(),a._handlePixelRatio(),a._applyOpacity(this),a._applyLineJoin(this);var h=f.length;for(var i=0;i<h;i++){var j=f[i],k=j.getTransform(),l=k.getMatrix();d.transform(l[0],l[1],l[2],l[3],l[4],l[5])}c.call(this,a),d.restore()}},drawHit:function(){var a=this.attrs,b=a.drawHitFunc||a.drawFunc,c=this.getLayer().hitCanvas,d=c.getContext();if(b&&this.isVisible()&&this.isListening()){var e=this.getStage(),f=[],g=this.parent;f.unshift(this);while(g)f.unshift(g),g=g.parent;d.save(),c._applyLineJoin(this);var h=f.length;for(var i=0;i<h;i++){var j=f[i],k=j.getTransform(),l=k.getMatrix();d.transform(l[0],l[1],l[2],l[3],l[4],l[5])}b.call(this,c),d.restore()}},_setDrawFuncs:function(){!this.attrs.drawFunc&&this.drawFunc&&this.setDrawFunc(this.drawFunc),!this.attrs.drawHitFunc&&this.drawHitFunc&&this.setDrawHitFunc(this.drawHitFunc)}},Kinetic.Global.extend(Kinetic.Shape,Kinetic.Node),Kinetic.Node.addGettersSetters(Kinetic.Shape,["stroke","lineJoin","lineCap","strokeWidth","drawFunc","drawHitFunc","cornerRadius","dashArray"]),Kinetic.Node.addGetters(Kinetic.Shape,["shadow","fill"])})();
(function(){Kinetic.Circle=function(a){this._initCircle(a)},Kinetic.Circle.prototype={_initCircle:function(a){this.setDefaultAttrs({radius:0}),this.shapeType="Circle",Kinetic.Shape.call(this,a),this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext();b.beginPath(),b.arc(0,0,this.getRadius(),0,Math.PI*2,!0),b.closePath(),a.fillStroke(this)},getWidth:function(){return this.getRadius()*2},getHeight:function(){return this.getRadius()*2},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius(a/2)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius(a/2)}},Kinetic.Global.extend(Kinetic.Circle,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Circle,["radius"])})();

