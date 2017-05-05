/**
 * Created by axetroy on 2017/5/5.
 */

console.log('load');

const EventEmitter = require('../dist/eventEmitter');

const event = new EventEmitter();

function main() {
  const $bind = document.getElementById('bind');
  const $unbind = document.getElementById('unbind');
  const $trigger = document.getElementById('trigger');

  $bind.onclick = function() {
    event.off('click');
    event.on('click', function() {
      alert('trigger click');
    });
    alert('bind click event');
  };

  $unbind.onclick = function() {
    event.off('click');
    alert('unbind click event');
  };

  $trigger.onclick = function() {
    event.emit('click');
  };
}

addEventListener(
  'DOMContentLoaded',
  function() {
    main();
  },
  false
);
