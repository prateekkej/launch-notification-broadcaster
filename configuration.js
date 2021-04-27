module.exports = {
  // Multiple extensions where you can send data from this function.
  extensions: {
    // Configuration for Slack Extension. Schema depends on the version of extension.
    // Please update configuration whenever there are any changes to slack extension.
    // Key => extension name. this should be same as extension JS file.
    slack: {
      // Flag to check if the extension is enabled or not.
      enabled: true,
      webhooksMap:
              [
                // Each object should have 
                // 1. propertyIds: an array of Launch property IDs from where you want to send notifications. Use * to allow every property.
                // 2. urls: an array of slack urls. All URLs will receive a notification.
                { propertyIds: ['PROPERTY_ID'], urls: ['deletehttps://hooks.slack.com/services/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me'] },
                { propertyIds: ['*'], urls: ['deletehttps://hooks.slack.com/services/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me'] }
              ]
    },
    postbacks:{
      // Flag to check if the extension is enabled or not.
      enabled: false,
      urlsMapping:
              [
                // Each object should have 
                // 1. propertyIds: an array of Launch property IDs from where you want to send notifications. Use * to allow every property.
                // 2. urls: an array of slack urls. All URLs will receive a notification.
                { propertyIds: ['*'], urls: ['DUMMY_URL'] },
                { propertyIds: ['PROPERTY_ID'], urls: ['URL_HERE'] }
              ]
    }
  },
  broadcaster: {
    tz: 'asia/calcutta',
    poweredBy:"Adobe I/O Runtime",
    healthCheckURLs:[]
  }
}
