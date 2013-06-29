var Message = require('./message.js');

function readQuestion(buf, offset, count) {
	var i, j, start, end, name, queries = [];

	j = offset;
	for (i = 0; i < count; i++) {
		name = [];
		while (buf[j] !== 0x00) {
			start = j + 1;
			end = start + buf.readUInt8(j);
			j = end;
			name.push(buf.toString('ascii', start, end));
		}
		j++;
		queries.push({
			name: name,
			type: buf.readUInt16BE(j),
			class: buf.readUInt16BE(j + 2),
		});
		j += 4;
	}
	
	return queries;
};

function pack(msg) {
	var i, j, len, flags, offset = 0;

	data = new Buffer(512);
	data.writeUInt16BE(msg.header.id, 0);
	flags = msg.header.flags.qr << 15
		| msg.header.flags.opcode << 11
		| msg.header.flags.aa     << 10
		| msg.header.flags.tc     <<  9
		| msg.header.flags.rd     <<  8
		| msg.header.flags.ra     <<  7
		| msg.header.flags.z      <<  4
		| msg.header.flags.rcode;
	data.writeUInt16BE(flags, 2);
	data.writeUInt16BE(msg.header.qdcount, 4);
	data.writeUInt16BE(msg.header.ancount, 6);
	data.writeUInt16BE(msg.header.nscount, 8);
	data.writeUInt16BE(msg.header.arcount, 10);
	offset = 12;
	// Question
	for (i = 0; i < msg.header.qdcount; i++) {
		for (j = 0; j < msg.question[i].name.length; j++) {
			len = Buffer.byteLength(msg.question[i].name[j], 'ascii');
			data.writeUInt8(len, offset);
			offset += 1;
			data.write(msg.question[i].name[j], offset, len, 'ascii');
			offset += len;
		}
		data.writeUInt8(0, offset);
		offset += 1;
		data.writeUInt16BE(msg.question[i].type, offset);
		data.writeUInt16BE(msg.question[i].class, offset + 2);
		offset += 4;
	}
	// Answer
	for (i = 0; i < msg.header.ancount; i++) {
		for (j = 0; j < msg.answer[i].name.length; j++) {
			len = Buffer.byteLength(msg.answer[i].name[j], 'ascii');
			data.writeUInt8(len, offset);
			offset += 1;
			data.write(msg.answer[i].name[j], offset, len, 'ascii');
			offset += len;
		}
		data.writeUInt8(0, offset);
		offset += 1;
		data.writeUInt16BE(msg.answer[i].type, offset);
		data.writeUInt16BE(msg.answer[i].class, offset + 2);
		offset += 4;
		data.writeUInt32BE(msg.answer[i].ttl, offset);
		offset += 4;
		data.writeUInt16BE(msg.answer[i].len, offset);
		offset += 2;
		data.writeUInt32BE(msg.answer[i].data, offset);
		offset += 4;
	}
	return {buf: data, size: offset};
};

function unpack(data, size) {
	var msg = new Message(),
	    header = {},
	    flags = null;

	header.id = data.readUInt16BE(0);
	flags = data.readUInt16BE(2);
	header.flags = {
		qr:     (flags & 0x8000) >>> 15,
		opcode: (flags & 0x7800) >>> 11,
		aa:     (flags & 0x0400) >>> 10,
		tc:     (flags & 0x0200) >>>  9,
		rd:     (flags & 0x0100) >>>  8,
		ra:     (flags & 0x0080) >>>  7,
		z:      (flags & 0x0070) >>>  4,
		rcode:  (flags & 0x000F),
	};
	header.qdcount = data.readUInt16BE(4);
	header.ancount = data.readUInt16BE(6);
	header.nscount = data.readUInt16BE(8);
	header.arcount = data.readUInt16BE(10);
	msg.header = header;

	if (header.qdcount) {
		msg.question= readQuestion(data, 12, header.qdcount);
	}
	return msg;
};

module.exports = {
	pack: pack,
	unpack: unpack,
};
