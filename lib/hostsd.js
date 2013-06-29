var hosts_map = {},
    map      = {};

module.exports.getHostsByClient = function (client) {
	var name = this.getHostsName(client);
	return this.getHostsByName(name);
};

module.exports.getHostsByName = function (name) {
	return hosts_map[name];
};

module.exports.updateHostsByName = function (name, hosts) {
    hosts_map[name] = hosts;
};

module.exports.getHostsName = function (client) {
	return map[client] || this.DEFAULT_NAME;
};

module.exports.setHostsName = function (client, name) {
    map[client] = name;
};

module.exports.DnsServer = require('./dnsserver.js');
module.exports.Hosts     = require('./hosts.js');
module.exports.DEFAULT_HOSTS = 'default';
