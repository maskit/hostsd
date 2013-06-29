var clientStore = null,
    hostsStore  = null;

module.exports.setClientStore(dataStore) {
    clientStore = dataStore;
};

module.exports.setHostsStore(dataStore)
{
    hostsStore = dataStore;
};

module.exports.getHostsByClient = function (client) {
	var name = this.getHostsName(client);
	return this.getHostsByName(name);
};

module.exports.getHostsByName = function (name) {
	return hostsStore.get(name);
};

module.exports.updateHostsByName = function (name, hosts) {
    hostsStore.set(name, hosts);
};

module.exports.getHostsName = function (client) {
	return clientStore.get(client) || this.DEFAULT_NAME;
};

module.exports.setHostsName = function (client, name) {
    clientStore.set(client, name);
};

module.exports.DnsServer = require('./dnsserver.js');
module.exports.Hosts     = require('./hosts.js');
module.exports.DataStore = require('./datastore.js');
module.exports.DEFAULT_HOSTS = 'default';
