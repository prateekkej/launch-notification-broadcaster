module.exports = {
  extensions: {
    slack: {
      enabled: true,
      webhooksMap:
              [
                { propertyIds: ['*'], urls: ['https://hooks.slack.com/services/T02HN1D3G/B0146LG2Z2L/STEdjrCorKtvr'] },
                { propertyIds: ['PROPERTY_ID'], urls: ['https://hooks.slack.com/services/T02HN1D3G/B0146LG2Z2L/STEdjrCorKtvr'] }

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
      enabled: true,
      urlsMapping:
              [
                { propertyIds: ['*'], urls: ['https://0efbaeda215c.ngrok.io'] },
                { propertyIds: ['PROPERTY_ID'], urls: ['URL_HERE'] }

              ]
    }
  },
  broadcaster: {
    tz: 'asia/calcutta',
    poweredBy:"Adobe I/O Runtime",
    healthCheckURLs:['URL_HERE']
  }
}
