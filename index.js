const AuditEventParser = require('./AuditEventParser')
var axios = require('axios').default
const configuration = require('./configuration')

const extensions = require('./extensions')(configuration.extensions)

function main (args) {
  if (args.__ow_method === 'get') { return { statusCode: 200, body: configuration } }
  var event
  const data = args.data
  try {
    event = new AuditEventParser(data, configuration.broadcaster)
    console.log('Event Received ' + event.componentType + '  ' + event.eventType)
    if (event.who && event.who.name !== null &&
     event.componentType === 'environment' &&
     event.componentName.toLowerCase() !== 'Development' &&
     event.componentName.toLowerCase() !== 'Staging') {
      extensions.forEach(extension => {
        try {
          extension.send(event)
        } catch (exc) {
          if(configuration.broadcaster && configuration.broadcaster.healtcheckURLs){
            configuration.broadcaster.healtcheckURLs.forEach(x=>{
              axios.post(x,`Extension:${extension.info.name}Error: While sending notification - ${exc.message}\nStack:${exc.stack}`).catch(console.error)
            })
          }
        }
      })
    }
  } catch (exc) {
    axios.post(x,`Error:${exc.message}\nStack:${exc.stack}`).catch(console.error)
  }

  return { statusCode: 200 }
}
module.exports.main = main
