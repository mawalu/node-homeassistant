const Homeassistant = require('./../index')

// Connect to home-assistant
let ha = new Homeassistant({
  host: '192.168.1.166'
})

ha.connect()
  .then(() => {
    // subscribe to state changes
    ha.on('state:media_player.spotify', data => {
      console.log(data)
    })

    // access current state
    console.log(ha.state('sun.sun'))

    // call a service
    return ha.call({
      domain: 'light',
      service: 'turn_on'
    })
  })
  .catch(console.error)

ha.on('connection', info => {
  console.log('connection changed', info)
})
