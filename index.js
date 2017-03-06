/**
 * Created by axetroy on 2017/3/6.
 */

function randomId() {
  let str = '', len = 20;
  while (len--) {
    str += String.fromCharCode(48 + ~~(Math.random() * 42));
  }
  return str + ':::' + new Date().getTime();
}

function EventEmitter() {
  this.e = {};
}

const prototype = EventEmitter.prototype;

prototype.constructor = EventEmitter;

prototype.on = function (event, handler) {
  const container = this.e[event] = this.e[event] || [];
  const id = randomId();
  handler.__id__ = id;
  container.push(handler);
  return () => {
    const index = container.findIndex(callback => callback.__id__ === id);
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
  const container = this.e[event] = this.e[event] || [];
  const _this = this;
  const id = randomId();

  const callback = function () {
    const index = container.findIndex(_callback => callback.__id__ === id);
    index >= 0 ? container.splice(index, 1) : void 0;
    handler.apply(_this, arguments);
  };

  callback.__id__ = id;

  container.push(callback);
};

prototype.emit = function (event, data) {
  (this.e[event] || []).forEach((handler) => {
    handler.call(this, data);
  });
};

module.exports = EventEmitter;