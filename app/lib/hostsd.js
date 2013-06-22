var Hosts    = require('./hosts.js'),
    hosts    = new Hosts(),
    map      = {};

module.exports.getHosts = function (client) {
	var name = map[client] || 'default';	
	return hosts.get(name);
}

module.exports.DnsServer = require('./dnsserver.js');
