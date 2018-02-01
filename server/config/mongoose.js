var mongoose = require('mongoose');
var path = require('path');
var mp = path.join(__dirname, './../models');
var fs = require('fs');

mongoose.connect('mongodb://localhost/survey-polls');

fs.readdirSync(mp).forEach(function(file) {
    if (file.indexOf('.js') >= 0) {
        require(mp + '/' + file);

    }
})