var hostsd = require('../lib/hostsd.js');

exports.view= function(req, res){
  var hosts = hostsd.getHostsByName(req.params.hosts_name) || new hostsd.Hosts();
  res.render('hosts', {
    title: 'hostsd',
    name:  req.params.hosts_name,
    hosts: hosts.getText()
  });
};

exports.update = function(req, res){
  var hosts = new hostsd.Hosts(req.body.hosts);
  hostsd.updateHostsByName(req.params.hosts_name, hosts);
  res.render('hosts', {
    title: 'hostsd',
    name:  req.params.hosts_name,
    hosts: hosts.getText()
  });
};
