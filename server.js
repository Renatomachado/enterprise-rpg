var http = require('http'),
    app = require('./configs/express')(),
    mongooseStringConn = process.env.MONGO_URL || 'mongodb://localhost:27017/enterprise-rpg';

require('./configs/mongoose')(mongooseStringConn);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Enterprise RPG on port '+ app.get('port'));
});