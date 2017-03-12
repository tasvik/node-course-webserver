const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine','hbs');


app.use(( req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.path}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to log file');
		}
	});
	console.log(log);
	next();
});

// app.use(( res, resp, next) => {
// 	resp.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.render('home', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to this website'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad Request'
	})
});

app.get('/about', (req, res) => {
	// res.send('About Page');
	res.render('about', {
		pageTitle: 'About Page'
	});
});

app.get('/project', (req, res) => {
	// res.send('About Page');
	res.render('project', {
		pageTitle: 'Project Page'
	});
});

app.listen(port, () => {
	console.log(`Node server start on port ${port}`)
});