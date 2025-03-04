"use strict";(self.webpackChunktamarous_blog=self.webpackChunktamarous_blog||[]).push([[2277],{2277:(t,e,n)=>{n.d(e,{diagram:()=>q});var a=n(1485),i=n(6375),r=function(){var t=(0,i.a)((function(t,e,n,a){for(n=n||{},a=t.length;a--;n[t[a]]=e);return n}),"o"),e=[6,8,10,11,12,14,16,17,20,21],n=[1,9],a=[1,10],r=[1,11],s=[1,12],l=[1,13],o=[1,16],c=[1,17],h={trace:(0,i.a)((function(){}),"trace"),yy:{},symbols_:{error:2,start:3,timeline:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,period_statement:18,event_statement:19,period:20,event:21,$accept:0,$end:1},terminals_:{2:"error",4:"timeline",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",20:"period",21:"event"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,1],[18,1],[19,1]],performAction:(0,i.a)((function(t,e,n,a,i,r,s){var l=r.length-1;switch(i){case 1:return r[l-1];case 2:case 6:case 7:this.$=[];break;case 3:r[l-1].push(r[l]),this.$=r[l-1];break;case 4:case 5:this.$=r[l];break;case 8:a.getCommonDb().setDiagramTitle(r[l].substr(6)),this.$=r[l].substr(6);break;case 9:this.$=r[l].trim(),a.getCommonDb().setAccTitle(this.$);break;case 10:case 11:this.$=r[l].trim(),a.getCommonDb().setAccDescription(this.$);break;case 12:a.addSection(r[l].substr(8)),this.$=r[l].substr(8);break;case 15:a.addTask(r[l],0,""),this.$=r[l];break;case 16:a.addEvent(r[l].substr(2)),this.$=r[l]}}),"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:n,12:a,14:r,16:s,17:l,18:14,19:15,20:o,21:c},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:18,11:n,12:a,14:r,16:s,17:l,18:14,19:15,20:o,21:c},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,19]},{15:[1,20]},t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),t(e,[2,4]),t(e,[2,9]),t(e,[2,10])],defaultActions:{},parseError:(0,i.a)((function(t,e){if(!e.recoverable){var n=new Error(t);throw n.hash=e,n}this.trace(t)}),"parseError"),parse:(0,i.a)((function(t){var e=this,n=[0],a=[],r=[null],s=[],l=this.table,o="",c=0,h=0,d=0,u=s.slice.call(arguments,1),p=Object.create(this.lexer),y={yy:{}};for(var g in this.yy)Object.prototype.hasOwnProperty.call(this.yy,g)&&(y.yy[g]=this.yy[g]);p.setInput(t,y.yy),y.yy.lexer=p,y.yy.parser=this,typeof p.yylloc>"u"&&(p.yylloc={});var f=p.yylloc;s.push(f);var m=p.options&&p.options.ranges;function x(){var t;return"number"!=typeof(t=a.pop()||p.lex()||1)&&(t instanceof Array&&(t=(a=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof y.yy.parseError?this.parseError=y.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,i.a)((function(t){n.length=n.length-2*t,r.length=r.length-t,s.length=s.length-t}),"popStack"),(0,i.a)(x,"lex");for(var b,k,_,w,v,S,$,E,T,I={};;){if(_=n[n.length-1],this.defaultActions[_]?w=this.defaultActions[_]:((null===b||typeof b>"u")&&(b=x()),w=l[_]&&l[_][b]),typeof w>"u"||!w.length||!w[0]){var M;for(S in T=[],l[_])this.terminals_[S]&&S>2&&T.push("'"+this.terminals_[S]+"'");M=p.showPosition?"Parse error on line "+(c+1)+":\n"+p.showPosition()+"\nExpecting "+T.join(", ")+", got '"+(this.terminals_[b]||b)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==b?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(M,{text:p.match,token:this.terminals_[b]||b,line:p.yylineno,loc:f,expected:T})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+_+", token: "+b);switch(w[0]){case 1:n.push(b),r.push(p.yytext),s.push(p.yylloc),n.push(w[1]),b=null,k?(b=k,k=null):(h=p.yyleng,o=p.yytext,c=p.yylineno,f=p.yylloc,d>0&&d--);break;case 2:if($=this.productions_[w[1]][1],I.$=r[r.length-$],I._$={first_line:s[s.length-($||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-($||1)].first_column,last_column:s[s.length-1].last_column},m&&(I._$.range=[s[s.length-($||1)].range[0],s[s.length-1].range[1]]),typeof(v=this.performAction.apply(I,[o,h,c,y.yy,w[1],r,s].concat(u)))<"u")return v;$&&(n=n.slice(0,-1*$*2),r=r.slice(0,-1*$),s=s.slice(0,-1*$)),n.push(this.productions_[w[1]][0]),r.push(I.$),s.push(I._$),E=l[n[n.length-2]][n[n.length-1]],n.push(E);break;case 3:return!0}}return!0}),"parse")},d={EOF:1,parseError:(0,i.a)((function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)}),"parseError"),setInput:(0,i.a)((function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this}),"setInput"),input:(0,i.a)((function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t}),"input"),unput:(0,i.a)((function(t){var e=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var a=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===a.length?this.yylloc.first_column:0)+a[a.length-n.length].length-n[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this}),"unput"),more:(0,i.a)((function(){return this._more=!0,this}),"more"),reject:(0,i.a)((function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}),"reject"),less:(0,i.a)((function(t){this.unput(this.match.slice(t))}),"less"),pastInput:(0,i.a)((function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")}),"pastInput"),upcomingInput:(0,i.a)((function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")}),"upcomingInput"),showPosition:(0,i.a)((function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"}),"showPosition"),test_match:(0,i.a)((function(t,e){var n,a,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),(a=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=a.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:a?a[a.length-1].length-a[a.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],n=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var r in i)this[r]=i[r];return!1}return!1}),"test_match"),next:(0,i.a)((function(){if(this.done)return this.EOF;var t,e,n,a;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),r=0;r<i.length;r++)if((n=this._input.match(this.rules[i[r]]))&&(!e||n[0].length>e[0].length)){if(e=n,a=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(n,i[r])))return t;if(this._backtrack){e=!1;continue}return!1}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,i[a]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}),"next"),lex:(0,i.a)((function(){return this.next()||this.lex()}),"lex"),begin:(0,i.a)((function(t){this.conditionStack.push(t)}),"begin"),popState:(0,i.a)((function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]}),"popState"),_currentRules:(0,i.a)((function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules}),"_currentRules"),topState:(0,i.a)((function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"}),"topState"),pushState:(0,i.a)((function(t){this.begin(t)}),"pushState"),stateStackSize:(0,i.a)((function(){return this.conditionStack.length}),"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,i.a)((function(t,e,n,a){switch(n){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 21;case 16:return 20;case 17:return 6;case 18:return"INVALID"}}),"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:timeline\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^:\n]+)/i,/^(?::\s[^:\n]+)/i,/^(?:[^#:\n]+)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18],inclusive:!0}}};function u(){this.yy={}}return h.lexer=d,(0,i.a)(u,"Parser"),u.prototype=h,h.Parser=u,new u}();r.parser=r;var s=r,l={};(0,i.c)(l,{addEvent:()=>b,addSection:()=>g,addTask:()=>x,addTaskOrg:()=>k,clear:()=>y,default:()=>w,getCommonDb:()=>p,getSections:()=>f,getTasks:()=>m});var o="",c=0,h=[],d=[],u=[],p=(0,i.a)((()=>a.W),"getCommonDb"),y=(0,i.a)((function(){h.length=0,d.length=0,o="",u.length=0,(0,a.P)()}),"clear"),g=(0,i.a)((function(t){o=t,h.push(t)}),"addSection"),f=(0,i.a)((function(){return h}),"getSections"),m=(0,i.a)((function(){let t=_(),e=0;for(;!t&&e<100;)t=_(),e++;return d.push(...u),d}),"getTasks"),x=(0,i.a)((function(t,e,n){let a={id:c++,section:o,type:o,task:t,score:e||0,events:n?[n]:[]};u.push(a)}),"addTask"),b=(0,i.a)((function(t){u.find((t=>t.id===c-1)).events.push(t)}),"addEvent"),k=(0,i.a)((function(t){let e={section:o,type:o,description:t,task:t,classes:[]};d.push(e)}),"addTaskOrg"),_=(0,i.a)((function(){let t=(0,i.a)((function(t){return u[t].processed}),"compileTask"),e=!0;for(let[n,a]of u.entries())t(n),e=e&&a.processed;return e}),"compileTasks"),w={clear:y,getCommonDb:p,addSection:g,getSections:f,getTasks:m,addTask:x,addTaskOrg:k,addEvent:b},v=(0,i.a)((function(t,e){let n=t.append("rect");return n.attr("x",e.x),n.attr("y",e.y),n.attr("fill",e.fill),n.attr("stroke",e.stroke),n.attr("width",e.width),n.attr("height",e.height),n.attr("rx",e.rx),n.attr("ry",e.ry),void 0!==e.class&&n.attr("class",e.class),n}),"drawRect"),S=(0,i.a)((function(t,e){let n=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),r=t.append("g");function s(t){let n=(0,a.Ba)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(6.8181818181818175);t.append("path").attr("class","mouth").attr("d",n).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function l(t){let n=(0,a.Ba)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(6.8181818181818175);t.append("path").attr("class","mouth").attr("d",n).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function o(t){t.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return r.append("circle").attr("cx",e.cx-5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),r.append("circle").attr("cx",e.cx+5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),(0,i.a)(s,"smile"),(0,i.a)(l,"sad"),(0,i.a)(o,"ambivalent"),e.score>3?s(r):e.score<3?l(r):o(r),n}),"drawFace"),$=(0,i.a)((function(t,e){let n=t.append("circle");return n.attr("cx",e.cx),n.attr("cy",e.cy),n.attr("class","actor-"+e.pos),n.attr("fill",e.fill),n.attr("stroke",e.stroke),n.attr("r",e.r),void 0!==n.class&&n.attr("class",n.class),void 0!==e.title&&n.append("title").text(e.title),n}),"drawCircle"),E=(0,i.a)((function(t,e){let n=e.text.replace(/<br\s*\/?>/gi," "),a=t.append("text");a.attr("x",e.x),a.attr("y",e.y),a.attr("class","legend"),a.style("text-anchor",e.anchor),void 0!==e.class&&a.attr("class",e.class);let i=a.append("tspan");return i.attr("x",e.x+2*e.textMargin),i.text(n),a}),"drawText"),T=(0,i.a)((function(t,e){function n(t,e,n,a,i){return t+","+e+" "+(t+n)+","+e+" "+(t+n)+","+(e+a-i)+" "+(t+n-1.2*i)+","+(e+a)+" "+t+","+(e+a)}(0,i.a)(n,"genPoints");let a=t.append("polygon");a.attr("points",n(e.x,e.y,50,20,7)),a.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,E(t,e)}),"drawLabel"),I=(0,i.a)((function(t,e,n){let a=t.append("g"),i=P();i.x=e.x,i.y=e.y,i.fill=e.fill,i.width=n.width,i.height=n.height,i.class="journey-section section-type-"+e.num,i.rx=3,i.ry=3,v(a,i),L(n)(e.text,a,i.x,i.y,i.width,i.height,{class:"journey-section section-type-"+e.num},n,e.colour)}),"drawSection"),M=-1,N=(0,i.a)((function(t,e,n){let a=e.x+n.width/2,i=t.append("g");M++,i.append("line").attr("id","task"+M).attr("x1",a).attr("y1",e.y).attr("x2",a).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),S(i,{cx:a,cy:300+30*(5-e.score),score:e.score});let r=P();r.x=e.x,r.y=e.y,r.fill=e.fill,r.width=n.width,r.height=n.height,r.class="task task-type-"+e.num,r.rx=3,r.ry=3,v(i,r),L(n)(e.task,i,r.x,r.y,r.width,r.height,{class:"task"},n,e.colour)}),"drawTask"),C=(0,i.a)((function(t,e){v(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,class:"rect"}).lower()}),"drawBackgroundRect"),A=(0,i.a)((function(){return{x:0,y:0,fill:void 0,"text-anchor":"start",width:100,height:100,textMargin:0,rx:0,ry:0}}),"getTextObj"),P=(0,i.a)((function(){return{x:0,y:0,width:100,anchor:"start",height:100,rx:0,ry:0}}),"getNoteRect"),L=function(){function t(t,e,n,i,r,s,l,o){a(e.append("text").attr("x",n+r/2).attr("y",i+s/2+5).style("font-color",o).style("text-anchor","middle").text(t),l)}function e(t,e,n,i,r,s,l,o,c){let{taskFontSize:h,taskFontFamily:d}=o,u=t.split(/<br\s*\/?>/gi);for(let t=0;t<u.length;t++){let o=t*h-h*(u.length-1)/2,p=e.append("text").attr("x",n+r/2).attr("y",i).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",d);p.append("tspan").attr("x",n+r/2).attr("dy",o).text(u[t]),p.attr("y",i+s/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),a(p,l)}}function n(t,n,i,r,s,l,o,c){let h=n.append("switch"),d=h.append("foreignObject").attr("x",i).attr("y",r).attr("width",s).attr("height",l).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");d.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,i,r,s,l,o,c),a(d,o)}function a(t,e){for(let n in e)n in e&&t.attr(n,e[n])}return(0,i.a)(t,"byText"),(0,i.a)(e,"byTspan"),(0,i.a)(n,"byFo"),(0,i.a)(a,"_setTextAttrs"),function(a){return"fo"===a.textPlacement?n:"old"===a.textPlacement?t:e}}(),H=(0,i.a)((function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")}),"initGraphics");function O(t,e){t.each((function(){var t,n=(0,a.ga)(this),i=n.text().split(/(\s+|<br>)/).reverse(),r=[],s=n.attr("y"),l=parseFloat(n.attr("dy")),o=n.text(null).append("tspan").attr("x",0).attr("y",s).attr("dy",l+"em");for(let a=0;a<i.length;a++)t=i[i.length-1-a],r.push(t),o.text(r.join(" ").trim()),(o.node().getComputedTextLength()>e||"<br>"===t)&&(r.pop(),o.text(r.join(" ").trim()),r="<br>"===t?[""]:[t],o=n.append("tspan").attr("x",0).attr("y",s).attr("dy","1.1em").text(t))}))}(0,i.a)(O,"wrap");var j=(0,i.a)((function(t,e,n,a){let i=n%12-1,r=t.append("g");e.section=i,r.attr("class",(e.class?e.class+" ":"")+"timeline-node section-"+i);let s=r.append("g"),l=r.append("g"),o=l.append("text").text(e.descr).attr("dy","1em").attr("alignment-baseline","middle").attr("dominant-baseline","middle").attr("text-anchor","middle").call(O,e.width).node().getBBox(),c=a.fontSize?.replace?a.fontSize.replace("px",""):a.fontSize;return e.height=o.height+1.1*c*.5+e.padding,e.height=Math.max(e.height,e.maxHeight),e.width=e.width+2*e.padding,l.attr("transform","translate("+e.width/2+", "+e.padding/2+")"),D(s,e,i,a),e}),"drawNode"),R=(0,i.a)((function(t,e,n){let a=t.append("g"),i=a.append("text").text(e.descr).attr("dy","1em").attr("alignment-baseline","middle").attr("dominant-baseline","middle").attr("text-anchor","middle").call(O,e.width).node().getBBox(),r=n.fontSize?.replace?n.fontSize.replace("px",""):n.fontSize;return a.remove(),i.height+1.1*r*.5+e.padding}),"getVirtualNodeHeight"),D=(0,i.a)((function(t,e,n){t.append("path").attr("id","node-"+e.id).attr("class","node-bkg node-"+e.type).attr("d",`M0 ${e.height-5} v${10-e.height} q0,-5 5,-5 h${e.width-10} q5,0 5,5 v${e.height-5} H0 Z`),t.append("line").attr("class","node-line-"+n).attr("x1",0).attr("y1",e.height).attr("x2",e.width).attr("y2",e.height)}),"defaultBkg"),z={drawRect:v,drawCircle:$,drawSection:I,drawText:E,drawLabel:T,drawTask:N,drawBackgroundRect:C,getTextObj:A,getNoteRect:P,initGraphics:H,drawNode:j,getVirtualNodeHeight:R},B=(0,i.a)((function(t,e,n,i){let r=(0,a.X)(),s=r.leftMargin??50;a.b.debug("timeline",i.db);let l,o=r.securityLevel;"sandbox"===o&&(l=(0,a.ga)("#i"+e));let c=("sandbox"===o?(0,a.ga)(l.nodes()[0].contentDocument.body):(0,a.ga)("body")).select("#"+e);c.append("g");let h=i.db.getTasks(),d=i.db.getCommonDb().getDiagramTitle();a.b.debug("task",h),z.initGraphics(c);let u=i.db.getSections();a.b.debug("sections",u);let p=0,y=0,g=0,f=0,m=50+s,x=50;f=50;let b=0,k=!0;u.forEach((function(t){let e={number:b,descr:t,section:b,width:150,padding:20,maxHeight:p},n=z.getVirtualNodeHeight(c,e,r);a.b.debug("sectionHeight before draw",n),p=Math.max(p,n+20)}));let _=0,w=0;a.b.debug("tasks.length",h.length);for(let[t,e]of h.entries()){let n={number:t,descr:e,section:e.section,width:150,padding:20,maxHeight:y},i=z.getVirtualNodeHeight(c,n,r);a.b.debug("taskHeight before draw",i),y=Math.max(y,i+20),_=Math.max(_,e.events.length);let s=0;for(let t of e.events){let n={descr:t,section:e.section,number:e.section,width:150,padding:20,maxHeight:50};s+=z.getVirtualNodeHeight(c,n,r)}w=Math.max(w,s)}a.b.debug("maxSectionHeight before draw",p),a.b.debug("maxTaskHeight before draw",y),u&&u.length>0?u.forEach((t=>{let e=h.filter((e=>e.section===t)),n={number:b,descr:t,section:b,width:200*Math.max(e.length,1)-50,padding:20,maxHeight:p};a.b.debug("sectionNode",n);let i=c.append("g"),s=z.drawNode(i,n,b,r);a.b.debug("sectionNode output",s),i.attr("transform",`translate(${m}, 50)`),x+=p+50,e.length>0&&F(c,e,b,m,x,y,r,_,w,p,!1),m+=200*Math.max(e.length,1),x=50,b++})):(k=!1,F(c,h,b,m,x,y,r,_,w,p,!0));let v=c.node().getBBox();a.b.debug("bounds",v),d&&c.append("text").text(d).attr("x",v.width/2-s).attr("font-size","4ex").attr("font-weight","bold").attr("y",20),g=k?p+y+150:y+100,c.append("g").attr("class","lineWrapper").append("line").attr("x1",s).attr("y1",g).attr("x2",v.width+3*s).attr("y2",g).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)"),(0,a.N)(void 0,c,r.timeline?.padding??50,r.timeline?.useMaxWidth??!1)}),"draw"),F=(0,i.a)((function(t,e,n,i,r,s,l,o,c,h,d){for(let o of e){let e={descr:o.task,section:n,number:n,width:150,padding:20,maxHeight:s};a.b.debug("taskNode",e);let u=t.append("g").attr("class","taskWrapper"),p=z.drawNode(u,e,n,l).height;if(a.b.debug("taskHeight after draw",p),u.attr("transform",`translate(${i}, ${r})`),s=Math.max(s,p),o.events){let e=t.append("g").attr("class","lineWrapper"),a=s;r+=100,a+=W(t,o.events,n,i,r,l),r-=100,e.append("line").attr("x1",i+95).attr("y1",r+s).attr("x2",i+95).attr("y2",r+s+(d?s:h)+c+120).attr("stroke-width",2).attr("stroke","black").attr("marker-end","url(#arrowhead)").attr("stroke-dasharray","5,5")}i+=200,d&&!l.timeline?.disableMulticolor&&n++}r-=10}),"drawTasks"),W=(0,i.a)((function(t,e,n,i,r,s){let l=0,o=r;r+=100;for(let o of e){let e={descr:o,section:n,number:n,width:150,padding:20,maxHeight:50};a.b.debug("eventNode",e);let c=t.append("g").attr("class","eventWrapper"),h=z.drawNode(c,e,n,s).height;l+=h,c.attr("transform",`translate(${i}, ${r})`),r=r+10+h}return r=o,l}),"drawEvents"),V={setConf:(0,i.a)((()=>{}),"setConf"),draw:B},G=(0,i.a)((t=>{let e="";for(let e=0;e<t.THEME_COLOR_LIMIT;e++)t["lineColor"+e]=t["lineColor"+e]||t["cScaleInv"+e],(0,a.n)(t["lineColor"+e])?t["lineColor"+e]=(0,a.o)(t["lineColor"+e],20):t["lineColor"+e]=(0,a.p)(t["lineColor"+e],20);for(let n=0;n<t.THEME_COLOR_LIMIT;n++){let a=""+(17-3*n);e+=`\n    .section-${n-1} rect, .section-${n-1} path, .section-${n-1} circle, .section-${n-1} path  {\n      fill: ${t["cScale"+n]};\n    }\n    .section-${n-1} text {\n     fill: ${t["cScaleLabel"+n]};\n    }\n    .node-icon-${n-1} {\n      font-size: 40px;\n      color: ${t["cScaleLabel"+n]};\n    }\n    .section-edge-${n-1}{\n      stroke: ${t["cScale"+n]};\n    }\n    .edge-depth-${n-1}{\n      stroke-width: ${a};\n    }\n    .section-${n-1} line {\n      stroke: ${t["cScaleInv"+n]} ;\n      stroke-width: 3;\n    }\n\n    .lineWrapper line{\n      stroke: ${t["cScaleLabel"+n]} ;\n    }\n\n    .disabled, .disabled circle, .disabled text {\n      fill: lightgray;\n    }\n    .disabled text {\n      fill: #efefef;\n    }\n    `}return e}),"genSections"),q={db:l,renderer:V,parser:s,styles:(0,i.a)((t=>`\n  .edge {\n    stroke-width: 3;\n  }\n  ${G(t)}\n  .section-root rect, .section-root path, .section-root circle  {\n    fill: ${t.git0};\n  }\n  .section-root text {\n    fill: ${t.gitBranchLabel0};\n  }\n  .icon-container {\n    height:100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .edge {\n    fill: none;\n  }\n  .eventWrapper  {\n   filter: brightness(120%);\n  }\n`),"getStyles")}}}]);