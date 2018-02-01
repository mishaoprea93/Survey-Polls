var express = require('express');
var app = express();
var session = require('express-session');
var bp = require('body-parser');
var port = 8000;
var path = require('path');

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(session({ secret: "Secret Key" }));
app.use(bp.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(port, function() {
    console.log("listening on port 8000");
})