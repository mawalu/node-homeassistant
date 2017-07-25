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
  port: 8123
}).then(() => {
  // do stuff
})
```

*note: authentication is currently not supported*

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

See the example folders for a working demo.

# License

MIT
