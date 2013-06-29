var net     = require('net'),
    hostsd  = require('./hostsd.js'),
    Message = require('./message.js');

function Resolver() {
};

Resolver.prototype.resolve = function (rinfo, query, callback) {
	var i, answer, response;

	response = new Message(query);
	response.header.flags.qr = 1;
	response.header.flags.aa = 1;
	response.header.flags.tc = 0;
	response.header.flags.ra = 0;
	response.header.nscount = 0;
	response.header.arcount = 0;

	response.answer = [];
	for (i = 0; i < query.header.qdcount; i++) {
		answer = getAnswer.call(this, rinfo, query.question[i]);
		if (answer) {
			response.answer.push(answer);
			response.header.ancount++; 
		}
	}
	response.header.flags.rcode = 0;

	setTimeout(callback, 10, response);
}

function getAnswer(rinfo, question) {
	var hosts, key, value, tmp, answer = false;

	if (question.type === 1) { // A record
		key = question.name.join('.');
		hosts = hostsd.getHostsByClient(rinfo.address);
        if (hosts) {
            ipaddr = hosts.lookup(key);
            if(ipaddr && net.isIPv4(ipaddr)) {
                tmp = ipaddr.split('.');
                value = (parseInt(tmp[0]) << 24)
                    + (parseInt(tmp[1]) << 16)
                    + (parseInt(tmp[2]) << 8)
                    + parseInt(tmp[3]);
                answer = {
                    name:  question.name,
                    type:  question.type,
                    class: question.class,
                    ttl:   60,
                    len:   4,
                    data:  value
                };
            }
        }
	}

	return answer;
};

module.exports = Resolver;
