/**
 * Created by axetroy on 2017/3/6.
 */
let name = '@axetroy/event-emitter.js';

function randomId() {
  return Math.random().toString(36).substr(2, 16);
}

function findIndexById(id) {
  return this.findIndex(callback => callback.__id__ === id);
}

const defineProperty = Object.defineProperty;

function EventEmitter() {
  this[name] = {};
  defineProperty && defineProperty(this, name, {enumerable: false,configurable: false});
}

const prototype = EventEmitter.prototype;

prototype.constructor = EventEmitter;

prototype.on = function (event, listener) {
  let self = this, container = self[name][event] = self[name][event] || [], id = randomId(), index;
  listener.__id__ = id;
  container.push(listener);
  return () => {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
  }
};

prototype.off = function (event) {
  this[name][event] = [];
};

prototype.clear = function () {
  this[name] = {};
};

prototype.once = function (event, listener) {
  let self = this, container = self[name][event] = self[name][event] || [], _this = self, id = randomId(), index, callback = function () {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
    listener.apply(_this, arguments);
  };
  callback.__id__ = id;
  container.push(callback);
};

prototype.emit = function () {
  const self = this, argv = [].slice.call(arguments), event = argv.shift();
  (self[name][event] || []).forEach((listener) => self.emitting(event, argv, listener));
};

prototype.emitting = function (event, dataArray, listener) {
  listener.apply(this, dataArray);
};

module.exports = EventEmitter;