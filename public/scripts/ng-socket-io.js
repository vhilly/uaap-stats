!function(){"use strict";angular.module("socket-io",[]).factory("socket",["$rootScope","io",function(a,b){var c=b.connect(),d={},e={},f=function(a,b){var c=d[a],e=i(b);return c||(c=d[a]=[]),c.push({callback:b,wrapper:e}),e},g=function(a,b){var c,e=d[a];if(e)for(var f=e.length-1;f>=0;f--)if(e[f].callback===b){c=e[f].wrapper,e.slice(f,1);break}return c},h=function(a){delete d[a]},i=function(b){var d=angular.noop;return b&&(d=function(){var d=arguments;a.$apply(function(){b.apply(c,d)})}),d},j=function(a,b){return{bindTo:function(c){null!=c&&c.$on("$destroy",function(){e.removeListener(a,b)})}}};return e={on:function(a,b){return c.on(a,f(a,b)),j(a,b)},once:function(a,b){return c.once(a,f(a,b)),j(a,b)},removeListener:function(a,b){c.removeListener(a,g(a,b))},removeAllListeners:function(a){c.removeAllListeners(a),h(a)},emit:function(a,b,d){d?c.emit(a,b,i(d)):c.emit(a,b)}}}]).factory("io",function(){return io})}();