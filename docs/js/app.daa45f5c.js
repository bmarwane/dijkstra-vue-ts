(function(t){function e(e){for(var i,a,s=e[0],c=e[1],u=e[2],l=0,h=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);d&&d(e);while(h.length)h.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={app:0},r=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/dijkstra-vue-ts/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var d=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"27da":function(t,e,n){"use strict";var i=n("586e"),o=n.n(i);o.a},"586e":function(t,e,n){},"5c0b":function(t,e,n){"use strict";var i=n("9c0c"),o=n.n(i);o.a},"9c0c":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i,o=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],s=(n("5c0b"),n("2877")),c={},u=Object(s["a"])(c,r,a,!1,null,null,null),d=u.exports,l=n("8c4f"),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demopage"},[n("div",{staticClass:"demo-map"},[n("Visualizer",{key:"res"+t.version,attrs:{nodes:t.nodes,links:t.links,foundPath:t.foundPath,startingNode:t.startingNode,endNode:t.endNode},on:{recordingEnd:function(e){t.searching=!1},nodeClick:t.onNodeClick}}),n("div",{staticClass:"actions"},[n("button",{staticClass:"btn btn-success btn-block mt-2",attrs:{disabled:t.searching||!this.startingNode||!this.endNode},on:{click:t.searchPath}},[t._v("GO")])])],1),t._m(0)])},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"readme"},[n("h3",[t._v("Algorithme de Dijkstra")]),n("p",[t._v("Exemple d'implémentation avec Vue et Typescript")]),n("div",{staticClass:"alert alert-primary",attrs:{role:"alert"}},[t._v("Cliquez sur deux noeuds pour tester l'algorithme")]),n("hr"),n("h4",[t._v("Code couleurs des liens")]),n("p",[t._v("le lien entre deux noeuds porte un poid, pour cet exemple le lien entre 2 noeuds représente une route entre deux points dans une carte")]),n("p",[t._v('On a dans cet exemple 3 types de "routes"')]),n("ul",{staticClass:"list-unstyled routes-info"},[n("li",[n("span",{staticClass:"normal_route"}),t._v(" Trafic normal ( poids = 1) ")]),n("li",[n("span",{staticClass:"road_construction_route"}),t._v(" Travaux sur la route ( poids = 5) ")]),n("li",[n("span",{staticClass:"crowded_route"}),t._v(" Embouteillage sur la route ( poids = 9) ")])])])}],p=n("d4ec"),v=n("bee2"),g=n("99de"),b=n("7e84"),y=n("262e"),m=n("9ab4"),_=n("60a3"),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root"},[t._l(t.nodes,(function(e,i){return n("div",{key:"node_"+e.x+"_"+e.y,ref:"node_"+e.x+"_"+e.y,refInFor:!0,staticClass:"node",class:(t.isPlayingRecording?"":"clickable")+" "+t.getNodeColor(e),style:{left:e.x-8+"px",top:e.y-8+"px"},on:{click:function(){return t.$emit("nodeClick",e)}}},[n("span",[t._v(t._s(i))])])})),t._l(t.links,(function(e){return n("div",{key:"link_"+e.pointA.x+"_"+e.pointA.y+"_"+e.pointB.x+"_"+e.pointB.y,ref:"link_"+e.pointA.x+"_"+e.pointA.y+"_"+e.pointB.x+"_"+e.pointB.y,refInFor:!0,staticClass:"line",class:e.visitState+" "+t.getWeightState(e)+" link_"+e.pointA.x+"_"+e.pointA.y+"_"+e.pointB.x+"_"+e.pointB.y,on:{click:function(){return t.rotateWeight(e)}}})}))],2)},k=[],w=(n("99af"),n("c740"),n("d3b7"),n("159b"),n("96cf"),function t(e,n,i){Object(p["a"])(this,t),this.x=0,this.y=0,this.x=e,this.y=n,this.index=i}),N=function t(){Object(p["a"])(this,t),this.weight=1,this.visitState=i.unvisited};function O(t,e,n){var i=t.offsetTop+t.offsetHeight/2,o=e.offsetTop+e.offsetHeight/2,r=t.offsetLeft+t.offsetWidth/2,a=e.offsetLeft+e.offsetWidth/2,s=Math.abs(o-i),c=Math.abs(a-r),u=Math.sqrt(s*s+c*c),d=180/Math.PI*Math.acos(s/u);if(o>i)var l=(o-i)/2+i;else l=(i-o)/2+o;if(a>r)var h=(a-r)/2+r;else h=(r-a)/2+a;(i<o&&r<a||o<i&&a<r||i>o&&r>a||o>i&&a>r)&&(d*=-1),l-=u/2,n.style.transform="rotate("+d+"deg)",n.style.top=l+"px",n.style.left=h+"px",n.style.height=u+"px"}function j(t){return new Promise((function(e){return setTimeout(e,t)}))}(function(t){t["unvisited"]="unvisited",t["visited"]="visited",t["visiting"]="visiting",t["processing"]="processing",t["inpath"]="inpath"})(i||(i={}));var P=function(t){function e(){var t;return Object(p["a"])(this,e),t=Object(g["a"])(this,Object(b["a"])(e).apply(this,arguments)),t.isPlayingRecording=!1,t}return Object(y["a"])(e,t),Object(v["a"])(e,[{key:"mounted",value:function(){var t=this;this.links.forEach((function(e){O(t.$refs["node_".concat(e.pointA.x,"_").concat(e.pointA.y)][0],t.$refs["node_".concat(e.pointB.x,"_").concat(e.pointB.y)][0],t.$refs["link_".concat(e.pointA.x,"_").concat(e.pointA.y,"_").concat(e.pointB.x,"_").concat(e.pointB.y)][0])})),setTimeout((function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return t.isPlayingRecording=!0,e.next=3,regeneratorRuntime.awrap(t.playRecording());case 3:t.$emit("recordingEnd"),t.isPlayingRecording=!1;case 5:case"end":return e.stop()}}))}))}},{key:"getNodeColor",value:function(t){return t===this.startingNode?"starting-node":t===this.endNode?"end-node":""}},{key:"rotateWeight",value:function(t){var e=[{value:1,css:"normal"},{value:3,css:"roadRepairs"},{value:5,css:"crowded"}],n=e.findIndex((function(e){return e.value===t.weight})),i=e[(n+1)%3];t.weight=i.value}},{key:"getWeightState",value:function(t){return 1===t.weight?"normal":3===t.weight?"roadRepairs":5===t.weight?"crowded":void 0}},{key:"playRecording",value:function(){var t,e,n,o,r,a,s,c=this;return regeneratorRuntime.async((function(u){while(1)switch(u.prev=u.next){case 0:if(this.foundPath){u.next=2;break}return u.abrupt("return");case 2:t=function(t,e){var n=c.$refs["node_".concat(t.x,"_").concat(t.y)];n[0].className="node ".concat(e)},e=function(t,e,n,i,o){var r=c.$refs["link_".concat(t,"_").concat(e,"_").concat(n,"_").concat(i)];r||(r=c.$refs["link_".concat(n,"_").concat(i,"_").concat(t,"_").concat(e)]),r[0].className="line ".concat(o)},n=0;case 5:if(!(n<this.foundPath.recordings.length)){u.next=14;break}if(o=this.foundPath.recordings[n],!(o.target instanceof w)){u.next=11;break}return t(o.target,o.newVisitState),u.next=11,regeneratorRuntime.awrap(j(10));case 11:n++,u.next=5;break;case 14:if(this.foundPath.path){u.next=16;break}return u.abrupt("return");case 16:r=0;case 17:if(!(r<this.foundPath.path.length)){u.next=27;break}return a=this.foundPath.path[r],s=this.foundPath.path[r-1],this.foundPath.path[r+1],s&&e(s.x,s.y,a.x,a.y,i.inpath),u.next=24,regeneratorRuntime.awrap(j(30));case 24:r++,u.next=17;break;case 27:case"end":return u.stop()}}),null,this)}}]),e}(_["c"]);m["a"]([Object(_["b"])()],P.prototype,"nodes",void 0),m["a"]([Object(_["b"])()],P.prototype,"links",void 0),m["a"]([Object(_["b"])()],P.prototype,"foundPath",void 0),m["a"]([Object(_["b"])()],P.prototype,"startingNode",void 0),m["a"]([Object(_["b"])()],P.prototype,"endNode",void 0),P=m["a"]([_["a"]],P);var C=P,S=C,A=(n("27da"),Object(s["a"])(S,x,k,!1,null,"1e4ff943",null)),E=A.exports,B=(n("4de4"),n("7db0"),n("d81d"),n("a434"),n("2909"));function R(t,e,n,o){var r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=[],s=t.map((function(t){return new $(t)}));s[n].shortestDistanceFromStart=0;var c,u=Object(B["a"])(t),d=!1;while(!d){if(c=v(),!c)break;g(c,i.processing);var l=e.filter((function(t){return t.pointA===c||t.pointB===c}));if(l.forEach((function(t){var e=p(t.pointB);if(e){var n=p(t.pointA);if(n){var o,r;c===t.pointA?(r=n,o=e):(r=e,o=n),g(r.node,i.visiting),g(o.node,i.visiting);var a=t.weight+r.shortestDistanceFromStart;a<o.shortestDistanceFromStart&&(o.shortestDistanceFromStart=a,c&&(o.previousNode=c)),g(r.node,i.visited),g(o.node,i.visited)}}})),c===t[o]){d=!0;break}u.splice(u.findIndex((function(t){return t===c})),1)}var h=d?f():void 0;function f(){var e=[],r=p(t[o]);while(r&&r.node!==t[n])g(r.node,i.inpath),e.unshift(r.node),r=p(r.previousNode),r&&!r.previousNode&&(g(r.node,i.inpath),e.unshift(r.node));return e}function p(t){return s.find((function(e){return e.node===t}))}function v(){return u.reduce((function(t,e,n,i){var o=s.find((function(t){return t.node===e})),r=t?s.find((function(e){return e.node===t})):void 0;return!r&&o?o.node:o&&r?o.shortestDistanceFromStart<r.shortestDistanceFromStart?o.node:r.node:t}),void 0)}function g(t,e){r&&a.push(new T(t,e))}return{recordings:a,path:h}}var $=function t(e){Object(p["a"])(this,t),this.node=e,this.shortestDistanceFromStart=1/0},T=function t(e,n){Object(p["a"])(this,t),this.target=e,this.newVisitState=n},D=function(t){function e(){var t;return Object(p["a"])(this,e),t=Object(g["a"])(this,Object(b["a"])(e).call(this)),t.nodes=[],t.links=[],t.path=[],t.version=0,t.tmpNodes=void 0,t.tmpPoints=[],t.startingNode=null,t.endNode=null,t.searching=!1,t.foundPath=null,t}return Object(y["a"])(e,t),Object(v["a"])(e,[{key:"mounted",value:function(){this.foundPath=null,this.version=1,this.prepareExampleData()}},{key:"onNodeClick",value:function(t){t!==this.startingNode?t!==this.endNode?this.startingNode?this.endNode?this.startingNode&&this.endNode&&(this.startingNode=t,this.endNode=null):this.endNode=t:this.startingNode=t:this.endNode=null:this.startingNode=null}},{key:"searchPath",value:function(){this.startingNode&&this.endNode&&(this.searching=!0,this.foundPath=R(this.nodes,this.links,this.startingNode.index,this.endNode.index),this.version+=1)}},{key:"prepareExampleData",value:function(){var t=this;this.tmpNodes=[];var e=[[44,37],[125,283],[105,37],[178,257],[265,32],[323,213],[372,36],[431,187],[547,42],[562,173],[608,38],[599,170],[240,244],[299,406],[180,469],[427,383],[538,373],[504,182],[585,368]],n=[[0,1,1],[0,2,1],[2,4,1],[2,3,1],[1,3,1],[3,12,1],[12,5,1],[4,5,1],[4,6,1],[5,7,1],[6,7,1],[6,8,1],[7,17,1],[8,9,1],[8,10,1],[17,9,1],[10,11,1],[9,11,1],[1,14,1],[14,13,1],[12,13,1],[13,15,1],[15,16,1],[17,16,1],[16,18,1],[11,18,1]];e.forEach((function(e,n){t.tmpNodes&&t.tmpNodes.push(new w(e[0],e[1],n))})),this.nodes=this.tmpNodes,n.forEach((function(e){t.linkTwoPoints(e[0],e[1],e[2])})),delete this.tmpNodes}},{key:"linkTwoPoints",value:function(t,e,n){var i=new N;i.pointA=this.nodes[t],i.pointB=this.nodes[e],i.weight=n,this.links.push(i)}}]),e}(_["c"]);D=m["a"]([Object(_["a"])({components:{Visualizer:E}})],D);var F=D,M=F,W=(n("dc68"),Object(s["a"])(M,h,f,!1,null,"76d601d4",null)),I=W.exports;o["a"].use(l["a"]);var V=[{path:"/",name:"home",component:I}],z=new l["a"]({mode:"history",base:"/dijkstra-vue-ts/",routes:V}),q=z,H=n("2f62");o["a"].use(H["a"]);var J=new H["a"].Store({state:{},mutations:{},actions:{},modules:{}});o["a"].config.productionTip=!1,new o["a"]({router:q,store:J,render:function(t){return t(d)}}).$mount("#app")},dc68:function(t,e,n){"use strict";var i=n("e0a1"),o=n.n(i);o.a},e0a1:function(t,e,n){}});
//# sourceMappingURL=app.daa45f5c.js.map