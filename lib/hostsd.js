var Server = require('./server.js'),
    DataStore = require('./datastore.js');

module.exports.createServer = function (options) {
    return new Server(options);
};

module.exports.Hosts     = require('./hosts.js');
module.exports.DataStore = DataStore;
module.exports.DEFAULT_NAME = 'default';
