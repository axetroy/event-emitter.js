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

prototype.on = function (event, handler) {
  let container = this.e[event] = this.e[event] || [], id = randomId(), index;
  handler.__id__ = id;
  container.push(handler);
  return () => {
    index = findIndexById.call(container, id);
    index >= 0 ? container.splice(index, 1) : void 0;
  }
};

prototype.off = function (event) {
  this.e[event] = [];
};

prototype.clear = function () {
  this.e = {};
};

prototype.once = function (event, handler) {
  let container = this.e[event] = this.e[event] || [], _this = this, id = randomId(), index;

  const callback = function () {
    index = findIndexById.call(container, id);
    index >= 0 ? container.splice(index, 1) : void 0;
    handler.apply(_this, arguments);
  };

  callback.__id__ = id;

  container.push(callback);
};

prototype.emit = function () {
  const argv = [].slice.call(arguments), event = argv.shift();
  (this.e[event] || []).forEach((handler) => handler.apply(this, argv));
};

module.exports = EventEmitter;