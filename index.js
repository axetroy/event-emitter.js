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
  return this.findIndex(callback => callback.__id__ === id);
}

const prototype = EventEmitter.prototype;

prototype.constructor = EventEmitter;

prototype.on = function (event, listener) {
  let self = this, container = self.e[event] = self.e[event] || [], id = randomId(), index;
  listener.__id__ = id;
  container.push(listener);
  return () => {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
  }
};

prototype.off = function (event) {
  this.e[event] = [];
};

prototype.clear = function () {
  this.e = {};
};

prototype.once = function (event, listener) {
  let self = this, container = self.e[event] = self.e[event] || [], _this = self, id = randomId(), index, callback = function () {
    index = findIndexById.call(container, id);
    index >= 0 && container.splice(index, 1);
    listener.apply(_this, arguments);
  };
  callback.__id__ = id;
  container.push(callback);
};

prototype.emit = function () {
  const self = this, argv = [].slice.call(arguments), event = argv.shift();
  (self.e[event] || []).forEach((listener) => self.emitting(event, argv, listener));
};

prototype.emitting = function (event, dataArray, listener) {
  listener.apply(this, dataArray);
};

module.exports = EventEmitter;