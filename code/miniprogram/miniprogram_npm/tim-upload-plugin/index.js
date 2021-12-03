module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1638461552269, function(require, module, exports) {
var global,factory;global=this,factory=function(){function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach((function(e){s(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var f="undefined"!=typeof wx&&"function"==typeof wx.getSystemInfoSync&&Boolean(wx.getSystemInfoSync().fontSizeSetting),u="undefined"!=typeof qq&&"function"==typeof qq.getSystemInfoSync&&Boolean(qq.getSystemInfoSync().fontSizeSetting),l="undefined"!=typeof tt&&"function"==typeof tt.getSystemInfoSync&&Boolean(tt.getSystemInfoSync().fontSizeSetting),c="undefined"!=typeof swan&&"function"==typeof swan.getSystemInfoSync&&Boolean(swan.getSystemInfoSync().fontSizeSetting),y="undefined"!=typeof my&&"function"==typeof my.getSystemInfoSync&&Boolean(my.getSystemInfoSync().fontSizeSetting),d="undefined"!=typeof uni&&"undefined"==typeof window,p=f||u||l||c||y||d,h=u?qq:l?tt:c?swan:y?my:f?wx:d?uni:{},g=function(e){if("object"!==n(e)||null===e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;for(var o=t;null!==Object.getPrototypeOf(o);)o=Object.getPrototypeOf(o);return t===o};function m(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return 0===e;if("string"==typeof e)return 0===e.length;if("function"==typeof e)return 0===e.length;if(Array.isArray(e))return 0===e.length;if(e instanceof Error)return""===e.message;if(g(e)){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}return!1}var v=function(){function e(){o(this,e),this.downloadUrl=""}return a(e,[{key:"request",value:function(e,t){var n=this;this.downloadUrl=e.downloadUrl||"";var o=(e.method||"PUT").toUpperCase(),r=e.url;if(e.qs){var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"&",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"=";return m(e)?"":g(e)?Object.keys(e).map((function(o){var r=encodeURIComponent(o)+n;return Array.isArray(e[o])?e[o].map((function(e){return r+encodeURIComponent(e)})).join(t):r+encodeURIComponent(e[o])})).filter(Boolean).join(t):void 0}(e.qs);a&&(r+="".concat(-1===r.indexOf("?")?"?":"&").concat(a))}var s=new XMLHttpRequest;s.open(o,r,!0),s.responseType=e.dataType||"text";var i=e.headers||{};if(!m(i))for(var f in i)i.hasOwnProperty(f)&&"content-length"!==f.toLowerCase()&&"user-agent"!==f.toLowerCase()&&"origin"!==f.toLowerCase()&&"host"!==f.toLowerCase()&&s.setRequestHeader(f,i[f]);return s.onload=function(){t(null,n._xhrRes(s,n._xhrBody(s)))},s.onerror=function(e){var o=n._xhrBody(s);if(o)t(e,n._xhrRes(s,o));else{var r=s.statusText;r||0!==s.status||(r="CORS blocked or network error"),t(r,n._xhrRes(s,o))}},e.onProgress&&s.upload&&(s.upload.onprogress=function(t){var n=t.total,o=t.loaded,r=Math.floor(100*o/n);e.onProgress({total:n,loaded:o,percent:(r>=100?100:r)/100})}),s.send(e.resources),s}},{key:"_xhrRes",value:function(e,t){var n={};return e.getAllResponseHeaders().trim().split("\n").forEach((function(e){if(e){var t=e.indexOf(":"),o=e.substr(0,t).trim().toLowerCase(),r=e.substr(t+1).trim();n[o]=r}})),{statusCode:e.status,statusMessage:e.statusText,headers:n,data:t}}},{key:"_xhrBody",value:function(e){return 200===e.status&&this.downloadUrl?{location:this.downloadUrl}:{response:e.responseText}}}]),e}(),b=["unknown","image","video","audio","log"],w=["name"],O=function(){function e(){o(this,e),this.downloadUrl=""}return a(e,[{key:"request",value:function(e,n){var o=this,r=e.resources,a=void 0===r?"":r,s=e.headers,f=void 0===s?{}:s,u=e.url,l=e.downloadUrl,c=void 0===l?"":l;this.downloadUrl=c;var d=null,p="",g=c.match(/^(https?:\/\/[^/]+\/)([^/]*\/?)(.*)$/),m={url:u,header:f,name:"file",filePath:a,formData:{key:p=(p=decodeURIComponent(g[3])).indexOf("?")>-1?p.split("?")[0]:p,success_action_status:200,"Content-Type":""},timeout:e.timeout||3e5};if(y){var v=m;v.name,m=t(t({},i(v,w)),{},{fileName:"file",fileType:b[e.fileType]})}return(d=h.uploadFile(t(t({},m),{},{success:function(e){o._handleResponse(e,n)},fail:function(e){o._handleResponse(e,n)}}))).onProgressUpdate((function(t){e.onProgress&&e.onProgress({total:t.totalBytesExpectedToSend,loaded:t.totalBytesSent,percent:Math.floor(t.progress)/100})})),d}},{key:"_handleResponse",value:function(e,n){var o=e.header,r={};if(o)for(var a in o)o.hasOwnProperty(a)&&(r[a.toLowerCase()]=o[a]);var s=+e.statusCode;200===s?n(null,{statusCode:s,headers:r,data:t(t({},e.data),{},{location:this.downloadUrl})}):n(e,{statusCode:s,headers:r,data:void 0})}}]),e}();return function(){function e(){o(this,e),console.log("TIMUploadPlugin.VERSION: ".concat("1.0.3")),this.retry=1,this.tryCount=0,this.systemClockOffset=0,this.httpRequest=p?new O:new v}return a(e,[{key:"uploadFile",value:function(e,t){var n=this;return this.httpRequest.request(e,(function(o,r){o&&n.tryCount<n.retry&&n.allowRetry(o)?(n.tryCount++,n.uploadFile(e,t)):(n.tryCount=0,t(o,r))}))}},{key:"allowRetry",value:function(e){var t=!1,n=!1;if(e){var o=e.headers&&(e.headers.date||e.headers.Date)||e.error&&e.error.ServerTime;try{var r=e.error&&e.error.Code,a=e.error&&e.error.Message;("RequestTimeTooSkewed"===r||"AccessDenied"===r&&"Request has expired"===a)&&(n=!0)}catch(f){}if(n&&o){var s=Date.now(),i=Date.parse(o);Math.abs(s+this.systemClockOffset-i)>=3e4&&(this.systemClockOffset=i-s,t=!0)}else 5===Math.floor(e.statusCode/100)&&(t=!0)}return t}}]),e}()},"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory():"function"==typeof define&&define.amd?define(factory):(global=global||self).TIMUploadPlugin=factory();

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1638461552269);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map