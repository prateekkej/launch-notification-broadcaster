var configuration = { filePath: undefined }
var fs = require('fs')

module.exports.info = {
  name: 'Files Notification',
  version: 1.0,
  description: 'this extension will allow launch notification engine to send notifications to FileSystem.',
  identifier: 'files'
}

module.exports.configure = function (config) {
  configuration.filePath = config.filePath
}

module.exports.send = function (message) {
  fs.appendFileSync(configuration.filePath, JSON.stringify(message) + '\n')
}
