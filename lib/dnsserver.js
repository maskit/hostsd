var Protocol = require('./protocol.js'),
    Message  = require('./message.js'),
    Resolver = require('./resolver.js'),
    dgram    = require('dgram');

function DnsServer (options) {
	var self = this,
	    dnsServer;

	this.options = options;
	this.resolver = new Resolver();

	this.dnsServer = dnsServer = dgram.createSocket('udp4');
	dnsServer.on('message', function onMessage (msg, rinfo) {
		var query = Protocol.unpack(msg, rinfo.size);
		self.resolver.resolve(rinfo, query, function (response) {
			var data = Protocol.pack(response);
			self.dnsServer.send(data.buf, 0, data.size, rinfo.port, rinfo.address);
		});
	});
	dnsServer.on('listening', function onListening () {
		var address = this.address()
		console.log('Listening on ' + address.address + ':' + address.port);
	});
	dnsServer.on('close', function onClose () {
		console.log('Closed');
	});
	dnsServer.on('error', function onError(err) {
		console.log(err);
	});

};

DnsServer.prototype.listen = function (port) {
	this.dnsServer.bind(port, '0.0.0.0');
};

module.exports = DnsServer;
