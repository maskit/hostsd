var hostsd = require('../lib/hostsd.js');

exports.index = function(req, res){
  var data = {
    title: 'hostsd',
  },
  client;

  client = req.socket.remoteAddress;
  if (req.query['hosts']) {
    hostsd.setHostsName(client, req.query['hosts']);
  }

  data.address       = client;
  data.current_hosts = hostsd.getHostsName(client);

  res.render('index', data);
};
