/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mochaGlobals = __webpack_require__(2).globals;
	
	window.mocha.setup('bdd');
	window.onload = function () {
	  window.mocha.checkLeaks();
	  window.mocha.globals(Object.keys(mochaGlobals));
	  window.mocha.run();
	  __webpack_require__(3)(window);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		"globals": {
			"expect": true,
			"mock": true,
			"sandbox": true,
			"spy": true,
			"stub": true,
			"useFakeServer": true,
			"useFakeTimers": true,
			"useFakeXMLHttpRequest": true
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	module.exports = function (root) {
	  root = root ? root : global;
	  root.expect = root.chai.expect;
	
	  beforeEach(function () {
	    // Using these globally-available Sinon features is preferrable, as they're
	    // automatically restored for you in the subsequent `afterEach`
	    root.sandbox = root.sinon.sandbox.create();
	    root.stub = root.sandbox.stub.bind(root.sandbox);
	    root.spy = root.sandbox.spy.bind(root.sandbox);
	    root.mock = root.sandbox.mock.bind(root.sandbox);
	    root.useFakeTimers = root.sandbox.useFakeTimers.bind(root.sandbox);
	    root.useFakeXMLHttpRequest = root.sandbox.useFakeXMLHttpRequest.bind(root.sandbox);
	    root.useFakeServer = root.sandbox.useFakeServer.bind(root.sandbox);
	  });
	
	  afterEach(function () {
	    delete root.stub;
	    delete root.spy;
	    root.sandbox.restore();
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	describe('test', function () {});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmVmYmI5NjY1ZDVlMzEyZTc1YWUiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zZXR1cC9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc2V0dXAvLmdsb2JhbHMuanNvbiIsIndlYnBhY2s6Ly8vLi90ZXN0L3NldHVwL3NldHVwLmpzIiwid2VicGFjazovLy8uL3Rlc3QvdW5pdC9zYW1wbGUuanMiXSwibmFtZXMiOlsibW9jaGFHbG9iYWxzIiwicmVxdWlyZSIsImdsb2JhbHMiLCJ3aW5kb3ciLCJtb2NoYSIsInNldHVwIiwib25sb2FkIiwiY2hlY2tMZWFrcyIsIk9iamVjdCIsImtleXMiLCJydW4iLCJtb2R1bGUiLCJleHBvcnRzIiwicm9vdCIsImdsb2JhbCIsImV4cGVjdCIsImNoYWkiLCJiZWZvcmVFYWNoIiwic2FuZGJveCIsInNpbm9uIiwiY3JlYXRlIiwic3R1YiIsImJpbmQiLCJzcHkiLCJtb2NrIiwidXNlRmFrZVRpbWVycyIsInVzZUZha2VYTUxIdHRwUmVxdWVzdCIsInVzZUZha2VTZXJ2ZXIiLCJhZnRlckVhY2giLCJyZXN0b3JlIiwiZGVzY3JpYmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxlQUFlLG1CQUFBQyxDQUFRLENBQVIsRUFBMkJDLE9BQWhEOztBQUVBQyxRQUFPQyxLQUFQLENBQWFDLEtBQWIsQ0FBbUIsS0FBbkI7QUFDQUYsUUFBT0csTUFBUCxHQUFnQixZQUFXO0FBQ3pCSCxVQUFPQyxLQUFQLENBQWFHLFVBQWI7QUFDQUosVUFBT0MsS0FBUCxDQUFhRixPQUFiLENBQXFCTSxPQUFPQyxJQUFQLENBQVlULFlBQVosQ0FBckI7QUFDQUcsVUFBT0MsS0FBUCxDQUFhTSxHQUFiO0FBQ0FULEdBQUEsbUJBQUFBLENBQVEsQ0FBUixFQUFtQkUsTUFBbkI7QUFDRCxFQUxELEM7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7OztBQ1hBUSxRQUFPQyxPQUFQLEdBQWlCLFVBQVNDLElBQVQsRUFBZTtBQUM5QkEsVUFBT0EsT0FBT0EsSUFBUCxHQUFjQyxNQUFyQjtBQUNBRCxRQUFLRSxNQUFMLEdBQWNGLEtBQUtHLElBQUwsQ0FBVUQsTUFBeEI7O0FBRUFFLGNBQVcsWUFBTTtBQUNmO0FBQ0E7QUFDQUosVUFBS0ssT0FBTCxHQUFlTCxLQUFLTSxLQUFMLENBQVdELE9BQVgsQ0FBbUJFLE1BQW5CLEVBQWY7QUFDQVAsVUFBS1EsSUFBTCxHQUFZUixLQUFLSyxPQUFMLENBQWFHLElBQWIsQ0FBa0JDLElBQWxCLENBQXVCVCxLQUFLSyxPQUE1QixDQUFaO0FBQ0FMLFVBQUtVLEdBQUwsR0FBV1YsS0FBS0ssT0FBTCxDQUFhSyxHQUFiLENBQWlCRCxJQUFqQixDQUFzQlQsS0FBS0ssT0FBM0IsQ0FBWDtBQUNBTCxVQUFLVyxJQUFMLEdBQVlYLEtBQUtLLE9BQUwsQ0FBYU0sSUFBYixDQUFrQkYsSUFBbEIsQ0FBdUJULEtBQUtLLE9BQTVCLENBQVo7QUFDQUwsVUFBS1ksYUFBTCxHQUFxQlosS0FBS0ssT0FBTCxDQUFhTyxhQUFiLENBQTJCSCxJQUEzQixDQUFnQ1QsS0FBS0ssT0FBckMsQ0FBckI7QUFDQUwsVUFBS2EscUJBQUwsR0FBNkJiLEtBQUtLLE9BQUwsQ0FBYVEscUJBQWIsQ0FBbUNKLElBQW5DLENBQXdDVCxLQUFLSyxPQUE3QyxDQUE3QjtBQUNBTCxVQUFLYyxhQUFMLEdBQXFCZCxLQUFLSyxPQUFMLENBQWFTLGFBQWIsQ0FBMkJMLElBQTNCLENBQWdDVCxLQUFLSyxPQUFyQyxDQUFyQjtBQUNELElBVkQ7O0FBWUFVLGFBQVUsWUFBTTtBQUNkLFlBQU9mLEtBQUtRLElBQVo7QUFDQSxZQUFPUixLQUFLVSxHQUFaO0FBQ0FWLFVBQUtLLE9BQUwsQ0FBYVcsT0FBYjtBQUNELElBSkQ7QUFLRCxFQXJCRCxDOzs7Ozs7Ozs7QUNBQUMsVUFBUyxNQUFULEVBQWlCLFlBQU0sQ0FDdEIsQ0FERCxFIiwiZmlsZSI6Il9fc3BlYy1idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmVmYmI5NjY1ZDVlMzEyZTc1YWVcbiAqKi8iLCJjb25zdCBtb2NoYUdsb2JhbHMgPSByZXF1aXJlKCcuLy5nbG9iYWxzLmpzb24nKS5nbG9iYWxzO1xyXG5cclxud2luZG93Lm1vY2hhLnNldHVwKCdiZGQnKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gIHdpbmRvdy5tb2NoYS5jaGVja0xlYWtzKCk7XHJcbiAgd2luZG93Lm1vY2hhLmdsb2JhbHMoT2JqZWN0LmtleXMobW9jaGFHbG9iYWxzKSk7XHJcbiAgd2luZG93Lm1vY2hhLnJ1bigpO1xyXG4gIHJlcXVpcmUoJy4vc2V0dXAnKSh3aW5kb3cpO1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc2V0dXAvYnJvd3Nlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImdsb2JhbHNcIjoge1xuXHRcdFwiZXhwZWN0XCI6IHRydWUsXG5cdFx0XCJtb2NrXCI6IHRydWUsXG5cdFx0XCJzYW5kYm94XCI6IHRydWUsXG5cdFx0XCJzcHlcIjogdHJ1ZSxcblx0XHRcInN0dWJcIjogdHJ1ZSxcblx0XHRcInVzZUZha2VTZXJ2ZXJcIjogdHJ1ZSxcblx0XHRcInVzZUZha2VUaW1lcnNcIjogdHJ1ZSxcblx0XHRcInVzZUZha2VYTUxIdHRwUmVxdWVzdFwiOiB0cnVlXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Rlc3Qvc2V0dXAvLmdsb2JhbHMuanNvblxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocm9vdCkge1xyXG4gIHJvb3QgPSByb290ID8gcm9vdCA6IGdsb2JhbDtcclxuICByb290LmV4cGVjdCA9IHJvb3QuY2hhaS5leHBlY3Q7XHJcblxyXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgLy8gVXNpbmcgdGhlc2UgZ2xvYmFsbHktYXZhaWxhYmxlIFNpbm9uIGZlYXR1cmVzIGlzIHByZWZlcnJhYmxlLCBhcyB0aGV5J3JlXHJcbiAgICAvLyBhdXRvbWF0aWNhbGx5IHJlc3RvcmVkIGZvciB5b3UgaW4gdGhlIHN1YnNlcXVlbnQgYGFmdGVyRWFjaGBcclxuICAgIHJvb3Quc2FuZGJveCA9IHJvb3Quc2lub24uc2FuZGJveC5jcmVhdGUoKTtcclxuICAgIHJvb3Quc3R1YiA9IHJvb3Quc2FuZGJveC5zdHViLmJpbmQocm9vdC5zYW5kYm94KTtcclxuICAgIHJvb3Quc3B5ID0gcm9vdC5zYW5kYm94LnNweS5iaW5kKHJvb3Quc2FuZGJveCk7XHJcbiAgICByb290Lm1vY2sgPSByb290LnNhbmRib3gubW9jay5iaW5kKHJvb3Quc2FuZGJveCk7XHJcbiAgICByb290LnVzZUZha2VUaW1lcnMgPSByb290LnNhbmRib3gudXNlRmFrZVRpbWVycy5iaW5kKHJvb3Quc2FuZGJveCk7XHJcbiAgICByb290LnVzZUZha2VYTUxIdHRwUmVxdWVzdCA9IHJvb3Quc2FuZGJveC51c2VGYWtlWE1MSHR0cFJlcXVlc3QuYmluZChyb290LnNhbmRib3gpO1xyXG4gICAgcm9vdC51c2VGYWtlU2VydmVyID0gcm9vdC5zYW5kYm94LnVzZUZha2VTZXJ2ZXIuYmluZChyb290LnNhbmRib3gpO1xyXG4gIH0pO1xyXG5cclxuICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgZGVsZXRlIHJvb3Quc3R1YjtcclxuICAgIGRlbGV0ZSByb290LnNweTtcclxuICAgIHJvb3Quc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zZXR1cC9zZXR1cC5qc1xuICoqLyIsImRlc2NyaWJlKCd0ZXN0JywgKCkgPT4ge1xyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3VuaXQvc2FtcGxlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==