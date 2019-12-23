(function(b,a){a("kendo.mobile.scroller",["kendo.fx","kendo.draganddrop"],b);
}(function(){var a={id:"mobile.scroller",name:"Scroller",category:"mobile",description:"The Kendo Mobile Scroller widget enables touch friendly kinetic scrolling for the contents of a given DOM element.",depends:["fx","draganddrop"]};
(function(b,G){var m=window.kendo,o=m.mobile,l=m.effects,F=o.ui,u=b.proxy,j=b.extend,I=F.Widget,h=m.Class,q=m.ui.Movable,s=m.ui.Pane,t=m.ui.PaneDimensions,E=l.Transition,f=l.Animation,c=Math.abs,D=500,B=0.7,k=0.96,H=10,n=55,r=0.5,d=5,x="km-scroller-release",w="km-scroller-refresh",v="pull",g="change",y="resize",z="scroll",p=2;
var J=f.extend({init:function(K){var L=this;
f.fn.init.call(L);
j(L,K);
L.userEvents.bind("gestureend",u(L.start,L));
L.tapCapture.bind("press",u(L.cancel,L));
},enabled:function(){return this.movable.scale<this.dimensions.minScale;
},done:function(){return this.dimensions.minScale-this.movable.scale<0.01;
},tick:function(){var K=this.movable;
K.scaleWith(1.1);
this.dimensions.rescale(K.scale);
},onEnd:function(){var K=this.movable;
K.scaleTo(this.dimensions.minScale);
this.dimensions.rescale(K.scale);
}});
var i=f.extend({init:function(K){var L=this;
f.fn.init.call(L);
j(L,K,{transition:new E({axis:K.axis,movable:K.movable,onEnd:function(){L._end();
}})});
L.tapCapture.bind("press",function(){L.cancel();
});
L.userEvents.bind("end",u(L.start,L));
L.userEvents.bind("gestureend",u(L.start,L));
L.userEvents.bind("tap",u(L.onEnd,L));
},onCancel:function(){this.transition.cancel();
},freeze:function(K){var L=this;
L.cancel();
L._moveTo(K);
},onEnd:function(){var K=this;
if(K.paneAxis.outOfBounds()){K._snapBack();
}else{K._end();
}},done:function(){return c(this.velocity)<1;
},start:function(K){var L=this,M;
if(!L.dimension.enabled){return;
}if(L.paneAxis.outOfBounds()){L._snapBack();
}else{M=K.touch.id===p?0:K.touch[L.axis].velocity;
L.velocity=Math.max(Math.min(M*L.velocityMultiplier,n),-n);
L.tapCapture.captureNext();
f.fn.start.call(L);
}},tick:function(){var O=this,L=O.dimension,M=O.paneAxis.outOfBounds()?r:O.friction,K=O.velocity*=M,N=O.movable[O.axis]+K;
if(!O.elastic&&L.outOfBounds(N)){N=Math.max(Math.min(N,L.max),L.min);
O.velocity=0;
}O.movable.moveAxis(O.axis,N);
},_end:function(){this.tapCapture.cancelCapture();
this.end();
},_snapBack:function(){var M=this,K=M.dimension,L=M.movable[M.axis]>K.max?K.max:K.min;
M._moveTo(L);
},_moveTo:function(K){this.transition.moveTo({location:K,duration:D,ease:E.easeOutExpo});
}});
var e=f.extend({init:function(K){var L=this;
m.effects.Animation.fn.init.call(this);
j(L,K,{origin:{},destination:{},offset:{}});
},tick:function(){this._updateCoordinates();
this.moveTo(this.origin);
},done:function(){return c(this.offset.y)<d&&c(this.offset.x)<d;
},onEnd:function(){this.moveTo(this.destination);
if(this.callback){this.callback.call();
}},setCoordinates:function(K,L){this.offset={};
this.origin=K;
this.destination=L;
},setCallback:function(K){if(K&&m.isFunction(K)){this.callback=K;
}else{K=G;
}},_updateCoordinates:function(){this.offset={x:(this.destination.x-this.origin.x)/4,y:(this.destination.y-this.origin.y)/4};
this.origin={y:this.origin.y+this.offset.y,x:this.origin.x+this.offset.x};
}});
var A=h.extend({init:function(M){var N=this,L=M.axis==="x",K=b('<div class="km-touch-scrollbar km-'+(L?"horizontal":"vertical")+'-scrollbar" />');
j(N,M,{element:K,elementSize:0,movable:new q(K),scrollMovable:M.movable,alwaysVisible:M.alwaysVisible,size:L?"width":"height"});
N.scrollMovable.bind(g,u(N.refresh,N));
N.container.append(K);
if(M.alwaysVisible){N.show();
}},refresh:function(){var R=this,K=R.axis,L=R.dimension,M=L.size,O=R.scrollMovable,Q=M/L.total,N=Math.round(-O[K]*Q),P=Math.round(M*Q);
if(Q>=1){this.element.css("display","none");
}else{this.element.css("display","");
}if(N+P>M){P=M-N;
}else{if(N<0){P+=N;
N=0;
}}if(R.elementSize!=P){R.element.css(R.size,P+"px");
R.elementSize=P;
}R.movable.moveAxis(K,N);
},show:function(){this.element.css({opacity:B,visibility:"visible"});
},hide:function(){if(!this.alwaysVisible){this.element.css({opacity:0});
}}});
var C=I.extend({init:function(N,Q){var T=this;
I.fn.init.call(T,N,Q);
N=T.element;
T._native=T.options.useNative&&m.support.hasNativeScrolling;
if(T._native){N.addClass("km-native-scroller").prepend('<div class="km-scroll-header"/>');
j(T,{scrollElement:N,fixedContainer:N.children().first()});
return;
}N.css("overflow","hidden").addClass("km-scroll-wrapper").wrapInner('<div class="km-scroll-container"/>').prepend('<div class="km-scroll-header"/>');
var O=N.children().eq(1),S=new m.TapCapture(N),P=new q(O),M=new t({element:O,container:N,forcedEnabled:T.options.zoom}),L=this.options.avoidScrolling,U=new m.UserEvents(N,{touchAction:"pan-y",fastTap:true,allowSelection:true,preventDragEvent:true,captureUpIfMoved:true,multiTouch:T.options.zoom,start:function(W){M.refresh();
var Z=c(W.x.velocity),aa=c(W.y.velocity),X=Z*2>=aa,Y=b.contains(T.fixedContainer[0],W.event.target),ab=aa*2>=Z;
if(!Y&&!L(W)&&T.enabled&&(M.x.enabled&&X||M.y.enabled&&ab)){U.capture();
}else{U.cancel();
}}}),R=new s({movable:P,dimensions:M,userEvents:U,elastic:T.options.elastic}),V=new J({movable:P,dimensions:M,userEvents:U,tapCapture:S}),K=new e({moveTo:function(W){T.scrollTo(W.x,W.y);
}});
P.bind(g,function(){T.scrollTop=-P.y;
T.scrollLeft=-P.x;
T.trigger(z,{scrollTop:T.scrollTop,scrollLeft:T.scrollLeft});
});
if(T.options.mousewheelScrolling){N.on("DOMMouseScroll mousewheel",u(this,"_wheelScroll"));
}j(T,{movable:P,dimensions:M,zoomSnapBack:V,animatedScroller:K,userEvents:U,pane:R,tapCapture:S,pulled:false,enabled:true,scrollElement:O,scrollTop:0,scrollLeft:0,fixedContainer:N.children().first()});
T._initAxis("x");
T._initAxis("y");
T._wheelEnd=function(){T._wheel=false;
T.userEvents.end(0,T._wheelY);
};
M.refresh();
if(T.options.pullToRefresh){T._initPullToRefresh();
}},_wheelScroll:function(L){if(!this._wheel){this._wheel=true;
this._wheelY=0;
this.userEvents.press(0,this._wheelY);
}clearTimeout(this._wheelTimeout);
this._wheelTimeout=setTimeout(this._wheelEnd,50);
var K=m.wheelDeltaY(L);
if(K){this._wheelY+=K;
this.userEvents.move(0,this._wheelY);
}L.preventDefault();
},makeVirtual:function(){this.dimensions.y.makeVirtual();
},virtualSize:function(L,K){this.dimensions.y.virtualSize(L,K);
},height:function(){return this.dimensions.y.size;
},scrollHeight:function(){return this.scrollElement[0].scrollHeight;
},scrollWidth:function(){return this.scrollElement[0].scrollWidth;
},options:{name:"Scroller",zoom:false,pullOffset:140,visibleScrollHints:false,elastic:true,useNative:false,mousewheelScrolling:true,avoidScrolling:function(){return false;
},pullToRefresh:false,messages:{pullTemplate:"Pull to refresh",releaseTemplate:"Release to refresh",refreshTemplate:"Refreshing"}},events:[v,z,y],_resize:function(){if(!this._native){this.contentResized();
}},setOptions:function(K){var L=this;
I.fn.setOptions.call(L,K);
if(K.pullToRefresh){L._initPullToRefresh();
}},reset:function(){if(this._native){this.scrollElement.scrollTop(0);
}else{this.movable.moveTo({x:0,y:0});
this._scale(1);
}},contentResized:function(){this.dimensions.refresh();
if(this.pane.x.outOfBounds()){this.movable.moveAxis("x",this.dimensions.x.min);
}if(this.pane.y.outOfBounds()){this.movable.moveAxis("y",this.dimensions.y.min);
}},zoomOut:function(){var K=this.dimensions;
K.refresh();
this._scale(K.fitScale);
this.movable.moveTo(K.centerCoordinates());
},enable:function(){this.enabled=true;
},disable:function(){this.enabled=false;
},scrollTo:function(K,L){if(this._native){this.scrollElement.scrollLeft(c(K));
this.scrollElement.scrollTop(c(L));
}else{this.dimensions.refresh();
this.movable.moveTo({x:K,y:L});
}},animatedScrollTo:function(N,O,K){var L,M;
if(this._native){this.scrollTo(N,O);
}else{L={x:this.movable.x,y:this.movable.y};
M={x:N,y:O};
this.animatedScroller.setCoordinates(L,M);
this.animatedScroller.setCallback(K);
this.animatedScroller.start();
}},pullHandled:function(){var K=this;
K.refreshHint.removeClass(w);
K.hintContainer.html(K.pullTemplate({}));
K.yinertia.onEnd();
K.xinertia.onEnd();
K.userEvents.cancel();
},destroy:function(){I.fn.destroy.call(this);
if(this.userEvents){this.userEvents.destroy();
}},_scale:function(K){this.dimensions.rescale(K);
this.movable.scaleTo(K);
},_initPullToRefresh:function(){var K=this;
K.dimensions.y.forceEnabled();
K.pullTemplate=m.template(K.options.messages.pullTemplate);
K.releaseTemplate=m.template(K.options.messages.releaseTemplate);
K.refreshTemplate=m.template(K.options.messages.refreshTemplate);
K.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-loading-left"></span><span class="km-loading-right"></span><span class="km-template">'+K.pullTemplate({})+"</span></span>");
K.refreshHint=K.scrollElement.children().first();
K.hintContainer=K.refreshHint.children(".km-template");
K.pane.y.bind("change",u(K._paneChange,K));
K.userEvents.bind("end",u(K._dragEnd,K));
},_dragEnd:function(){var K=this;
if(!K.pulled){return;
}K.pulled=false;
K.refreshHint.removeClass(x).addClass(w);
K.hintContainer.html(K.refreshTemplate({}));
K.yinertia.freeze(K.options.pullOffset/2);
K.trigger("pull");
},_paneChange:function(){var K=this;
if(K.movable.y/r>K.options.pullOffset){if(!K.pulled){K.pulled=true;
K.refreshHint.removeClass(w).addClass(x);
K.hintContainer.html(K.releaseTemplate({}));
}}else{if(K.pulled){K.pulled=false;
K.refreshHint.removeClass(x);
K.hintContainer.html(K.pullTemplate({}));
}}},_initAxis:function(K){var Q=this,M=Q.movable,L=Q.dimensions[K],P=Q.tapCapture,N=Q.pane[K],O=new A({axis:K,movable:M,dimension:L,container:Q.element,alwaysVisible:Q.options.visibleScrollHints});
L.bind(g,function(){O.refresh();
});
N.bind(g,function(){O.show();
});
Q[K+"inertia"]=new i({axis:K,paneAxis:N,movable:M,tapCapture:P,userEvents:Q.userEvents,dimension:L,elastic:Q.options.elastic,friction:Q.options.friction||k,velocityMultiplier:Q.options.velocityMultiplier||H,end:function(){O.hide();
Q.trigger("scrollEnd",{axis:K,scrollTop:Q.scrollTop,scrollLeft:Q.scrollLeft});
}});
}});
F.plugin(C);
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
