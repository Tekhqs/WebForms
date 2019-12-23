(function(b,a){a("kendo.numerictextbox",["kendo.core","kendo.userevents"],b);
}(function(){var a={id:"numerictextbox",name:"NumericTextBox",category:"web",description:"The NumericTextBox widget can format and display numeric, percentage or currency textbox.",depends:["core","userevents"]};
(function(b,J){var s=window.kendo,f=s.caret,t=s.keys,I=s.ui,K=I.Widget,c=s._activeElement,k=s._extractFormat,y=s.parseFloat,z=s.support.placeholder,n=s.getCulture,g="change",i="disabled",C="readonly",q="k-input",E="spin",v=".kendoNumericTextBox",G="touchend",u="mouseleave"+v,p="mouseenter"+v+" "+u,h="k-state-default",m="k-state-focused",o="k-state-hover",l="focus",A=".",D="k-state-selected",F="k-state-disabled",d="aria-disabled",r=/^(-)?(\d*)$/,w=null,B=b.proxy,j=b.extend;
var x=K.extend({init:function(M,Q){var S=this,N=Q&&Q.step!==J,P,O,R,T,L;
K.fn.init.call(S,M,Q);
Q=S.options;
M=S.element.on("focusout"+v,B(S._focusout,S)).attr("role","spinbutton");
Q.placeholder=Q.placeholder||M.attr("placeholder");
S._initialOptions=j({},Q);
P=S.min(M.attr("min"));
O=S.max(M.attr("max"));
R=S._parse(M.attr("step"));
if(Q.min===w&&P!==w){Q.min=P;
}if(Q.max===w&&O!==w){Q.max=O;
}if(!N&&R!==w){Q.step=R;
}S._reset();
S._wrapper();
S._arrows();
S._input();
if(!s.support.mobileOS){S._text.on(l+v,B(S._click,S));
}else{S._text.on(G+v+" "+l+v,function(){if(s.support.browser.edge){S._text.one(l+v,function(){S._toggleText(false);
M.focus();
});
}else{S._toggleText(false);
M.focus();
}});
}M.attr("aria-valuemin",Q.min).attr("aria-valuemax",Q.max);
Q.format=k(Q.format);
T=Q.value;
S.value(T!==w?T:M.val());
L=M.is("[disabled]")||b(S.element).parents("fieldset").is(":disabled");
if(L){S.enable(false);
}else{S.readonly(M.is("[readonly]"));
}s.notify(S);
},options:{name:"NumericTextBox",decimals:w,restrictDecimals:false,min:w,max:w,value:w,step:1,round:true,culture:"",format:"n",spinners:true,placeholder:"",upArrowText:"Increase value",downArrowText:"Decrease value"},events:[g,E],_editable:function(N){var Q=this,M=Q.element,L=N.disable,O=N.readonly,P=Q._text.add(M),R=Q._inputWrapper.off(p);
Q._toggleText(true);
Q._upArrowEventHandler.unbind("press");
Q._downArrowEventHandler.unbind("press");
M.off("keydown"+v).off("keypress"+v).off("paste"+v);
if(!O&&!L){R.addClass(h).removeClass(F).on(p,Q._toggleHover);
P.removeAttr(i).removeAttr(C).attr(d,false);
Q._upArrowEventHandler.bind("press",function(S){S.preventDefault();
Q._spin(1);
Q._upArrow.addClass(D);
});
Q._downArrowEventHandler.bind("press",function(S){S.preventDefault();
Q._spin(-1);
Q._downArrow.addClass(D);
});
Q.element.on("keydown"+v,B(Q._keydown,Q)).on("keypress"+v,B(Q._keypress,Q)).on("paste"+v,B(Q._paste,Q));
}else{R.addClass(L?F:h).removeClass(L?h:F);
P.attr(i,L).attr(C,O).attr(d,L);
}},readonly:function(L){this._editable({readonly:L===J?true:L,disable:false});
},enable:function(L){this._editable({readonly:false,disable:!(L=L===J?true:L)});
},destroy:function(){var L=this;
L.element.add(L._text).add(L._upArrow).add(L._downArrow).add(L._inputWrapper).off(v);
L._upArrowEventHandler.destroy();
L._downArrowEventHandler.destroy();
if(L._form){L._form.off("reset",L._resetHandler);
}K.fn.destroy.call(L);
},min:function(L){return this._option("min",L);
},max:function(L){return this._option("max",L);
},step:function(L){return this._option("step",L);
},value:function(N){var M=this,L;
if(N===J){return M._value;
}N=M._parse(N);
L=M._adjust(N);
if(N!==L){return;
}M._update(N);
M._old=M._value;
},focus:function(){this._focusin();
},_adjust:function(P){var O=this,N=O.options,M=N.min,L=N.max;
if(P===w){return P;
}if(M!==w&&P<M){P=M;
}else{if(L!==w&&P>L){P=L;
}}return P;
},_arrows:function(){var Q=this,M,L=function(){clearTimeout(Q._spinning);
M.removeClass(D);
},O=Q.options,P=O.spinners,N=Q.element;
M=N.siblings(".k-icon");
if(!M[0]){M=b(e("increase",O.upArrowText)+e("decrease",O.downArrowText)).insertAfter(N);
M.wrapAll('<span class="k-select"/>');
}if(!P){M.parent().toggle(P);
Q._inputWrapper.addClass("k-expand-padding");
}Q._upArrow=M.eq(0);
Q._upArrowEventHandler=new s.UserEvents(Q._upArrow,{release:L});
Q._downArrow=M.eq(1);
Q._downArrowEventHandler=new s.UserEvents(Q._downArrow,{release:L});
},_blur:function(){var L=this;
L._toggleText(true);
L._change(L.element.val());
},_click:function(L){var M=this;
clearTimeout(M._focusing);
M._focusing=setTimeout(function(){var T=L.target,S=f(T)[0],V=T.value.substring(0,S),P=M._format(M.options.format),Q=P[","],U,R,O,N=0;
if(Q){R=new RegExp("\\"+Q,"g");
O=new RegExp("([\\d\\"+Q+"]+)(\\"+P[A]+")?(\\d+)?");
}if(O){U=O.exec(V);
}if(U){N=U[0].replace(R,"").length;
if(V.indexOf("(")!=-1&&M._value<0){N++;
}}M._focusin();
f(M.element[0],N);
});
},_change:function(M){var L=this;
L._update(M);
M=L._value;
if(L._old!=M){L._old=M;
if(!L._typing){L.element.trigger(g);
}L.trigger(g);
}L._typing=false;
},_culture:function(L){return L||n(this.options.culture);
},_focusin:function(){var L=this;
L._inputWrapper.addClass(m);
L._toggleText(false);
L.element[0].focus();
},_focusout:function(){var L=this;
clearTimeout(L._focusing);
L._inputWrapper.removeClass(m).removeClass(o);
L._blur();
},_format:function(M,L){var N=this._culture(L).numberFormat;
M=M.toLowerCase();
if(M.indexOf("c")>-1){N=N.currency;
}else{if(M.indexOf("p")>-1){N=N.percent;
}}return N;
},_input:function(){var R=this,P=R.options,M="k-formatted-value",O=R.element.addClass(q).show()[0],L=O.accessKey,S=R.wrapper,Q;
Q=S.find(A+M);
if(!Q[0]){Q=b('<input type="text"/>').insertBefore(O).addClass(M);
}try{O.setAttribute("type","text");
}catch(N){O.type="text";
}R._initialTitle=O.title;
Q[0].title=O.title;
Q[0].tabIndex=O.tabIndex;
Q[0].style.cssText=O.style.cssText;
Q.prop("placeholder",P.placeholder);
if(L){Q.attr("accesskey",L);
O.accessKey="";
}R._text=Q.addClass(O.className).attr({role:"spinbutton","aria-valuemin":P.min,"aria-valuemax":P.max});
},_keydown:function(L){var N=this,M=L.keyCode;
N._key=M;
if(M==t.DOWN){N._step(-1);
}else{if(M==t.UP){N._step(1);
}else{if(M==t.ENTER){N._change(N.element.val());
}else{N._typing=true;
}}}},_keypress:function(M){if(M.which===0||M.metaKey||M.ctrlKey||M.keyCode===t.BACKSPACE||M.keyCode===t.ENTER){return;
}var V=this;
var Q=V.options.min;
var N=V.element;
var S=f(N);
var U=S[0];
var T=S[1];
var L=String.fromCharCode(M.which);
var R=V._format(V.options.format);
var O=V._key===t.NUMPAD_DOT;
var W=N.val();
var P;
if(O){L=R[A];
}W=W.substring(0,U)+L+W.substring(T);
P=V._numericRegex(R).test(W);
if(P&&O){N.val(W);
f(N,U+L.length);
M.preventDefault();
}else{if(Q!==null&&Q>=0&&W.charAt(0)==="-"||!P){M.preventDefault();
}}V._key=0;
},_numericRegex:function(M){var P=this;
var O=M[A];
var N=P.options.decimals;
var L="*";
if(O===A){O="\\"+O;
}if(N===w){N=M.decimals;
}if(N===0){return r;
}if(P.options.restrictDecimals){L="{0,"+N+"}";
}if(P._separator!==O){P._separator=O;
P._floatRegExp=new RegExp("^(-)?(((\\d+("+O+"\\d"+L+")?)|("+O+"\\d"+L+")))?$");
}return P._floatRegExp;
},_paste:function(L){var O=this;
var M=L.target;
var P=M.value;
var N=O._format(O.options.format);
setTimeout(function(){var R=O._parse(M.value);
var Q=O._numericRegex(N).test(M.value);
if(R===w||O._adjust(R)!==R||!Q){O._update(P);
}});
},_option:function(M,P){var O=this,L=O.element,N=O.options;
if(P===J){return N[M];
}P=O._parse(P);
if(!P&&M==="step"){return;
}N[M]=P;
L.add(O._text).attr("aria-value"+M,P);
L.attr(M,P);
},_spin:function(L,N){var M=this;
N=N||500;
clearTimeout(M._spinning);
M._spinning=setTimeout(function(){M._spin(L,50);
},N);
M._step(L);
},_step:function(M){var N=this,L=N.element,O=N._parse(L.val())||0;
if(c()!=L[0]){N._focusin();
}O+=N.options.step*M;
N._update(N._adjust(O));
N._typing=false;
N.trigger(E);
},_toggleHover:function(L){b(L.currentTarget).toggleClass(o,L.type==="mouseenter");
},_toggleText:function(M){var L=this;
L._text.toggle(M);
L.element.toggle(!M);
},_parse:function(M,L){return y(M,this._culture(L),this.options.format);
},_round:function(N,L){var M=this.options.round?s._round:H;
return M(N,L);
},_update:function(S){var R=this,Q=R.options,N=Q.format,M=Q.decimals,L=R._culture(),P=R._format(N,L),O;
if(M===w){M=P.decimals;
}S=R._parse(S,L);
O=S!==w;
if(O){S=parseFloat(R._round(S,M),10);
}R._value=S=R._adjust(S);
R._placeholder(s.toString(S,N,L));
if(O){S=S.toString();
if(S.indexOf("e")!==-1){S=R._round(+S,M);
}S=S.replace(A,P[A]);
}else{S=null;
}R.element.val(S);
R.element.add(R._text).attr("aria-valuenow",S);
},_placeholder:function(M){var L=this._text;
L.val(M);
if(!z&&!M){L.val(this.options.placeholder);
}L.attr("title",this._initialTitle||L.val());
},_wrapper:function(){var N=this,M=N.element,L=M[0],O;
O=M.parents(".k-numerictextbox");
if(!O.is("span.k-numerictextbox")){O=M.hide().wrap('<span class="k-numeric-wrap k-state-default" />').parent();
O=O.wrap("<span/>").parent();
}O[0].style.cssText=L.style.cssText;
L.style.width="";
N.wrapper=O.addClass("k-widget k-numerictextbox").addClass(L.className).css("display","");
N._inputWrapper=b(O[0].firstChild);
},_reset:function(){var O=this,L=O.element,N=L.attr("form"),M=N?b("#"+N):L.closest("form");
if(M[0]){O._resetHandler=function(){setTimeout(function(){O.value(L[0].value);
O.max(O._initialOptions.max);
O.min(O._initialOptions.min);
});
};
O._form=M.on("reset",O._resetHandler);
}}});
function e(M,N){var L="k-i-arrow-"+(M==="increase"?"60-up":"60-down");
return'<span unselectable="on" class="k-link k-link-'+M+'" aria-label="'+N+'" title="'+N+'"><span unselectable="on" class="k-icon '+L+'"></span></span>';
}function H(N,M){var L=parseFloat(N,10).toString().split(A);
if(L[1]){L[1]=L[1].substring(0,M);
}return L.join(A);
}I.plugin(x);
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
