# event emitter for Javascript

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/event-emitter.js.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/event-emitter.js.svg?branch=master)](https://travis-ci.org/axetroy/event-emitter.js)
[![Build Status](https://saucelabs.com/buildstatus/axetroy)](https://saucelabs.com/beta/builds/05b1e575f3a74adda7203d4c4078a71e)
[![Dependency](https://david-dm.org/axetroy/event-emitter.js.svg)](https://david-dm.org/axetroy/event-emitter.js)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/%40axetroy%2Fevent-emitter.js.svg)](https://badge.fury.io/js/%40axetroy%2Fevent-emitter.js)
[![Build Status](https://saucelabs.com/browser-matrix/axetroy.svg)](https://saucelabs.com/beta/builds/05b1e575f3a74adda7203d4c4078a71e)

A Javascript event emitter implementation without any dependencies.

## API

```javascript
const EventEmitter = require('@axetroy/event-emitter.js');
const event = new EventEmitter();

const cancelSayHello = event.on('greet', function(name) {
  console.log(`hello ${name}`);
});

const cancelSayHi = event.on('greet', function(name) {
  console.log(`hi ${name}`);
});

event.emit('greet', 'Axetroy');
// hello Axetroy
// hi Axetroy

cancelSayHello();   // remove this listener

event.emit('greet', 'Axetroy');
// hi Axetroy

event.off('greet');

event.emit('greet', 'Axetroy');   // nothing happen
```

### event.on(String event, Function listener(...data))

listen an event, return a Function to remove this listener.

### event.once(String event, Function listener(...data))

listen an event only once, it will remove the listener once it trigger

### event.off(String event)

remove all listener about this event

### event.clear()

clean all listener

### event.emit(String event, ...data)

fire an event, without an optional data, data can be multiple arguments

### event.emitting(String event, Array dataArray, Function listener)

**do not invoke this method in manual.**

use this method extend your event emitter

```javascript
class MyEventEmitter extends EventEmitter {
  emitting(event, dataArray, listener) {
    const start = Date.now();
    listener.apply(this, dataArray);    // the default method is only contain this line
    const time = Date.now() - start;
    console.log('time: ' + time);
  }
}
```

## Test
```bash
yarn run test
```

## Contribute

```bash
git clone https://github.com/axetroy/event-emitter.js.git
cd ./event-emitter.js
yarn run watch
```

You can flow [Contribute Guide](https://github.com/axetroy/event-emitter.js/blob/master/contributing.md)

## License

The [MIT License](https://github.com/axetroy/event-emitter.js/blob/master/LICENSE)
