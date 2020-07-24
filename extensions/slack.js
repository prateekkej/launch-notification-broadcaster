var axios = require('axios').default
var configuration = { globalUrls: [], properties: {} }

module.exports.info = {
  name: 'Slack Notification',
  version: 1.1,
  description: 'this extension will allow launch notification engine to send notifications to slack api.',
  identifier: 'slack'
}

module.exports.configure = function (config) {
  const webhooksMap = config.webhooksMap
  if (webhooksMap && Object.getPrototypeOf(webhooksMap) === Array.prototype) {
    webhooksMap.forEach(c => {
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
  const slackMessage = this.basicMessage(message.about)
  const propertyURLs = configuration.properties[message.propertyId]
  if (propertyURLs) {
    propertyURLs.forEach(url => {
      axios.post(url, slackMessage, { headers: { 'content-type': 'application/json' } }).then(({ data }) => console.log(data)).catch(console.error)
    })
  }
  configuration.globalUrls.forEach(url => {
    axios.post(url, slackMessage, { headers: { 'content-type': 'application/json' } }).then(({ data }) => console.log(data)).catch(console.error)
  })
}

module.exports.basicMessage = function (message) {
  return {
    blocks: [
      {
        type: 'divider'
      }, {
        type: 'context',
        elements: [

          {
            type: 'mrkdwn',
            text: `Property Name : *${message.propertyName}*`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Event Type : *${message.componentType} ${message.eventType}*`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Component Affected : ${message.componentName}`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `By : ${message.who.name} *(${message.who.email})*`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `At : ${message.when}`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Powered by *_${message.poweredBy}_*`
          }
        ]
      }
    ]
  }
}
