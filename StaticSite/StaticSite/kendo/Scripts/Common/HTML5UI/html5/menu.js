(function(b,a){a("kendo.menu",["kendo.popup"],b);
}(function(){var a={id:"menu",name:"Menu",category:"web",description:"The Menu widget displays hierarchical data as a multi-level menu.",depends:["popup"]};
(function(b,am){var D=window.kendo,al=D.ui,d=D._activeElement,aj=D.support.touch&&D.support.mobileOS,O="mousedown",g="click",s=b.extend,Z=b.proxy,p=b.each,af=D.template,F=D.keys,aq=al.Widget,q=/^(ul|a|div)$/i,T=".kendoMenu",B="img",U="open",L="k-menu",I="k-link",G="k-last",h="close",ai="timer",t="k-first",A="k-image",ab="select",ar="zIndex",c="activate",k="deactivate",W="touchstart"+T+" MSPointerDown"+T+" pointerdown"+T,X=D.support.pointers,R=D.support.msPointers,f=R||X,P=X?"pointerover":R?"MSPointerOver":"mouseenter",Q=X?"pointerout":R?"MSPointerOut":"mouseleave",N=aj||f,o=b(document.documentElement),E="kendoPopup",l="k-state-default",z="k-state-hover",u="k-state-focused",n="k-state-disabled",ac="k-state-selected",M=".k-menu",y=".k-menu-group",Y=y+",.k-animation-container",e=":not(.k-list) > .k-item",m=".k-item.k-state-disabled",C=".k-item:not(.k-state-disabled)",J=".k-item:not(.k-state-disabled) > .k-link",r=":not(.k-item.k-separator)",S=r+":eq(0)",H=r+":last",ah="div:not(.k-animation-container,.k-list-container)",ak={"2":1,touch:1},ag={content:af("<div #= contentCssAttributes(item) # tabindex='-1'>#= content(item) #</div>"),group:af("<ul class='#= groupCssClass(group) #'#= groupAttributes(group) # role='menu' aria-hidden='true'>#= renderItems(data) #</ul>"),itemWrapper:af("<#= tag(item) # class='#= textClass(item) #'#= textAttributes(item) #>#= image(data) ##= sprite(item) ##= text(item) ##= arrow(data) #</#= tag(item) #>"),item:af("<li class='#= wrapperCssClass(group, item) #' #= itemCssAttributes(item) # role='menuitem'  #=item.items ? \"aria-haspopup='true'\": \"\"##=item.enabled === false ? \"aria-disabled='true'\" : ''#>#= itemWrapper(data) ## if (item.items) { ##= subGroup({ items: item.items, menu: menu, group: { expanded: item.expanded } }) ## } else if (item.content || item.contentUrl) { ##= renderContent(data) ## } #</li>"),image:af("<img #= imageCssAttributes(item) # alt='' src='#= item.imageUrl #' />"),arrow:af("<span class='#= arrowClass(item, group) #'></span>"),sprite:af("<span class='k-sprite #= spriteCssClass #'></span>"),empty:af("")},aa={wrapperCssClass:function(at,av){var aw="k-item",au=av.index;
if(av.enabled===false){aw+=" k-state-disabled";
}else{aw+=" k-state-default";
}if(at.firstLevel&&au===0){aw+=" k-first";
}if(au==at.length-1){aw+=" k-last";
}if(av.cssClass){aw+=" "+av.cssClass;
}if(av.attr&&av.attr.hasOwnProperty("class")){aw+=" "+av.attr["class"];
}if(av.selected){aw+=" "+ac;
}return aw;
},itemCssAttributes:function(av){var aw="";
var au=av.attr||{};
for(var at in au){if(au.hasOwnProperty(at)&&at!=="class"){aw+=at+'="'+au[at]+'" ';
}}return aw;
},imageCssAttributes:function(av){var aw="";
var au=av.imageAttr||{};
if(!au["class"]){au["class"]=A;
}else{au["class"]+=" "+A;
}for(var at in au){if(au.hasOwnProperty(at)){aw+=at+'="'+au[at]+'" ';
}}return aw;
},contentCssAttributes:function(aw){var ax="";
var au=aw.contentAttr||{};
var av="k-content k-group k-menu-group";
if(!au["class"]){au["class"]=av;
}else{au["class"]+=" "+av;
}for(var at in au){if(au.hasOwnProperty(at)){ax+=at+'="'+au[at]+'" ';
}}return ax;
},textClass:function(){return I;
},textAttributes:function(at){return at.url?" href='"+at.url+"'":"";
},arrowClass:function(au,at){var av="k-icon";
if(at.horizontal){av+=" k-i-arrow-60-down";
}else{av+=" k-i-arrow-60-right";
}return av;
},text:function(at){return at.encoded===false?at.text:D.htmlEncode(at.text);
},tag:function(at){return at.url?"a":"span";
},groupAttributes:function(at){return at.expanded!==true?" style='display:none'":"";
},groupCssClass:function(){return"k-group k-menu-group";
},content:function(at){return at.content?at.content:"&nbsp;";
}};
function w(at,au){at=at.split(" ")[!au+0]||at;
return at.replace("top","up").replace("bottom","down");
}function V(at,ax,av){at=at.split(" ")[!ax+0]||at;
var aw={origin:["bottom",av?"right":"left"],position:["top",av?"right":"left"]},au=/left|right/.test(at);
if(au){aw.origin=["top",at];
aw.position[1]=D.directions[at].reverse;
}else{aw.origin[0]=at;
aw.position[0]=D.directions[at].reverse;
}aw.origin=aw.origin.join(" ");
aw.position=aw.position.join(" ");
return aw;
}function i(av,at){try{return b.contains(av,at);
}catch(au){return false;
}}function ap(at){at=b(at);
at.addClass("k-item").children(B).addClass(A);
at.children("a").addClass(I).children(B).addClass(A);
at.filter(":not([disabled])").addClass(l);
at.filter(".k-separator").empty().append("&nbsp;");
at.filter("li[disabled]").addClass(n).removeAttr("disabled").attr("aria-disabled",true);
if(!at.filter("[role]").length){at.attr("role","menuitem");
}if(!at.children("."+I).length){at.contents().filter(function(){return !this.nodeName.match(q)&&!(this.nodeType==3&&!b.trim(this.nodeValue));
}).wrapAll("<span class='"+I+"'/>");
}an(at);
ao(at);
}function an(at){at=b(at);
at.find("> .k-link > [class*=k-i-arrow]:not(.k-sprite)").remove();
at.filter(":has(.k-menu-group)").children(".k-link:not(:has([class*=k-i-arrow]:not(.k-sprite)))").each(function(){var av=b(this),au=v(av);
av.append("<span class='k-icon "+au+"'/>");
});
}function v(av){var at,aw=av.parent().parent(),au=D.support.isRtl(aw);
if(aw.hasClass(L+"-horizontal")){at=" k-i-arrow-60-down";
}else{if(au){at=" k-i-arrow-60-left";
}else{at=" k-i-arrow-60-right";
}}return at;
}function ao(at){at=b(at);
at.filter(".k-first:not(:first-child)").removeClass(t);
at.filter(".k-last:not(:last-child)").removeClass(G);
at.filter(":first-child").addClass(t);
at.filter(":last-child").addClass(G);
}function ae(at,au){var av=x(au);
if(av){ad(at,av);
}if(au.items){b(at).children("ul").children("li").each(function(aw){ae(this,au.items[aw]);
});
}}function ad(at,au){b(at).children(".k-link").data({selectHandler:au});
}function x(au){var av=au.select,at=D.isFunction;
if(av&&at(av)){return av;
}return null;
}var K=aq.extend({init:function(at,au){var av=this;
aq.fn.init.call(av,at,au);
at=av.wrapper=av.element;
au=av.options;
av._initData(au);
av._updateClasses();
av._animations(au);
av.nextItemZIndex=100;
av._tabindex();
av._focusProxy=Z(av._focusHandler,av);
at.on(W,C,av._focusProxy).on(g+T,m,false).on(g+T,C,Z(av._click,av)).on("keydown"+T,Z(av._keydown,av)).on("focus"+T,Z(av._focus,av)).on("focus"+T,".k-content",Z(av._focus,av)).on(W+" "+O+T,".k-content",Z(av._preventClose,av)).on("blur"+T,Z(av._removeHoverItem,av)).on("blur"+T,"[tabindex]",Z(av._checkActiveElement,av)).on(P+T,C,Z(av._mouseenter,av)).on(Q+T,C,Z(av._mouseleave,av)).on(P+T+" "+Q+T+" "+O+T+" "+g+T,J,Z(av._toggleHover,av));
if(au.openOnClick){av.clicked=false;
av._documentClickHandler=Z(av._documentClick,av);
b(document).click(av._documentClickHandler);
}at.attr("role","menubar");
if(at[0].id){av._ariaId=D.format("{0}_mn_active",at[0].id);
}D.notify(av);
},events:[U,h,c,k,ab],options:{name:"Menu",animation:{open:{duration:200},close:{duration:100}},orientation:"horizontal",direction:"default",openOnClick:false,closeOnClick:true,hoverDelay:100,popupCollision:am},_initData:function(at){var au=this;
if(at.dataSource){au.angular("cleanup",function(){return{elements:au.element.children()};
});
au.element.empty();
au.append(at.dataSource,au.element);
au.angular("compile",function(){return{elements:au.element.children()};
});
}},setOptions:function(au){var at=this.options.animation;
this._animations(au);
au.animation=s(true,at,au.animation);
if("dataSource" in au){this._initData(au);
}this._updateClasses();
aq.fn.setOptions.call(this,au);
},destroy:function(){var at=this;
aq.fn.destroy.call(at);
at.element.off(T);
if(at._documentClickHandler){b(document).unbind("click",at._documentClickHandler);
}D.destroy(at.element);
},enable:function(at,au){this._toggleDisabled(at,au!==false);
return this;
},disable:function(at){this._toggleDisabled(at,false);
return this;
},append:function(au,av){av=this.element.find(av);
var at=this._insert(au,av,av.length?av.find("> .k-menu-group, > .k-animation-container > .k-menu-group"):null);
p(at.items,function(aw){at.group.append(this);
an(this);
ae(this,au[aw]||au);
});
an(av);
ao(at.group.find(".k-first, .k-last").add(at.items));
return this;
},insertBefore:function(au,av){av=this.element.find(av);
var at=this._insert(au,av,av.parent());
p(at.items,function(aw){av.before(this);
an(this);
ao(this);
ae(this,au[aw]||au);
});
ao(av);
return this;
},insertAfter:function(au,av){av=this.element.find(av);
var at=this._insert(au,av,av.parent());
p(at.items,function(aw){av.after(this);
an(this);
ao(this);
ae(this,au[aw]||au);
});
ao(av);
return this;
},_insert:function(av,az,ax){var aA=this,aw,au;
if(!az||!az.length){ax=aA.element;
}var ay=b.isPlainObject(av),at={firstLevel:ax.hasClass(L),horizontal:ax.hasClass(L+"-horizontal"),expanded:true,length:ax.children().length};
if(az&&!ax.length){ax=b(K.renderGroup({group:at})).appendTo(az);
}if(ay||b.isArray(av)){aw=b(b.map(ay?[av]:av,function(aC,aB){if(typeof aC==="string"){return b(aC).get();
}else{return b(K.renderItem({group:at,item:s(aC,{index:aB})})).get();
}}));
}else{if(typeof av=="string"&&av.charAt(0)!="<"){aw=aA.element.find(av);
}else{aw=b(av);
}au=aw.find("> ul").addClass("k-menu-group").attr("role","menu");
aw=aw.filter("li");
aw.add(au.find("> li")).each(function(){ap(this);
});
}return{items:aw,group:ax};
},remove:function(au){au=this.element.find(au);
var ax=this,aw=au.parentsUntil(ax.element,e),av=au.parent("ul:not(.k-menu)");
au.remove();
if(av&&!av.children(e).length){var at=av.parent(".k-animation-container");
if(at.length){at.remove();
}else{av.remove();
}}if(aw.length){aw=aw.eq(0);
an(aw);
ao(aw);
}return ax;
},open:function(au){var ay=this,ax=ay.options,av=ax.orientation=="horizontal",at=ax.direction,aw=D.support.isRtl(ay.wrapper);
au=ay.element.find(au);
if(/^(top|bottom|default)$/.test(at)){if(aw){at=av?(at+" left").replace("default","bottom"):"left";
}else{at=av?(at+" right").replace("default","bottom"):"right";
}}au.siblings().find(">.k-popup:visible,>.k-animation-container>.k-popup:visible").each(function(){var az=b(this).data("kendoPopup");
if(az){az.close(true);
}});
au.each(function(){var az=b(this);
clearTimeout(az.data(ai));
az.data(ai,setTimeout(function(){var aH=az.find(".k-menu-group:first:hidden"),aE;
if(aH[0]&&ay._triggerEvent({item:az[0],type:U})===false){if(!aH.find(".k-menu-group")[0]&&aH.children(".k-item").length>1){var aI=b(window).height(),aG=function(){aH.css({maxHeight:aI-(D._outerHeight(aH)-aH.height())-D.getShadows(aH).bottom,overflow:"auto"});
};
if(D.support.browser.msie&&D.support.browser.version<=7){setTimeout(aG,0);
}else{aG();
}}else{aH.css({maxHeight:"",overflow:""});
}az.data(ar,az.css(ar));
az.css(ar,ay.nextItemZIndex++);
aE=aH.data(E);
var aF=az.parent().hasClass(L),aD=aF&&av,aA=V(at,aF,aw),aB=ax.animation.open.effects,aC=aB!==am?aB:"slideIn:"+w(at,aF);
if(!aE){aE=aH.kendoPopup({activate:function(){ay._triggerEvent({item:this.wrapper.parent(),type:c});
},deactivate:function(aJ){aJ.sender.element.removeData("targetTransform").css({opacity:""});
ay._triggerEvent({item:this.wrapper.parent(),type:k});
},origin:aA.origin,position:aA.position,collision:ax.popupCollision!==am?ax.popupCollision:aD?"fit":"fit flip",anchor:az,appendTo:az,animation:{open:s(true,{effects:aC},ax.animation.open),close:ax.animation.close},close:function(aJ){var aK=aJ.sender.wrapper.parent();
if(!ay._triggerEvent({item:aK[0],type:h})){aK.css(ar,aK.data(ar));
aK.removeData(ar);
if(aj){aK.removeClass(z);
ay._removeHoverItem();
}}else{aJ.preventDefault();
}}}).data(E);
}else{aE=aH.data(E);
aE.options.origin=aA.origin;
aE.options.position=aA.position;
aE.options.animation.open.effects=aC;
}aH.removeAttr("aria-hidden");
aE.open();
}},ay.options.hoverDelay));
});
return ay;
},close:function(av,at){var aw=this,au=aw.element;
av=au.find(av);
if(!av.length){av=au.find(">.k-item");
}av.each(function(){var ax=b(this);
if(!at&&aw._isRootItem(ax)){aw.clicked=false;
}clearTimeout(ax.data(ai));
ax.data(ai,setTimeout(function(){var ay=ax.find(".k-menu-group:not(.k-list-container):not(.k-calendar-container):first:visible").data(E);
if(ay){ay.close();
ay.element.attr("aria-hidden",true);
}},aw.options.hoverDelay));
});
return aw;
},_toggleDisabled:function(au,at){this.element.find(au).each(function(){b(this).toggleClass(l,at).toggleClass(n,!at).attr("aria-disabled",!at);
});
},_toggleHover:function(at){var av=b(D.eventTarget(at)||at.target).closest(e),au=at.type==P||O.indexOf(at.type)!==-1;
if(!av.parents("li."+n).length){av.toggleClass(z,au||at.type=="mousedown"||at.type=="click");
}this._removeHoverItem();
},_preventClose:function(){if(!this.options.closeOnClick){this._closurePrevented=true;
}},_checkActiveElement:function(at){var aw=this,au=b(at?at.currentTarget:this._hoverItem()),av=aw._findRootParent(au)[0];
if(!this._closurePrevented){setTimeout(function(){if(!document.hasFocus()||!i(av,D._activeElement())&&at&&!i(av,at.currentTarget)){aw.close(av);
}},0);
}this._closurePrevented=false;
},_removeHoverItem:function(){var at=this._hoverItem();
if(at&&at.hasClass(u)){at.removeClass(u);
this._oldHoverItem=null;
}},_updateClasses:function(){var at=this.element,av=".k-menu-init div ul",au;
at.removeClass("k-menu-horizontal k-menu-vertical");
at.addClass("k-widget k-reset k-header k-menu-init "+L).addClass(L+"-"+this.options.orientation);
at.find("li > ul").filter(function(){return !D.support.matchesSelector.call(this,av);
}).addClass("k-group k-menu-group").attr("role","menu").attr("aria-hidden",at.is(":visible")).end().find("li > div").addClass("k-content").attr("tabindex","-1");
au=at.find("> li,.k-menu-group > li");
at.removeClass("k-menu-init");
au.each(function(){ap(this);
});
},_mouseenter:function(at){var aw=this,au=b(at.currentTarget),av=au.children(".k-animation-container").length||au.children(y).length;
if(at.delegateTarget!=au.parents(M)[0]){return;
}if((!aw.options.openOnClick||aw.clicked)&&!aj&&!((X||R)&&at.originalEvent.pointerType in ak&&aw._isRootItem(au.closest(e)))){if(!i(at.currentTarget,at.relatedTarget)&&av){aw.open(au);
}}if(aw.options.openOnClick&&aw.clicked||N){au.siblings().each(Z(function(ax,ay){aw.close(ay,true);
},aw));
}},_mouseleave:function(at){var aw=this,au=b(at.currentTarget),av=au.children(".k-animation-container").length||au.children(y).length;
if(au.parentsUntil(".k-animation-container",".k-list-container,.k-calendar-container")[0]){at.stopImmediatePropagation();
return;
}if(!aw.options.openOnClick&&!aj&&!((X||R)&&at.originalEvent.pointerType in ak)&&!i(at.currentTarget,at.relatedTarget||at.target)&&av&&!i(at.currentTarget,D._activeElement())){aw.close(au);
}},_click:function(av){var aM=this,aF,aG=aM.options,aJ=b(D.eventTarget(av)),aK=aJ[0],aE=aJ[0]?aJ[0].nodeName.toUpperCase():"",ax=aE=="INPUT"||aE=="SELECT"||aE=="BUTTON"||aE=="LABEL",aD=aJ.closest("."+I),aw=aJ.closest(e),aC=aw[0],ay=aD.attr("href"),at,au,aL=aJ.attr("href"),aH=b("<a href='#' />").attr("href"),az=!!ay&&ay!==aH,aA=az&&!!ay.match(/^#/),aB=!!aL&&aL!==aH,aI=aG.openOnClick&&au&&aM._isRootItem(aw);
while(aK&&aK.parentNode!=aC){aK=aK.parentNode;
}if(b(aK).is(ah)){return;
}if(aw.hasClass(n)){av.preventDefault();
return;
}if(!av.handled&&aM._triggerSelect(aJ,aC)&&!ax){av.preventDefault();
}av.handled=true;
at=aw.children(Y);
au=at.is(":visible");
if(aG.closeOnClick&&(!az||aA)&&(!at.length||aI)){aw.removeClass(z).css("height");
aM._oldHoverItem=aM._findRootParent(aw);
aM.close(aD.parentsUntil(aM.element,e));
aM.clicked=false;
if("MSPointerUp".indexOf(av.type)!=-1){av.preventDefault();
}return;
}if(az&&av.enterKey){aD[0].click();
}if((!aM._isRootItem(aw)||!aG.openOnClick)&&!D.support.touch&&!((X||R)&&aM._isRootItem(aw.closest(e)))){return;
}if(!az&&!ax&&!aB){av.preventDefault();
}aM.clicked=true;
aF=at.is(":visible")?h:U;
if(!aG.closeOnClick&&aF==h){return;
}aM[aF](aw);
},_triggerSelect:function(ay,av){var ax=ay.data("selectHandler"),aw;
if(ax){aw=this._getEventData(ay);
ax.call(this,aw);
}var au=aw&&aw.isDefaultPrevented();
var at=this._triggerEvent({item:av,type:ab});
return au||at;
},_getEventData:function(au){var at={sender:this,target:au,_defaultPrevented:false,preventDefault:function(){this._defaultPrevented=true;
},isDefaultPrevented:function(){return this._defaultPrevented;
}};
return at;
},_documentClick:function(at){if(i(this.element[0],at.target)){return;
}this.clicked=false;
},_focus:function(au){var ax=this,aw=au.target,av=ax._hoverItem(),at=d();
if(aw!=ax.wrapper[0]&&!b(aw).is(":kendoFocusable")){au.stopPropagation();
b(aw).closest(".k-content").closest(".k-menu-group").closest(".k-item").addClass(u);
ax.wrapper.focus();
return;
}if(at===au.currentTarget){if(av.length){ax._moveHover([],av);
}else{if(!ax._oldHoverItem){ax._moveHover([],ax.wrapper.children().first());
}}}},_keydown:function(au){var aA=this,ay=au.keyCode,aw=aA._oldHoverItem,az,at,av,ax=D.support.isRtl(aA.wrapper);
if(au.target!=au.currentTarget&&ay!=F.ESC){return;
}if(!aw){aw=aA._oldHoverItem=aA._hoverItem();
}at=aA._itemBelongsToVertival(aw);
av=aA._itemHasChildren(aw);
if(ay==F.RIGHT){az=aA[ax?"_itemLeft":"_itemRight"](aw,at,av);
}else{if(ay==F.LEFT){az=aA[ax?"_itemRight":"_itemLeft"](aw,at,av);
}else{if(ay==F.DOWN){az=aA._itemDown(aw,at,av);
}else{if(ay==F.UP){az=aA._itemUp(aw,at,av);
}else{if(ay==F.ESC){az=aA._itemEsc(aw,at);
}else{if(ay==F.ENTER||ay==F.SPACEBAR){az=aw.children(".k-link");
if(az.length>0){aA._click({target:az[0],preventDefault:function(){},enterKey:true});
aA._moveHover(aw,aA._findRootParent(aw));
}}else{if(ay==F.TAB){az=aA._findRootParent(aw);
aA._moveHover(aw,az);
aA._checkActiveElement();
return;
}}}}}}}if(az&&az[0]){au.preventDefault();
au.stopPropagation();
}},_hoverItem:function(){return this.wrapper.find(".k-item.k-state-hover,.k-item.k-state-focused").filter(":visible");
},_itemBelongsToVertival:function(at){var au=this.wrapper.hasClass("k-menu-vertical");
if(!at.length){return au;
}return at.parent().hasClass("k-menu-group")||au;
},_itemHasChildren:function(at){if(!at.length){return false;
}return at.children("ul.k-menu-group, div.k-animation-container").length>0;
},_moveHover:function(au,av){var aw=this,at=aw._ariaId;
if(au.length&&av.length){au.removeClass(u);
}if(av.length){if(av[0].id){at=av[0].id;
}av.addClass(u);
aw._oldHoverItem=av;
if(at){aw.element.removeAttr("aria-activedescendant");
b("#"+at).removeAttr("id");
av.attr("id",at);
aw.element.attr("aria-activedescendant",at);
}}},_findRootParent:function(at){if(this._isRootItem(at)){return at;
}else{return at.parentsUntil(M,"li.k-item").last();
}},_isRootItem:function(at){return at.parent().hasClass(L);
},_itemRight:function(av,at,au){var ay=this,aw,ax;
if(av.hasClass(n)){return;
}if(!at){aw=av.nextAll(S);
if(!aw.length){aw=av.prevAll(H);
}}else{if(au){ay.open(av);
aw=av.find(".k-menu-group").children().first();
}else{if(ay.options.orientation=="horizontal"){ax=ay._findRootParent(av);
ay.close(ax);
aw=ax.nextAll(S);
}}}if(aw&&!aw.length){aw=ay.wrapper.children(".k-item").first();
}else{if(!aw){aw=[];
}}ay._moveHover(av,aw);
return aw;
},_itemLeft:function(au,at){var aw=this,av;
if(!at){av=au.prevAll(S);
if(!av.length){av=au.nextAll(H);
}}else{av=au.parent().closest(".k-item");
aw.close(av);
if(aw._isRootItem(av)&&aw.options.orientation=="horizontal"){av=av.prevAll(S);
}}if(!av.length){av=aw.wrapper.children(".k-item").last();
}aw._moveHover(au,av);
return av;
},_itemDown:function(av,at,au){var ax=this,aw;
if(!at){if(!au||av.hasClass(n)){return;
}else{ax.open(av);
aw=av.find(".k-menu-group").children().first();
}}else{aw=av.nextAll(S);
}if(!aw.length&&av.length){aw=av.parent().children().first();
}else{if(!av.length){aw=ax.wrapper.children(".k-item").first();
}}ax._moveHover(av,aw);
return aw;
},_itemUp:function(au,at){var aw=this,av;
if(!at){return;
}else{av=au.prevAll(S);
}if(!av.length&&au.length){av=au.parent().children().last();
}else{if(!au.length){av=aw.wrapper.children(".k-item").last();
}}aw._moveHover(au,av);
return av;
},_itemEsc:function(au,at){var aw=this,av;
if(!at){return au;
}else{av=au.parent().closest(".k-item");
aw.close(av);
aw._moveHover(au,av);
}return av;
},_triggerEvent:function(at){var au=this;
return au.trigger(at.type,{type:at.type,item:at.item});
},_focusHandler:function(at){var av=this,au=b(D.eventTarget(at)).closest(e);
if(au.hasClass(n)){return;
}setTimeout(function(){av._moveHover([],au);
if(au.children(".k-content")[0]){au.parent().closest(".k-item").removeClass(u);
}},200);
},_animations:function(at){if(at&&"animation" in at&&!at.animation){at.animation={open:{effects:{}},close:{hide:true,effects:{}}};
}}});
s(K,{renderItem:function(av){av=s({menu:{},group:{}},av);
var at=ag.empty,au=av.item;
return ag.item(s(av,{image:au.imageUrl?ag.image:at,sprite:au.spriteCssClass?ag.sprite:at,itemWrapper:ag.itemWrapper,renderContent:K.renderContent,arrow:au.items||au.content?ag.arrow:at,subGroup:K.renderGroup},aa));
},renderGroup:function(at){return ag.group(s({renderItems:function(az){var av="",aw=0,ax=az.items,ay=ax?ax.length:0,au=s({length:ay},az.group);
for(;
aw<ay;
aw++){av+=K.renderItem(s(az,{group:au,item:s({index:aw},ax[aw])}));
}return av;
}},at,aa));
},renderContent:function(at){return ag.content(s(at,aa));
}});
var j=K.extend({init:function(at,au){var av=this;
K.fn.init.call(av,at,au);
av._marker=D.guid().substring(0,8);
av.target=b(av.options.target);
av._popup();
av._wire();
},options:{name:"ContextMenu",filter:null,showOn:"contextmenu",orientation:"vertical",alignToAnchor:false,target:"body"},events:[U,h,c,k,ab],setOptions:function(at){var au=this;
K.fn.setOptions.call(au,at);
au.target.off(au.showOn+T+au._marker,au._showProxy);
if(au.userEvents){au.userEvents.destroy();
}au.target=b(au.options.target);
if(at.orientation&&au.popup.wrapper[0]){au.popup.element.unwrap();
}au._wire();
K.fn.setOptions.call(this,at);
},destroy:function(){var at=this;
at.target.off(at.options.showOn+T+at._marker);
o.off(D.support.mousedown+T+at._marker,at._closeProxy);
if(at.userEvents){at.userEvents.destroy();
}K.fn.destroy.call(at);
},open:function(au,av){var at=this;
au=b(au)[0];
if(i(at.element[0],b(au)[0])){K.fn.open.call(at,au);
}else{if(at._triggerEvent({item:at.element,type:U})===false){if(at.popup.visible()&&at.options.filter){at.popup.close(true);
at.popup.element.kendoStop(true);
}if(av!==am){at.popup.wrapper.hide();
at.popup.open(au,av);
}else{at.popup.options.anchor=(au?au:at.popup.anchor)||at.target;
at.popup.element.kendoStop(true);
at.popup.open();
}o.off(at.popup.downEvent,at.popup._mousedownProxy);
o.on(D.support.mousedown+T+at._marker,at._closeProxy);
}}return at;
},close:function(){var at=this;
if(i(at.element[0],b(arguments[0])[0])){K.fn.close.call(at,arguments[0]);
}else{if(at.popup.visible()){if(at._triggerEvent({item:at.element,type:h})===false){at.popup.close();
o.off(D.support.mousedown+T,at._closeProxy);
at.unbind(ab,at._closeTimeoutProxy);
}}}},_showHandler:function(at){var au=at,av,ax=this,aw=ax.options;
if(at.event){au=at.event;
au.pageX=at.x.location;
au.pageY=at.y.location;
}if(i(ax.element[0],at.relatedTarget||at.target)){return;
}ax._eventOrigin=au;
au.preventDefault();
au.stopImmediatePropagation();
ax.element.find("."+u).removeClass(u);
if(aw.filter&&D.support.matchesSelector.call(au.currentTarget,aw.filter)||!aw.filter){if(aw.alignToAnchor){ax.popup.options.anchor=au.currentTarget;
ax.open(au.currentTarget);
}else{ax.popup.options.anchor=au.currentTarget;
if(ax._targetChild){av=ax.target.offset();
ax.open(au.pageX-av.left,au.pageY-av.top);
}else{ax.open(au.pageX,au.pageY);
}}}},_closeHandler:function(av){var az=this,ay=b(av.relatedTarget||av.target),ax=ay.closest(az.target.selector)[0]==az.target[0],at=ay.closest(C).children(Y),au=i(az.element[0],ay[0]);
az._eventOrigin=av;
var aw=av.which!==3;
if(az.popup.visible()&&(aw&&ax||!ax)&&(az.options.closeOnClick&&!at[0]&&au||!au)){if(au){this.unbind(ab,this._closeTimeoutProxy);
az.bind(ab,az._closeTimeoutProxy);
}else{az.close();
}}},_wire:function(){var av=this,at=av.options,au=av.target;
av._showProxy=Z(av._showHandler,av);
av._closeProxy=Z(av._closeHandler,av);
av._closeTimeoutProxy=Z(av.close,av);
if(au[0]){if(D.support.mobileOS&&at.showOn=="contextmenu"){av.userEvents=new D.UserEvents(au,{filter:at.filter,allowSelection:false});
au.on(at.showOn+T+av._marker,false);
av.userEvents.bind("hold",av._showProxy);
}else{if(at.filter){au.on(at.showOn+T+av._marker,at.filter,av._showProxy);
}else{au.on(at.showOn+T+av._marker,av._showProxy);
}}}},_triggerEvent:function(au){var aw=this,at=b(aw.popup.options.anchor)[0],av=aw._eventOrigin;
aw._eventOrigin=am;
return aw.trigger(au.type,s({type:au.type,item:au.item||this.element[0],target:at},av?{event:av}:{}));
},_popup:function(){var at=this;
at._triggerProxy=Z(at._triggerEvent,at);
at.popup=at.element.addClass("k-context-menu").kendoPopup({anchor:at.target||"body",copyAnchorStyles:at.options.copyAnchorStyles,collision:at.options.popupCollision||"fit",animation:at.options.animation,activate:at._triggerProxy,deactivate:at._triggerProxy,appendTo:at.options.appendTo}).data("kendoPopup");
at._targetChild=i(at.target[0],at.popup.element[0]);
}});
al.plugin(K);
al.plugin(j);
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));