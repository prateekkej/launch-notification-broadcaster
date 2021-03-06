// Do not edit this file
const axios = require('axios').default

module.exports = function (extensions) {
  const extensionModules = []
  const globalConfig = extensions.global
  for (const extensionId in extensions) {
    const extensionConfig = extensions[extensionId]
    if (extensionConfig.enabled) {
      try {
        const extension = require(`./${extensionId}`)
        extension.configure({ ...globalConfig, ...extensionConfig })
        extensionModules.push(extension)
        console.log('Loaded Extension:')
        console.log(extension.info)
      } catch (exc) {
        axios.post(x, `Extension:${extensionId}Error: While Loading Extension - ${exc.message}\nStack:${exc.stack}`).catch(console.error)
      }
    }
  }
  return extensionModules
}
