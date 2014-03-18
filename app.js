var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

http.ServerResponse.prototype.respond = function(content, status) {
	if ('undefined' == typeof status) { // only one parameter found
		if ('number' == typeof content || !isNaN(parseInt(content))) { // usage
			// "respond(status)"
			status = parseInt(content);
			content = undefined;
		} else { // usage "respond(content)"
			status = 200;
		}
	}
	if (status != 200) { // error
		content = {
			"code" : status,
			"status" : http.STATUS_CODES[status],
			"message" : content && content.toString() || null
		};
	}
	if ('object' != typeof content) { // wrap content if necessary
		content = {
			"result" : content
		};
	}
	// respond with JSON data
	this.send(content, status);
};

var app = express();

var enableCORS = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers',
			'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
};

// enable CORS!
app.use(enableCORS);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.post('/users', users.list);
app.options('/users', users.list);

// / catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.render('error', {
			message : err.message,
			error : err
		});
		console.log(err);
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
app.listen(3000);