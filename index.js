var axios = require('axios').default
const configuration = require('./configuration')
const { AuditEvent,LaunchEvent } = require('./AuditEventParser')
const extensions = require('./extensions')(configuration.extensions)


function main (args) {
  //If a get request, configuration is returned
  if (args.__ow_method === 'get') { return { statusCode: 200, body: configuration } }
  var event
  let error
  const data = args.data
  try {
    event = new AuditEvent(data, configuration.broadcaster)
    console.log('Event Received ' + event.componentType + '  ' + event.eventType)
    // Filter according to conditions
    let isEligible=checkEligibility(event)
    if (isEligible) {
      // Send to every notification Sink
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
  let statusCode=200
if(error){statusCode=500}
  return { statusCode ,body:event.raw,error:error}
}

// Should return a boolean to decide whether to send notification or not.
function checkEligibility(event){
  return (event.who && event.who.name !== null &&
  event.componentType === 'environment' &&
  event.componentName.toLowerCase() !== 'development' &&
  event.componentName.toLowerCase() !== 'staging')
}
module.exports.main = main
