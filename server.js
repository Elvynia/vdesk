var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/', require('./routes/index'));
app.use('/ws/ramm/', require('./routes/ramm'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;