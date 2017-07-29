# Node.js api for home-assistant

A simple package to access & controll home-assistant from node.js using the websocket api.

## Installation

```
$ npm install node-homeassistant
```

## Usage

Create a new Homeassistant object:

```javascript
const Homeassistant = require('node-homeassistant')

let ha = new Homeassistant({
  host: '192.168.1.166',
  retryTimeout: 1000, // in ms, default is 5000
  retryCount: 3, // default is 10, values < 0 mean unlimited
  password: 'super_secure',
  port: 8123
})

ha.connect().then(() => {
  // do stuff
})
```

Access & subscribe to states:

```javascript
console.log(ha.state('sun.sun'))


ha.on('state:media_player.spotify', data => console.log)
```

Call services:

```javascript
ha.call({
     domain: 'light',
     service: 'turn_on'
   })
```

You can subscribe to the 'connection' event to get information about the websocket connection.

```javascript
ha.on('connection', info => {
  console.log('connection state is', info)
})
```

See the example folders for a working demo.

# License

MIT
