var hostsd    = require('./hostsd.js'),
    Protocol  = require('./protocol.js'),
    Message   = require('./message.js'),
    Resolver  = require('./resolver.js'),
    DataStore = require('./datastore.js'),
    dgram     = require('dgram');

function Server (options) {
	var self = this;

    if (typeof options === 'undefined') {
        options = {};
    }
    if (typeof options.hostsStore === 'undefined') {
        options.hostsStore = new DataStore();
    }
    if (typeof options.clientStore === 'undefined') {
        options.clientStore = new DataStore();
    }

    this.clientStore = options.clientStore;
    this.hostsStore = options.hostsStore;
	this.options = options;
	this.resolver = new Resolver(this);

	this.dnsServer = dgram.createSocket('udp4');
	this.dnsServer.on('message', function onMessage (msg, rinfo) {
		var query = Protocol.unpack(msg, rinfo.size);
		self.resolver.resolve(rinfo, query, function (response) {
			var data = Protocol.pack(response);
			self.dnsServer.send(data.buf, 0, data.size, rinfo.port, rinfo.address);
		});
	});
	this.dnsServer.on('listening', function onListening () {
		var address = this.address()
		console.log('Listening on ' + address.address + ':' + address.port);
	});
	this.dnsServer.on('close', function onClose () {
		console.log('Closed');
	});
	this.dnsServer.on('error', function onError(err) {
		console.log(err);
	});

};

Server.prototype.listen = function (port) {
	this.dnsServer.bind(port, '0.0.0.0');
};

Server.prototype.getHostsByClient = function (client) {
	var name = this.getHostsName(client);
	return this.getHostsByName(name);
};

Server.prototype.getHostsByName = function (name) {
	return this.hostsStore.get(name);
};

Server.prototype.updateHostsByName = function (name, hosts) {
    this.hostsStore.set(name, hosts);
};

Server.prototype.getHostsName = function (client) {
	return this.clientStore.get(client) || hostsd.DEFAULT_NAME;
};

Server.prototype.setHostsName = function (client, name) {
    this.clientStore.set(client, name);
};

module.exports = Server;
