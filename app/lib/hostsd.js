var Hosts     = require('./hosts.js');
var hosts_map = {
        'default': new Hosts()
    }, 
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
	return map[client] || 'default';	
};

module.exports.setHostsName = function (client, name) {
    map[client] = name;
};

module.exports.DnsServer = require('./dnsserver.js');
