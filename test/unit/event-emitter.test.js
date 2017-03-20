/**
 * Created by axetroy on 2017/3/6.
 */
import pkg from '../../package.json';
import test from 'ava';
import EventEmitter from '../../index';

const name = pkg.name;

let event;

test.beforeEach(t => {
  event = new EventEmitter();
  t.pass();
});

test('.on()', t => {
  let apply = false;
  event.on('hello', function (data) {
    apply = true;
    t.deepEqual(data, 'Axetroy');
  });
  event.emit('hello', 'Axetroy');
  t.true(apply);
});

test('.on() cancel the listener', async t => {
  let count = 0;
  const cancel = event.on('hello', function (data) {
    count++;
  });
  t.deepEqual(count, 0);
  event.emit('hello');
  t.deepEqual(count, 1);

  event.emit('hello');
  t.deepEqual(count, 2);

  cancel();

  event.emit('hello');
  t.deepEqual(count, 2);

  event.emit('hello');
  t.deepEqual(count, 2);
});

test('.once()', async t => {
  let count = 0;
  event.once('hello', function (data) {
    count++;
  });
  t.deepEqual(count, 0);
  event.emit('hello');
  t.deepEqual(count, 1);

  event.emit('hello');
  t.deepEqual(count, 1);

  event.emit('hello');
  t.deepEqual(count, 1);

  event.emit('hello');
  t.deepEqual(count, 1);
});

test('.off()', async t => {
  let apply = false;
  event.on('hello', function () {
    apply = true;
  });

  t.is(event[name]["hello"].length, 1);

  event.off('hello');

  t.is(event[name]["hello"].length, 0);
  t.deepEqual(event[name]["hello"], []);
  event.emit('hello');
  t.false(apply);
});

test('.off() cancel this event listener', async t => {
  let apply = false;

  function handler() {
    apply = true;
  }

  event.on('hello', handler);
  event.on('hello', handler);


  t.is(event[name]["hello"].length, 2);

  event.off('hello');

  t.is(event[name]["hello"].length, 0);
  t.deepEqual(event[name]["hello"], []);
  event.emit('hello');
  t.false(apply);
});

test('.clear()', async t => {
  let apply = false;

  function handler() {
    apply = true;
  }

  event.on('say', handler);
  event.on('hello', handler);


  t.is(Object.keys(event[name]).length, 2);

  event.clear();

  t.is(Object.keys(event[name]).length, 0);
  event.emit('hello');
  event.emit('say');
  t.false(apply);
});