exports.index = function(req, res){
  var hostsServer = req.app.locals.hostsServer;
  var data = {
    title: 'hostsd',
  },
  client;

  client = req.socket.remoteAddress;
  if (req.query['hosts']) {
    hostsServer.setHostsName(client, req.query['hosts']);
  }

  data.address       = client;
  data.current_hosts = hostsServer.getHostsName(client);

  res.render('index', data);
};
