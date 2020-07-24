var axios = require('axios').default
var configuration = { globalUrls: [], properties: {} }

module.exports.info = {
  name: 'PostBack Notification',
  version: 1.0,
  description: 'this extension will send Adobe Launch notifications to configured URLs in JSON format.',
  identifier: 'postbacks'
}

module.exports.configure = function (config) {
  const urlsMapping = config.urlsMapping
  if (urlsMapping && Object.getPrototypeOf(urlsMapping) === Array.prototype) {
    urlsMapping.forEach(c => {
      if (c.propertyIds && Object.getPrototypeOf(c.propertyIds) === Array.prototype &&
      c.urls && Object.getPrototypeOf(c.urls) === Array.prototype) {
        c.propertyIds.forEach(pId => {
          if (pId === '*') { configuration.globalUrls = configuration.globalUrls.concat(c.urls) } else if (configuration.properties[pId]) {
            configuration.properties[pId] = configuration.properties[pId].add(...c.urls)
          } else {
            let urls = new Set()
            urls = urls.add(...c.urls)
            configuration.properties[pId] = urls
          }
        })
      }
    })
  }
}

module.exports.send = function (message) {
  const jsonMessage = JSON.stringify(message.about)
  const propertyURLs = configuration.properties[message.propertyId]
  if (propertyURLs) {
    propertyURLs.forEach(url => {
      axios.post(url, jsonMessage, { headers: { 'content-type': 'application/json' } }).catch(console.error)
    })
  }
  configuration.globalUrls.forEach(url => {
    axios.post(url, jsonMessage, { headers: { 'content-type': 'application/json' } }).catch(console.error)
  })
}
