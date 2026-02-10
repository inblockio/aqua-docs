(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,475058,216888,t=>{"use strict";t.s(["default",0,function(t){return function(){return t}}],475058);let e=Math.PI,i=2*e,s=i-1e-6;function r(t){this._+=t[0];for(let e=1,i=t.length;e<i;++e)this._+=arguments[e]+t[e]}class n{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=null==t?r:function(t){let e=Math.floor(t);if(!(e>=0))throw Error(`invalid digits: ${t}`);if(e>15)return r;let i=10**e;return function(t){this._+=t[0];for(let e=1,s=t.length;e<s;++e)this._+=Math.round(arguments[e]*i)/i+t[e]}}(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,i,s){this._append`Q${+t},${+e},${this._x1=+i},${this._y1=+s}`}bezierCurveTo(t,e,i,s,r,n){this._append`C${+t},${+e},${+i},${+s},${this._x1=+r},${this._y1=+n}`}arcTo(t,i,s,r,n){if(t*=1,i*=1,s*=1,r*=1,(n*=1)<0)throw Error(`negative radius: ${n}`);let a=this._x1,o=this._y1,l=s-t,c=r-i,h=a-t,d=o-i,u=h*h+d*d;if(null===this._x1)this._append`M${this._x1=t},${this._y1=i}`;else if(u>1e-6)if(Math.abs(d*l-c*h)>1e-6&&n){let p=s-a,g=r-o,f=l*l+c*c,y=Math.sqrt(f),_=Math.sqrt(u),m=n*Math.tan((e-Math.acos((f+u-(p*p+g*g))/(2*y*_)))/2),x=m/_,S=m/y;Math.abs(x-1)>1e-6&&this._append`L${t+x*h},${i+x*d}`,this._append`A${n},${n},0,0,${+(d*p>h*g)},${this._x1=t+S*l},${this._y1=i+S*c}`}else this._append`L${this._x1=t},${this._y1=i}`}arc(t,r,n,a,o,l){if(t*=1,r*=1,n*=1,l=!!l,n<0)throw Error(`negative radius: ${n}`);let c=n*Math.cos(a),h=n*Math.sin(a),d=t+c,u=r+h,p=1^l,g=l?a-o:o-a;null===this._x1?this._append`M${d},${u}`:(Math.abs(this._x1-d)>1e-6||Math.abs(this._y1-u)>1e-6)&&this._append`L${d},${u}`,n&&(g<0&&(g=g%i+i),g>s?this._append`A${n},${n},0,1,${p},${t-c},${r-h}A${n},${n},0,1,${p},${this._x1=d},${this._y1=u}`:g>1e-6&&this._append`A${n},${n},0,${+(g>=e)},${p},${this._x1=t+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)}rect(t,e,i,s){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${i*=1}v${+s}h${-i}Z`}toString(){return this._}}function a(t){let e=3;return t.digits=function(i){if(!arguments.length)return e;if(null==i)e=null;else{let t=Math.floor(i);if(!(t>=0))throw RangeError(`invalid digits: ${i}`);e=t}return t},()=>new n(e)}n.prototype,t.s(["withPath",()=>a],216888)},62990,t=>{"use strict";Array.prototype.slice,t.s(["default",0,function(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}])},785833,t=>{"use strict";var e=t.i(62990),i=t.i(475058),s=t.i(48114),r=t.i(216888);function n(t){return t[0]}function a(t){return t[1]}t.s(["line",0,function(t,o){var l=(0,i.default)(!0),c=null,h=s.default,d=null,u=(0,r.withPath)(p);function p(i){var s,r,n,a=(i=(0,e.default)(i)).length,p=!1;for(null==c&&(d=h(n=u())),s=0;s<=a;++s)!(s<a&&l(r=i[s],s,i))===p&&((p=!p)?d.lineStart():d.lineEnd()),p&&d.point(+t(r,s,i),+o(r,s,i));if(n)return d=null,n+""||null}return t="function"==typeof t?t:void 0===t?n:(0,i.default)(t),o="function"==typeof o?o:void 0===o?a:(0,i.default)(o),p.x=function(e){return arguments.length?(t="function"==typeof e?e:(0,i.default)(+e),p):t},p.y=function(t){return arguments.length?(o="function"==typeof t?t:(0,i.default)(+t),p):o},p.defined=function(t){return arguments.length?(l="function"==typeof t?t:(0,i.default)(!!t),p):l},p.curve=function(t){return arguments.length?(h=t,null!=c&&(d=h(c)),p):h},p.context=function(t){return arguments.length?(null==t?c=d=null:d=h(c=t),p):c},p}],785833)},763979,t=>{"use strict";var e=t.i(733773),i=function(){var t=function(t,e,i,s){for(i=i||{},s=t.length;s--;i[t[s]]=e);return i},e=[1,2],i=[1,3],s=[1,4],r=[2,4],n=[1,9],a=[1,11],o=[1,15],l=[1,16],c=[1,17],h=[1,18],d=[1,30],u=[1,19],p=[1,20],g=[1,21],f=[1,22],y=[1,23],_=[1,25],m=[1,26],x=[1,27],S=[1,28],b=[1,29],k=[1,32],T=[1,33],E=[1,34],$=[1,35],v=[1,31],A=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],C=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],D=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],w={trace:function(){},yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:function(t,e,i,s,r,n,a){var o=n.length-1;switch(r){case 3:return s.setRootDoc(n[o]),n[o];case 4:this.$=[];break;case 5:"nl"!=n[o]&&(n[o-1].push(n[o]),this.$=n[o-1]);break;case 6:case 7:case 11:this.$=n[o];break;case 8:this.$="nl";break;case 12:let l=n[o-1];l.description=s.trimColon(n[o]),this.$=l;break;case 13:this.$={stmt:"relation",state1:n[o-2],state2:n[o]};break;case 14:let c=s.trimColon(n[o]);this.$={stmt:"relation",state1:n[o-3],state2:n[o-1],description:c};break;case 18:this.$={stmt:"state",id:n[o-3],type:"default",description:"",doc:n[o-1]};break;case 19:var h=n[o],d=n[o-2].trim();if(n[o].match(":")){var u=n[o].split(":");h=u[0],d=[d,u[1]]}this.$={stmt:"state",id:h,type:"default",description:d};break;case 20:this.$={stmt:"state",id:n[o-3],type:"default",description:n[o-5],doc:n[o-1]};break;case 21:this.$={stmt:"state",id:n[o],type:"fork"};break;case 22:this.$={stmt:"state",id:n[o],type:"join"};break;case 23:this.$={stmt:"state",id:n[o],type:"choice"};break;case 24:this.$={stmt:"state",id:s.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:n[o-1].trim(),note:{position:n[o-2].trim(),text:n[o].trim()}};break;case 28:this.$=n[o].trim(),s.setAccTitle(this.$);break;case 29:case 30:this.$=n[o].trim(),s.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:n[o-1].trim(),classes:n[o].trim()};break;case 33:this.$={stmt:"applyClass",id:n[o-1].trim(),styleClass:n[o].trim()};break;case 34:s.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:s.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:s.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:s.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:n[o].trim(),type:"default",description:""};break;case 42:case 43:this.$={stmt:"state",id:n[o-2].trim(),classes:[n[o].trim()],type:"default",description:""}}},table:[{3:1,4:e,5:i,6:s},{1:[3]},{3:5,4:e,5:i,6:s},{3:6,4:e,5:i,6:s},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:n,5:a,8:8,9:10,10:12,11:13,12:14,15:o,16:l,18:c,21:h,23:d,24:u,25:p,26:g,27:f,28:y,31:24,32:_,34:m,36:x,37:S,41:b,44:k,45:T,46:E,47:$,50:v},t(A,[2,5]),{9:36,10:12,11:13,12:14,15:o,16:l,18:c,21:h,23:d,24:u,25:p,26:g,27:f,28:y,31:24,32:_,34:m,36:x,37:S,41:b,44:k,45:T,46:E,47:$,50:v},t(A,[2,7]),t(A,[2,8]),t(A,[2,9]),t(A,[2,10]),t(A,[2,11],{13:[1,37],14:[1,38]}),t(A,[2,15]),{17:[1,39]},t(A,[2,17],{19:[1,40]}),{22:[1,41]},t(A,[2,21]),t(A,[2,22]),t(A,[2,23]),t(A,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(A,[2,27]),{33:[1,46]},{35:[1,47]},t(A,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(C,[2,40],{51:[1,51]}),t(C,[2,41],{51:[1,52]}),t(A,[2,34]),t(A,[2,35]),t(A,[2,36]),t(A,[2,37]),t(A,[2,6]),t(A,[2,12]),{12:53,23:d,50:v},t(A,[2,16]),t(D,r,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(A,[2,28]),t(A,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(A,[2,13],{13:[1,63]}),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,15:o,16:l,18:c,20:[1,64],21:h,23:d,24:u,25:p,26:g,27:f,28:y,31:24,32:_,34:m,36:x,37:S,41:b,44:k,45:T,46:E,47:$,50:v},t(A,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(A,[2,31]),t(A,[2,32]),t(A,[2,33]),t(C,[2,42]),t(C,[2,43]),t(A,[2,14]),t(A,[2,18]),t(D,r,{7:68}),t(A,[2,25]),t(A,[2,26]),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,15:o,16:l,18:c,20:[1,69],21:h,23:d,24:u,25:p,26:g,27:f,28:y,31:24,32:_,34:m,36:x,37:S,41:b,44:k,45:T,46:E,47:$,50:v},t(A,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},parse:function(t){var e=this,i=[0],s=[],r=[null],n=[],a=this.table,o="",l=0,c=0,h=n.slice.call(arguments,1),d=Object.create(this.lexer),u={};for(var p in this.yy)Object.prototype.hasOwnProperty.call(this.yy,p)&&(u[p]=this.yy[p]);d.setInput(t,u),u.lexer=d,u.parser=this,void 0===d.yylloc&&(d.yylloc={});var g=d.yylloc;n.push(g);var f=d.options&&d.options.ranges;"function"==typeof u.parseError?this.parseError=u.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var y,_,m,x,S,b,k,T,E={};;){if(_=i[i.length-1],this.defaultActions[_]?m=this.defaultActions[_]:(null==y&&(y=function(){var t;return"number"!=typeof(t=s.pop()||d.lex()||1)&&(t instanceof Array&&(t=(s=t).pop()),t=e.symbols_[t]||t),t}()),m=a[_]&&a[_][y]),void 0===m||!m.length||!m[0]){var $="";for(S in T=[],a[_])this.terminals_[S]&&S>2&&T.push("'"+this.terminals_[S]+"'");$=d.showPosition?"Parse error on line "+(l+1)+":\n"+d.showPosition()+"\nExpecting "+T.join(", ")+", got '"+(this.terminals_[y]||y)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==y?"end of input":"'"+(this.terminals_[y]||y)+"'"),this.parseError($,{text:d.match,token:this.terminals_[y]||y,line:d.yylineno,loc:g,expected:T})}if(m[0]instanceof Array&&m.length>1)throw Error("Parse Error: multiple actions possible at state: "+_+", token: "+y);switch(m[0]){case 1:i.push(y),r.push(d.yytext),n.push(d.yylloc),i.push(m[1]),y=null,c=d.yyleng,o=d.yytext,l=d.yylineno,g=d.yylloc;break;case 2:if(b=this.productions_[m[1]][1],E.$=r[r.length-b],E._$={first_line:n[n.length-(b||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(b||1)].first_column,last_column:n[n.length-1].last_column},f&&(E._$.range=[n[n.length-(b||1)].range[0],n[n.length-1].range[1]]),void 0!==(x=this.performAction.apply(E,[o,c,l,u,m[1],r,n].concat(h))))return x;b&&(i=i.slice(0,-1*b*2),r=r.slice(0,-1*b),n=n.slice(0,-1*b)),i.push(this.productions_[m[1]][0]),r.push(E.$),n.push(E._$),k=a[i[i.length-2]][i[i.length-1]],i.push(k);break;case 3:return!0}}return!0}};function L(){this.yy={}}return w.lexer={EOF:1,parseError:function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},setInput:function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===s.length?this.yylloc.first_column:0)+s[s.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},test_match:function(t,e){var i,s,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(s=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=s.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var n in r)this[n]=r[n];return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,s,r=this._currentRules(),n=0;n<r.length;n++)if((i=this._input.match(this.rules[r[n]]))&&(!e||i[0].length>e[0].length)){if(e=i,s=n,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,r[n])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[s]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(t,e,i,s){switch(i){case 0:return 40;case 1:case 39:return 44;case 2:case 40:return 45;case 3:case 41:return 46;case 4:case 42:return 47;case 5:case 6:case 8:case 9:case 10:case 11:case 51:case 53:case 59:break;case 7:case 74:return 5;case 12:case 29:return this.pushState("SCALE"),16;case 13:case 30:return 17;case 14:case 20:case 31:case 46:case 49:this.popState();break;case 15:return this.begin("acc_title"),32;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),34;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),38;case 25:return this.popState(),39;case 26:return this.pushState("CLASS"),41;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;case 28:return this.popState(),43;case 32:this.pushState("STATE");break;case 33:case 36:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),24;case 34:case 37:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),25;case 35:case 38:return this.popState(),e.yytext=e.yytext.slice(0,-10).trim(),26;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";case 45:case 61:return this.popState(),"ID";case 47:return"STATE_DESCR";case 48:return 18;case 50:return this.popState(),this.pushState("struct"),19;case 52:return this.popState(),20;case 54:return this.begin("NOTE"),28;case 55:return this.popState(),this.pushState("NOTE_ID"),52;case 56:return this.popState(),this.pushState("NOTE_ID"),53;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 60:return"NOTE_TEXT";case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;case 63:return this.popState(),e.yytext=e.yytext.substr(2).trim(),30;case 64:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),30;case 65:case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return e.yytext=e.yytext.trim(),13;case 71:return 14;case 72:return 27;case 73:return 51;case 75:return"INVALID"}},rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}},L.prototype=w,w.Parser=L,new L}();i.parser=i;let s="state",r="relation",n="default",a="divider",o="start",l="color",c="fill",h="LR",d=[],u={},p=()=>({relations:[],states:{},documents:{}}),g={root:p()},f=g.root,y=0,_=0,m=t=>JSON.parse(JSON.stringify(t)),x=(t,i,n)=>{if(i.stmt===r)x(t,i.state1,!0),x(t,i.state2,!1);else if(i.stmt===s&&("[*]"===i.id?(i.id=n?t.id+"_start":t.id+"_end",i.start=n):i.id=i.id.trim()),i.doc){let t,r=[],n=[];for(t=0;t<i.doc.length;t++)if(i.doc[t].type===a){let e=m(i.doc[t]);e.doc=m(n),r.push(e),n=[]}else n.push(i.doc[t]);if(r.length>0&&n.length>0){let t={stmt:s,id:(0,e.I)(),type:"divider",doc:m(n)};r.push(m(t)),i.doc=r}i.doc.forEach(t=>x(i,t,!0))}},S=function(t,i=n,s=null,r=null,a=null,o=null,l=null,c=null){let h=null==t?void 0:t.trim();void 0===f.states[h]?(e.l.info("Adding state ",h,r),f.states[h]={id:h,descriptions:[],type:i,doc:s,note:a,classes:[],styles:[],textStyles:[]}):(f.states[h].doc||(f.states[h].doc=s),f.states[h].type||(f.states[h].type=i)),r&&(e.l.info("Setting state description",h,r),"string"==typeof r&&v(h,r.trim()),"object"==typeof r&&r.forEach(t=>v(h,t.trim()))),a&&(f.states[h].note=a,f.states[h].note.text=e.e.sanitizeText(f.states[h].note.text,(0,e.c)())),o&&(e.l.info("Setting state classes",h,o),("string"==typeof o?[o]:o).forEach(t=>C(h,t.trim()))),l&&(e.l.info("Setting state styles",h,l),("string"==typeof l?[l]:l).forEach(t=>D(h,t.trim()))),c&&(e.l.info("Setting state styles",h,l),("string"==typeof c?[c]:c).forEach(t=>w(h,t.trim())))},b=function(t){f=(g={root:p()}).root,y=0,u={},t||(0,e.v)()},k=function(t){return f.states[t]};function T(t=""){let e=t;return"[*]"===t&&(y++,e=`${o}${y}`),e}function E(t="",e=n){return"[*]"===t?o:e}let $=function(t,i,s){if("object"==typeof t){let r,n,a,o;r=T(t.id.trim()),n=E(t.id.trim(),t.type),a=T(i.id.trim()),o=E(i.id.trim(),i.type),S(r,n,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),S(a,o,i.doc,i.description,i.note,i.classes,i.styles,i.textStyles),f.relations.push({id1:r,id2:a,relationTitle:e.e.sanitizeText(s,(0,e.c)())})}else{let r=T(t.trim()),a=E(t),o=function(t=""){let e=t;return"[*]"===t&&(y++,e=`end${y}`),e}(i.trim()),l=function(t="",e=n){return"[*]"===t?"end":e}(i);S(r,a),S(o,l),f.relations.push({id1:r,id2:o,title:e.e.sanitizeText(s,(0,e.c)())})}},v=function(t,i){let s=f.states[t],r=i.startsWith(":")?i.replace(":","").trim():i;s.descriptions.push(e.e.sanitizeText(r,(0,e.c)()))},A=function(t,e=""){void 0===u[t]&&(u[t]={id:t,styles:[],textStyles:[]});let i=u[t];null!=e&&e.split(",").forEach(t=>{let e=t.replace(/([^;]*);/,"$1").trim();if(t.match(l)){let t=e.replace(c,"bgFill").replace(l,c);i.textStyles.push(t)}i.styles.push(e)})},C=function(t,e){t.split(",").forEach(function(t){let i=k(t);if(void 0===i){let e=t.trim();S(e),i=k(e)}i.classes.push(e)})},D=function(t,e){let i=k(t);void 0!==i&&i.textStyles.push(e)},w=function(t,e){let i=k(t);void 0!==i&&i.textStyles.push(e)},L={getConfig:()=>(0,e.c)().state,addState:S,clear:b,getState:k,getStates:function(){return f.states},getRelations:function(){return f.relations},getClasses:function(){return u},getDirection:()=>h,addRelation:$,getDividerId:()=>"divider-id-"+ ++_,setDirection:t=>{h=t},cleanupLabel:function(t){return":"===t.substring(0,1)?t.substr(2).trim():t.trim()},lineType:{LINE:0,DOTTED_LINE:1},relationType:{AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},logDocuments:function(){e.l.info("Documents = ",g)},getRootDoc:()=>d,setRootDoc:t=>{e.l.info("Setting root doc",t),d=t},getRootDocV2:()=>(x({id:"root"},{id:"root",doc:d},!0),{id:"root",doc:d}),extract:t=>{let i;i=t.doc?t.doc:t,e.l.info(i),b(!0),e.l.info("Extract",i),i.forEach(t=>{switch(t.stmt){case s:S(t.id.trim(),t.type,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles);break;case r:$(t.state1,t.state2,t.description);break;case"classDef":A(t.id.trim(),t.classes);break;case"applyClass":C(t.id.trim(),t.styleClass)}})},trimColon:t=>t&&":"===t[0]?t.substr(1).trim():t.trim(),getAccTitle:e.g,setAccTitle:e.s,getAccDescription:e.a,setAccDescription:e.b,addStyleClass:A,setCssClass:C,addDescription:v,setDiagramTitle:e.q,getDiagramTitle:e.t},B=t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`;t.s(["D",()=>n,"S",()=>r,"a",()=>a,"b",()=>s,"c",()=>"TB","d",()=>L,"p",()=>i,"s",()=>B])},858053,t=>{"use strict";let e;var i=t.i(763979);t.i(947716);var s=t.i(785833),r=t.i(600104),n=t.i(723685);t.i(461696);var a=t.i(915888);t.i(566661);var o=t.i(704642),l=t.i(733773);t.i(440524),t.i(822315),t.i(139941),t.i(424154);let c={},h=(t,e,i)=>{let s,r=(0,l.c)().state.padding,n=2*(0,l.c)().state.padding,a=t.node().getBBox(),o=a.width,c=a.x,h=t.append("text").attr("x",0).attr("y",(0,l.c)().state.titleShift).attr("font-size",(0,l.c)().state.fontSize).attr("class","state-title").text(e.id),d=h.node().getBBox().width+n,u=Math.max(d,o);u===o&&(u+=n);let p=t.node().getBBox();e.doc,s=c-r,d>o&&(s=(o-u)/2+r),Math.abs(c-p.x)<r&&d>o&&(s=c-(d-o)/2);let g=1-(0,l.c)().state.textHeight;return t.insert("rect",":first-child").attr("x",s).attr("y",g).attr("class",i?"alt-composit":"composit").attr("width",u).attr("height",p.height+(0,l.c)().state.textHeight+(0,l.c)().state.titleShift+1).attr("rx","0"),h.attr("x",s+r),d<=o&&h.attr("x",c+(u-n)/2-d/2+r),t.insert("rect",":first-child").attr("x",s).attr("y",(0,l.c)().state.titleShift-(0,l.c)().state.textHeight-(0,l.c)().state.padding).attr("width",u).attr("height",3*(0,l.c)().state.textHeight).attr("rx",(0,l.c)().state.radius),t.insert("rect",":first-child").attr("x",s).attr("y",(0,l.c)().state.titleShift-(0,l.c)().state.textHeight-(0,l.c)().state.padding).attr("width",u).attr("height",p.height+3+2*(0,l.c)().state.textHeight).attr("rx",(0,l.c)().state.radius),t},d=function(t,e){var i,s;let r,n,a,o,h,d,u,p,g,f,y=e.id,_={id:y,label:e.id,width:0,height:0},m=t.append("g").attr("id",y).attr("class","stateGroup");"start"===e.type&&m.append("circle").attr("class","start-state").attr("r",(0,l.c)().state.sizeUnit).attr("cx",(0,l.c)().state.padding+(0,l.c)().state.sizeUnit).attr("cy",(0,l.c)().state.padding+(0,l.c)().state.sizeUnit),"end"===e.type&&(m.append("circle").attr("class","end-state-outer").attr("r",(0,l.c)().state.sizeUnit+(0,l.c)().state.miniPadding).attr("cx",(0,l.c)().state.padding+(0,l.c)().state.sizeUnit+(0,l.c)().state.miniPadding).attr("cy",(0,l.c)().state.padding+(0,l.c)().state.sizeUnit+(0,l.c)().state.miniPadding),m.append("circle").attr("class","end-state-inner").attr("r",(0,l.c)().state.sizeUnit).attr("cx",(0,l.c)().state.padding+(0,l.c)().state.sizeUnit+2).attr("cy",(0,l.c)().state.padding+(0,l.c)().state.sizeUnit+2)),("fork"===e.type||"join"===e.type)&&((t,e)=>{let i=(0,l.c)().state.forkWidth,s=(0,l.c)().state.forkHeight;if(e.parentId){let t=i;i=s,s=t}return t.append("rect").style("stroke","black").style("fill","black").attr("width",i).attr("height",s).attr("x",(0,l.c)().state.padding).attr("y",(0,l.c)().state.padding)})(m,e),"note"===e.type&&((t,e)=>{e.attr("class","state-note");let i=e.append("rect").attr("x",0).attr("y",(0,l.c)().state.padding),{textWidth:s,textHeight:r}=((t,e,i,s)=>{let r=0,n=s.append("text");n.style("text-anchor","start"),n.attr("class","noteText");let a=t.replace(/\r\n/g,"<br/>"),o=(a=a.replace(/\n/g,"<br/>")).split(l.e.lineBreakRegex),c=1.25*(0,l.c)().state.noteMargin;for(let t of o){let s=t.trim();if(s.length>0){let t=n.append("tspan");t.text(s),0===c&&(c+=t.node().getBBox().height),r+=c,t.attr("x",e+(0,l.c)().state.noteMargin),t.attr("y",i+r+1.25*(0,l.c)().state.noteMargin)}}return{textWidth:n.node().getBBox().width,textHeight:r}})(t,0,0,e.append("g"));return i.attr("height",r+2*(0,l.c)().state.noteMargin),i.attr("width",s+2*(0,l.c)().state.noteMargin)})(e.note.text,m),"divider"===e.type&&m.append("line").style("stroke","grey").style("stroke-dasharray","3").attr("x1",(0,l.c)().state.textHeight).attr("class","divider").attr("x2",2*(0,l.c)().state.textHeight).attr("y1",0).attr("y2",0),"default"===e.type&&0===e.descriptions.length&&(r=m.append("text").attr("x",2*(0,l.c)().state.padding).attr("y",(0,l.c)().state.textHeight+2*(0,l.c)().state.padding).attr("font-size",(0,l.c)().state.fontSize).attr("class","state-title").text(e.id).node().getBBox(),m.insert("rect",":first-child").attr("x",(0,l.c)().state.padding).attr("y",(0,l.c)().state.padding).attr("width",r.width+2*(0,l.c)().state.padding).attr("height",r.height+2*(0,l.c)().state.padding).attr("rx",(0,l.c)().state.radius)),"default"===e.type&&e.descriptions.length>0&&(n=function(t,e,i){let s=t.append("tspan").attr("x",2*(0,l.c)().state.padding).text(e);i||s.attr("dy",(0,l.c)().state.textHeight)},o=(a=m.append("text").attr("x",2*(0,l.c)().state.padding).attr("y",(0,l.c)().state.textHeight+1.3*(0,l.c)().state.padding).attr("font-size",(0,l.c)().state.fontSize).attr("class","state-title").text(e.descriptions[0]).node().getBBox()).height,h=m.append("text").attr("x",(0,l.c)().state.padding).attr("y",o+.4*(0,l.c)().state.padding+(0,l.c)().state.dividerMargin+(0,l.c)().state.textHeight).attr("class","state-description"),d=!0,u=!0,e.descriptions.forEach(function(t){d||(n(h,t,u),u=!1),d=!1}),p=m.append("line").attr("x1",(0,l.c)().state.padding).attr("y1",(0,l.c)().state.padding+o+(0,l.c)().state.dividerMargin/2).attr("y2",(0,l.c)().state.padding+o+(0,l.c)().state.dividerMargin/2).attr("class","descr-divider"),f=Math.max((g=h.node().getBBox()).width,a.width),p.attr("x2",f+3*(0,l.c)().state.padding),m.insert("rect",":first-child").attr("x",(0,l.c)().state.padding).attr("y",(0,l.c)().state.padding).attr("width",f+2*(0,l.c)().state.padding).attr("height",g.height+o+2*(0,l.c)().state.padding).attr("rx",(0,l.c)().state.radius));let x=m.node().getBBox();return _.width=x.width+2*(0,l.c)().state.padding,_.height=x.height+2*(0,l.c)().state.padding,i=y,s=_,c[i]=s,_},u=0,p=function(t,e,n){e.points=e.points.filter(t=>!Number.isNaN(t.y));let a=e.points,o=(0,s.line)().x(function(t){return t.x}).y(function(t){return t.y}).curve(r.curveBasis),c=t.append("path").attr("d",o(a)).attr("id","edge"+u).attr("class","transition"),h="";if((0,l.c)().state.arrowMarkerAbsolute&&(h=(h=(h=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search).replace(/\(/g,"\\(")).replace(/\)/g,"\\)")),c.attr("marker-end","url("+h+"#"+function(t){switch(t){case i.d.relationType.AGGREGATION:return"aggregation";case i.d.relationType.EXTENSION:return"extension";case i.d.relationType.COMPOSITION:return"composition";case i.d.relationType.DEPENDENCY:return"dependency"}}(i.d.relationType.DEPENDENCY)+"End)"),void 0!==n.title){let i=t.append("g").attr("class","stateLabel"),{x:s,y:r}=l.u.calcLabelPosition(e.points),a=l.e.getRows(n.title),o=0,c=[],h=0,d=0;for(let t=0;t<=a.length;t++){let e=i.append("text").attr("text-anchor","middle").text(a[t]).attr("x",s).attr("y",r+o),n=e.node().getBBox();h=Math.max(h,n.width),d=Math.min(d,n.x),l.l.info(n.x,s,r+o),0===o&&(o=e.node().getBBox().height,l.l.info("Title height",o,r)),c.push(e)}let u=o*a.length;if(a.length>1){let t=(a.length-1)*o*.5;c.forEach((e,i)=>e.attr("y",r+i*o-t)),u=o*a.length}let p=i.node().getBBox();i.insert("rect",":first-child").attr("class","box").attr("x",s-h/2-(0,l.c)().state.padding/2).attr("y",r-u/2-(0,l.c)().state.padding/2-3.5).attr("width",h+(0,l.c)().state.padding).attr("height",u+(0,l.c)().state.padding),l.l.info(p)}u++},g={},f=function(t){t.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 19,7 L9,13 L14,7 L9,1 Z")},y=(t,i,s,r,n,c,u)=>{let f,_=new o.Graph({compound:!0,multigraph:!0}),m=!0;for(f=0;f<t.length;f++)if("relation"===t[f].stmt){m=!1;break}s?_.setGraph({rankdir:"LR",multigraph:!0,compound:!0,ranker:"tight-tree",ranksep:m?1:e.edgeLengthFactor,nodeSep:m?1:50,isMultiGraph:!0}):_.setGraph({rankdir:"TB",multigraph:!0,compound:!0,ranksep:m?1:e.edgeLengthFactor,nodeSep:m?1:50,ranker:"tight-tree",isMultiGraph:!0}),_.setDefaultEdgeLabel(function(){return{}}),u.db.extract(t);let x=u.db.getStates(),S=u.db.getRelations();for(let t of Object.keys(x)){let a,o=x[t];if(s&&(o.parentId=s),o.doc){let t=i.append("g").attr("id",o.id).attr("class","stateGroup");a=y(o.doc,t,o.id,!r,n,c,u);{let i=(t=h(t,o,r)).node().getBBox();a.width=i.width,a.height=i.height+e.padding/2,g[o.id]={y:e.compositTitleSize}}}else a=d(i,o);if(o.note){let t=d(i,{descriptions:[],id:o.id+"-note",note:o.note,type:"note"});"left of"===o.note.position?(_.setNode(a.id+"-note",t),_.setNode(a.id,a)):(_.setNode(a.id,a),_.setNode(a.id+"-note",t)),_.setParent(a.id,a.id+"-group"),_.setParent(a.id+"-note",a.id+"-group")}else _.setNode(a.id,a)}l.l.debug("Count=",_.nodeCount(),_);let b=0;S.forEach(function(t){let i;b++,l.l.debug("Setting edge",t),_.setEdge(t.id1,t.id2,{relation:t,width:(i=t.title)?i.length*e.fontSizeFactor:1,height:e.labelHeight*l.e.getRows(t.title).length,labelpos:"c"},"id"+b)}),(0,a.layout)(_),l.l.debug("Graph after layout",_.nodes());let k=i.node();_.nodes().forEach(function(t){void 0!==t&&void 0!==_.node(t)?(l.l.warn("Node "+t+": "+JSON.stringify(_.node(t))),n.select("#"+k.id+" #"+t).attr("transform","translate("+(_.node(t).x-_.node(t).width/2)+","+(_.node(t).y+(g[t]?g[t].y:0)-_.node(t).height/2)+" )"),n.select("#"+k.id+" #"+t).attr("data-x-shift",_.node(t).x-_.node(t).width/2),c.querySelectorAll("#"+k.id+" #"+t+" .divider").forEach(t=>{let e=t.parentElement,i=0,s=0;e&&(e.parentElement&&(i=e.parentElement.getBBox().width),Number.isNaN(s=parseInt(e.getAttribute("data-x-shift"),10))&&(s=0)),t.setAttribute("x1",0-s+8),t.setAttribute("x2",i-s-8)})):l.l.debug("No Node "+t+": "+JSON.stringify(_.node(t)))});let T=k.getBBox();_.edges().forEach(function(t){void 0!==t&&void 0!==_.edge(t)&&(l.l.debug("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(_.edge(t))),p(i,_.edge(t),_.edge(t).relation))});let E={id:s||"root",label:s||"root",width:0,height:0};return E.width=(T=k.getBBox()).width+2*e.padding,E.height=T.height+2*e.padding,l.l.debug("Doc rendered",E,_),E},_={parser:i.p,db:i.d,renderer:{setConf:function(){},draw:function(t,i,s,r){let a;e=(0,l.c)().state;let o=(0,l.c)().securityLevel;"sandbox"===o&&(a=(0,n.select)("#i"+i));let c="sandbox"===o?(0,n.select)(a.nodes()[0].contentDocument.body):(0,n.select)("body"),h="sandbox"===o?a.nodes()[0].contentDocument:document;l.l.debug("Rendering diagram "+t);let d=c.select(`[id='${i}']`);f(d),y(r.db.getRootDoc(),d,void 0,!1,c,h,r);let u=e.padding,p=d.node().getBBox(),g=p.width+2*u,_=p.height+2*u;(0,l.i)(d,_,1.75*g,e.useMaxWidth),d.attr("viewBox",`${p.x-e.padding}  ${p.y-e.padding} `+g+" "+_)}},styles:i.s,init:t=>{t.state||(t.state={}),t.state.arrowMarkerAbsolute=t.arrowMarkerAbsolute,i.d.clear()}};t.s(["diagram",()=>_])}]);