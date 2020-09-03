module.exports = {
  extensions: {
    slack: {
      enabled: true,
      webhooksMap:
              [
                { propertyIds: ['PROPERTY_ID'], urls: ['deletehttps://hooks.slack.com/services/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me'] },
                { propertyIds: ['*'], urls: ['deletehttps://hooks.slack.com/services/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me'] }

              ]
    },
    postbacks:{
      enabled: false,
      urlsMapping:
              [
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
