
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , hosts  = require('./routes/hosts')
  , http   = require('http')
  , path   = require('path')
  , hostsd = require('hostsd');

var app = express()
  , hostsServer = new hostsd.createServer();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
hostsServer.updateHostsByName(hostsd.DEFAULT_NAME, new hostsd.Hosts('hostsd 127.0.0.1'));
app.locals.hostsServer = hostsServer;
app.get('/', routes.index);
app.get('/:hosts_name', hosts.view);
app.post('/:hosts_name', hosts.update);

hostsServer.listen(3001);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
