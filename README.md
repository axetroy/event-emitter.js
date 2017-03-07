# event emitter for Javascript
[![Build Status](https://travis-ci.org/axetroy/event-emitter.js.svg?branch=master)](https://travis-ci.org/axetroy/event-emitter.js)
[![Build Status](https://saucelabs.com/buildstatus/axetroy)](https://saucelabs.com/beta/builds/05b1e575f3a74adda7203d4c4078a71e)
[![Dependency](https://david-dm.org/axetroy/event-emitter.js.svg)](https://david-dm.org/axetroy/event-emitter.js)
![License](https://img.shields.io/badge/license-MIT-green.svg)

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

### event.on(String event, Function handler(...data))

listen an event, return a Function to remove this listener.

### event.once(String event, Function handler(...data))

listen an event only once, it will remove the listener once it trigger

### event.off(String event)

remove all listener about this event

### event.clear()

clean all listener

### event.emit(String event, ...data)

fire an event, without an optional data, data can be multiple arguments

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