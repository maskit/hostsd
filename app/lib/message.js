
function Message(msg) {
	this.header = {
		id: null,
		flags: {},
		qdcount: null,
		ancount: null,
		nscount: null,
		arcount: null
	};
	if (msg instanceof Message) {
		this.header.id           = msg.header.id;
		this.header.flags.qr     = msg.header.flags.qr;
		this.header.flags.opcode = msg.header.flags.opcode;
		this.header.flags.aa     = msg.header.flags.aa;
		this.header.flags.tc     = msg.header.flags.tc;
		this.header.flags.rd     = msg.header.flags.rd;
		this.header.flags.ra     = msg.header.flags.ra;
		this.header.flags.z      = msg.header.flags.z;
		this.header.flags.rcode  = msg.header.flags.rcode;
		this.header.qdcount      = msg.header.qdcount;
		this.header.ancount      = msg.header.ancount;
		this.header.nscount      = msg.header.nscount;
		this.header.arcount      = msg.header.arcount;
		this.question            = msg.question;
		this.answer              = msg.answer;
	}
};


module.exports = Message;
