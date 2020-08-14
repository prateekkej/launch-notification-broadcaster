module.exports = {
  extensions: {
    slack: {
      enabled: true,
      webhooksMap:
              [
                { propertyIds: ['PRf239f9d15010473aa4530352d946'], urls: ['deletehttps://hooks.slack.com/services/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me'] }
              ]
    },
    teams: {
      client_id: 'client id',
      authority: 'https://login.microsoftonline.com/tenantid',
      secret: 'secret',
      enabled: false
    },
    campaign: {
      enabled: false,
      organization: '',
      transactionApi: '',
      eventId: '',
      clientId: '',
      privateKeyPath: ''
    },
    files: {
      enabled: false,
      filePath: './launch-events'
    },
    postbacks:{
      enabled: false,
      urlsMapping:
              [
                { propertyIds: ['*'], urls: ['https://DUMMY_URL.ngrok.io'] },
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
