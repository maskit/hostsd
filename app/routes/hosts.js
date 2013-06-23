var hostsd = require('../lib/hostsd.js'),
    Hosts  = require('../lib/hosts.js');

exports.view= function(req, res){
  var hosts = hostsd.getHostsByName(req.params.hosts_name) || new Hosts();
  res.render('hosts', {
    title: 'hostsd',
    name:  req.params.hosts_name,
    hosts: hosts.getText()
  });
};

exports.update = function(req, res){
  var hosts = new Hosts(req.body.hosts);
  hostsd.updateHostsByName(req.params.hosts_name, hosts);
  res.render('hosts', {
    title: 'hostsd',
    name:  req.params.hosts_name,
    hosts: hosts.getText()
  });
};
