
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , hosts  = require('./routes/hosts')
  , http   = require('http')
  , path   = require('path')
  , hostsd = require('./lib/hostsd.js');

var app = express()
  , dnsServer = new hostsd.DnsServer();

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

app.get('/', routes.index);
app.get('/:hosts_name', hosts.view);
app.post('/:hosts_name', hosts.update);

dnsServer.listen(3001);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
