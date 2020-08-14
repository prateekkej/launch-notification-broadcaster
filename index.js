const AuditEventParser = require('./AuditEventParser')
var axios = require('axios').default
const configuration = require('./configuration')

const extensions = require('./extensions')(configuration.extensions)

function main (args) {
  if (args.__ow_method === 'get') { return { statusCode: 200, body: configuration } }
  var event
  let error
  const data = args.data
  try {
    event = new AuditEventParser(data, configuration.broadcaster)
    console.log('Event Received ' + event.componentType + '  ' + event.eventType)
    if (event.who && event.who.name !== null &&
     event.componentType === 'environment' &&
    //  event.componentName.toLowerCase() !== 'development' &&
     event.componentName.toLowerCase() !== 'staging') {
      extensions.forEach(extension => {
        try {
          extension.send(event)
        } catch (exc) {
          error=exc
          if(configuration.broadcaster && configuration.broadcaster.healthCheckURLs){
            configuration.broadcaster.healthCheckURLs.forEach(x=>{
              axios.post(x,`Extension:${extension.info.name}Error: While sending notification - ${exc.message}\nStack:${exc.stack}`).catch(console.error)
            })
          }
        }
      })
    }
  } catch (exc) {
    error=exc
    if(configuration.broadcaster && configuration.broadcaster.healthCheckURLs){
      configuration.broadcaster.healthCheckURLs.forEach(x=>{
        axios.post(x,`Error:${exc.message}\nStack:${exc.stack}`).catch(console.error)
      })
    }
  }

  return { statusCode: 200 ,body:event.raw,error:error}
}
module.exports.main = main
