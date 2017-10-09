'use strict';

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var routes = require('./app/routes');
var session = require('./app/session');
var passport = require('./app/auth');
var ioServer = require('./app/socket')(app);
var logger = require('./app/logger');

app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));
app.use(session);
app.use(passport.initailze());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.use(function(request, response, next) {
	response.status(404).sendFile(process.cwd() + '/app/views/404.html');
});

ioServer.listen(app.get('port'));