(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by axetroy on 2017/3/6.
 */

function randomId() {
  return Math.random().toString(36).substr(2, 16);
}

function EventEmitter() {
  this.e = {};
}

function findIndexById(id) {
  return this.findIndex(function (callback) {
    return callback.__id__ === id;
  });
}

var prototype = EventEmitter.prototype;

prototype.constructor = EventEmitter;

prototype.on = function (event, handler) {
  var container = this.e[event] = this.e[event] || [],
      id = randomId(),
      index = void 0;
  handler.__id__ = id;
  container.push(handler);
  return function () {
    index = findIndexById.call(container, id);
    index >= 0 ? container.splice(index, 1) : void 0;
  };
};

prototype.off = function (event) {
  return undefined.e[event] = [];
};

prototype.clear = undefined.e = {};

prototype.once = function (event, handler) {
  var container = this.e[event] = this.e[event] || [],
      _this = this,
      id = randomId(),
      index = void 0;

  var callback = function callback() {
    index = findIndexById.call(container, id);
    index >= 0 ? container.splice(index, 1) : void 0;
    handler.apply(_this, arguments);
  };

  callback.__id__ = id;

  container.push(callback);
};

prototype.emit = function () {
  var _this2 = this;

  var argv = [].slice.call(arguments),
      event = argv.shift();
  (this.e[event] || []).forEach(function (handler) {
    return handler.apply(_this2, argv);
  });
};

module.exports = EventEmitter;

/***/ })
/******/ ]);
});