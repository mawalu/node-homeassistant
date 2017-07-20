const Websocket = require('ws')

const defaultConfig = {
  host: 'localhost',
  timeout: 5000,
  port: 8123,
  password: ''
}


class Homeassistant {
  constructor(config) {
    this.config = Object.assign(defaultConfig, config)

    this.url = `ws://${this.config.host}:${this.config.port}/api/websocket`
    this.promises = {}
    this.id = 1
  }

  connect() {
    this.ws = new Websocket(this.url)

    this.ws.on('message', data => {
      data = JSON.parse(data)

      let d = data.id || data.type
      let p = this.promises[d]

      if (p) {
        clearTimeout(p.timeout)
        p.resolve(data)
      }
    })

    return new Promise((resolve, reject) => {
      this.ws.on('open', () => {
        resolve(this)
      }) 
    })
  }

  send(data) {
    data.id = this.id
    this.id++

    return new Promise((resolve, reject) => {
      this.promises[data.id] = {
        timeout: setTimeout(() => {
          return reject(new Error('No response received from home-assistant'))
        }, this.config.timeout),
        resolve
      }
      this.ws.send(JSON.stringify(data))
    })
  }
}

let ha = new Homeassistant({
  host: '192.168.1.166'
})

ha.connect()
  .then(() => {
    return ha.send({
      type: 'get_states'
    })
  })
  .then(console.log)
  .catch(console.error)
