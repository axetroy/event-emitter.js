(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EventEmitter"] = factory();
	else
		root["EventEmitter"] = factory();
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by axetroy on 2017/3/6.
 */
/// <reference path="./index.d.ts" />

var name = '@axetroy/event-emitter.js';
var id_Identifier = '__id__';

function randomId() {
  return Math.random().toString(36).substr(2, 16);
}

function findIndexById(id) {
  return this.findIndex(function (callback) {
    return callback[id_Identifier] === id;
  });
}

var defineProperty = Object.defineProperty;

function EventEmitter() {
  this[name] = {};
  defineProperty && defineProperty(this, name, { enumerable: false, configurable: false });
}

var prototype = EventEmitter.prototype;

prototype.constructor = EventEmitter;

prototype.on = function (event, listener) {
  var events = this[name],
      container = events[event] = events[event] || [],
      id = randomId(),
      index = void 0;
  listener[id_Identifier] = id;
  container.push(listener);
  return function () {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
  };
};

prototype.off = function (event) {
  this[name][event] = [];
};

prototype.clear = function () {
  this[name] = {};
};

prototype.once = function (event, listener) {
  var self = this,
      events = self[name],
      container = events[event] = events[event] || [],
      id = randomId(),
      index = void 0,
      callback = function callback() {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
    listener.apply(self, arguments);
  };
  callback[id_Identifier] = id;
  container.push(callback);
};

prototype.emit = function () {
  var self = this,
      argv = [].slice.call(arguments),
      event = argv.shift(),
      events = self[name];
  (events['*'] || []).concat(events[event] || []).map(function (listener) {
    return self.emitting(event, argv, listener);
  });
};

prototype.emitting = function (event, dataArray, listener) {
  listener.apply(this, dataArray);
};

/* harmony default export */ __webpack_exports__["default"] = EventEmitter;

/***/ })
/******/ ]);
});