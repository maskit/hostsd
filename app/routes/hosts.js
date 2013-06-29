var hostsd = require('hostsd');

exports.view = function(req, res){
  var hostsServer = req.app.locals.hostsServer;
  var hosts = hostsServer.getHostsByName(req.params.hosts_name) || new hostsd.Hosts();
  res.render('hosts', {
    title: 'hostsd',
    name:  req.params.hosts_name,
    hosts: hosts.getText()
  });
};

exports.update = function(req, res){
  var hostsServer = req.app.locals.hostsServer;
  var hosts = new hostsd.Hosts(req.body.hosts);
  hostsServer.updateHostsByName(req.params.hosts_name, hosts);
  res.render('hosts', {
    title: 'hostsd',
    name:  req.params.hosts_name,
    hosts: hosts.getText()
  });
};
