/**
 * Created by axetroy on 2017/3/6.
 */
/// <reference path="./index.d.ts" />

const name = '@axetroy/event-emitter.js';
const id_Identifier = '__id__';

/**
 * generate random id
 */
function randomId() {
  return Math.random().toString(36).substr(2, 16);
}

/**
 * find id
 * @param id
 */
function findIndexById(id) {
  return this.findIndex(callback => callback[id_Identifier] === id);
}

const defineProperty = Object.defineProperty;

/**
 * define constructor
 */
function EventEmitter() {
  this[name] = {};
  defineProperty && defineProperty(this, name, {enumerable: false, configurable: false});
}

const prototype = EventEmitter.prototype;

/**
 * make sure constructor correct
 */
prototype.constructor = EventEmitter;

/**
 * listen on a event
 * @param event
 * @param listener
 */
prototype.on = function (event, listener) {
  let events = this[name], container = events[event] = events[event] || [], id = randomId(), index;
  listener[id_Identifier] = id;
  container.push(listener);
  return () => {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
  }
};

/**
 * remove all listen of an event
 * @param event
 */
prototype.off = function (event) {
  this[name][event] = [];
};

/**
 * clear all event listen
 */
prototype.clear = function () {
  this[name] = {};
};

/**
 * listen on a event once, it it been trigger, it will cancel the listner
 * @param event
 * @param listener
 */
prototype.once = function (event, listener) {
  let self = this, events = self[name], container = events[event] = events[event] || [], id = randomId(), index, callback = function () {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
    listener.apply(self, arguments);
  };
  callback[id_Identifier] = id;
  container.push(callback);
};

/**
 * event event
 */
prototype.emit = function () {
  const self = this, argv = [].slice.call(arguments), event = argv.shift(), events = self[name];
  ((events['*'] || []).concat(events[event] || [])).map((listener) => self.emitting(event, argv, listener));
};

/**
 * define emitting
 * @param event
 * @param dataArray
 * @param listener
 */
prototype.emitting = function (event, dataArray, listener) {
  listener.apply(this, dataArray);
};

// exports module
EventEmitter.default = EventEmitter;
module.exports = EventEmitter;
