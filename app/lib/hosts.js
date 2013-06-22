function Hosts (file) {
	this.table = {
		default: {
			'hostsd': '127.0.0.1',
		},
	};

	if (file) {
	}
};

Hosts.prototype.update = function (name, table) {
	this.table[name] = table;
};

Hosts.prototype.get = function (name) {
	return this.table[name];
};

Hosts.prototype.save = function () {
};

module.exports = Hosts;
