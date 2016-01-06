var http = require('http');
var app = require('./configs/express')();

var mongooseStringConn = '';
if(app.get('port') % 10 !== 0) {
	mongooseStringConn = 'production mongodb';
} else {
	mongooseStringConn = 'mongodb://localhost:27017/enterprise-rpg';
}
require('./configs/mongoose')(mongooseStringConn);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Enterprise RPG voando na porta '+ app.get('port') + ' xD');
});	