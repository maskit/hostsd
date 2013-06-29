function Hosts (text) {
    if (text) {
        this.text = text;
        this.table = parse(this.text);
    } else {
        this.text = '';
        this.table = {};
    }
};

Hosts.prototype.update = function (text) {
	this.table = parse(text);
    this.text = text;
};

Hosts.prototype.lookup = function (hostname) {
	return this.table[hostname];
};

Hosts.prototype.getText = function () {
    return this.text;
};

function parse (text) {
    var table = {},
        lines = text.split(/\n+/),
        line,
        i,
        n = lines.length;

    for (i = 0; i < n; i++) {
        line = lines[i].split(/\s/, 3);
        if (line.length > 1) {
            line[0].replace(/\s/, '');
            line[1].replace(/\s/, '');
            if (line[0] !== '' && line[1] !== '') {
                table[line[0]] = line[1];
            }
        }
    }
    return table;
};

module.exports = Hosts;
