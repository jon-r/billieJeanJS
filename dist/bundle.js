!function(t){function e(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return t[n].call(u.exports,u,u.exports,e),u.l=!0,u.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist",e(e.s=5)}([function(t,e,r){"use strict";function n(t,e){i[t]=e}function u(t){return i[t]}Object.defineProperty(e,"__esModule",{value:!0}),e.cacheAdd=n,e.cacheGet=u;var i={}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={selector:"[data-gridme]",gridLines:10,rectSize:4,spawnSpeed:500,runSpeed:80,limit:10}},function(t,e,r){"use strict";function n(t,e){return Object.keys(e).forEach(function(r){return t.setAttribute(r,e[r])}),t}function u(t,e){return t%e==0&&t>0}function i(t){return u(t,this)}function a(t){return Math.floor(Math.random()*t)}function o(t){return t[a(t.length)]}function c(t,e){return t.map(function(t,r){return Number(t)+Number(e[r])})}Object.defineProperty(e,"__esModule",{value:!0}),e.setAttrs=n,e.isFactor=u,e.isFactorFilter=i,e.getRandom=a,e.randomFrom=o,e.addArr=c},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function u(t){var e=t.dataset,r=e.direction;e.direction="";var n=e.special;if("line"===n)return r;var u=JSON.parse(e.routes);if("start"===n&&r)return!1;var i=u.map(function(t){return t===g[r]?r:t});return(0,d.randomFrom)(i)}function i(t){var e=u(t);if(!e)return!1;var r=t.dataset.coords.split(","),n=m[e],i=(0,d.addArr)(r,n).join(","),a=(0,p.cacheGet)(i);return a.dataset.direction=e,a}function a(t){var e=i(t);return e?(t.classList.add("glow"),setTimeout(function(){a(e),t.classList.remove("glow")},s.default.runSpeed),!0):(v=Math.max(v-1,0),!1)}function o(){var t=h.filter(function(t){return"start"===t.dataset.special}),e=t.length;return setInterval(function(){if(v<s.default.limit){var r=(0,d.getRandom)(e);t&&a(t[r],!1),v+=1}},s.default.spawnSpeed)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var c=r(1),s=n(c),d=r(2),f=r(4),l=n(f),p=r(0),h=Array.from((0,l.default)()),v=0,m={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]},g={u:"d",d:"u",l:"r",r:"l"}},function(t,e,r){"use strict";function n(t,e){var r=JSON.parse(e.dataset.routes),n=r.length;return{direction:r[0],line:2===n,start:1===n}[t]}function u(t){var e=t[0],r=t[1],n=f.default.gridLines,u=(0,c.isFactor)(r,n),i=(0,c.isFactor)(e,n),a=[];return i&&r>0&&a.push("u"),i&&r<m-1&&a.push("d"),u&&e>0&&a.push("l"),u&&e<v-1&&a.push("r"),JSON.stringify(a)}function i(t){return n("line",t)?"line":!!n("start",t)&&"start"}function a(t){return(0,c.setAttrs)(g.cloneNode(),{x:t[0]*f.default.rectSize,y:t[1]*f.default.rectSize,"data-routes":u(t),"data-coords":t.join(",")})}function o(){var t=new Array(v).fill(),e=new Array(m).fill(),r=[];return t.forEach(function(t,n){e.forEach(function(t,e){var u=[n,e];if(u.some(c.isFactorFilter,f.default.gridLines)){var o=a(u);o.dataset.special=i(o),(0,s.cacheAdd)(u.join(","),o),p.appendChild(o),r.push(o)}})}),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var c=r(2),s=r(0),d=r(1),f=function(t){return t&&t.__esModule?t:{default:t}}(d),l=document,p=l.querySelector(f.default.selector),h=p.getBBox(),v=Math.ceil(h.width/f.default.rectSize),m=Math.ceil(h.height/f.default.rectSize),g=(0,c.setAttrs)(l.createElementNS("http://www.w3.org/2000/svg","rect"),{height:f.default.rectSize-1,width:f.default.rectSize-1,class:"grid-rect"})},function(t,e,r){"use strict";var n=r(3);(0,function(t){return t&&t.__esModule?t:{default:t}}(n).default)()}]);
//# sourceMappingURL=bundle.js.map