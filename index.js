var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(session({secret: 'bobythetruebaandits'}))

    .use(function(req, res, next){
	if (typeof(req.session.hier) == 'undefined') {
	    req.session.hier = "";
	}
	if (typeof(req.session.auj) == 'undefined') {
	    req.session.auj = "";
		}
	if (typeof(req.session.sprint) == 'undefined') {
	    req.session.sprint = "";
	}
	if (typeof(req.session.mood) == 'undefined') {
	    req.session.mood = "";
	}
	if (typeof(req.session.copyarea) == 'undefined') {
	    req.session.copyarea = "";
	}
	next();
    })

    .get('/', function(req, res) {
	res.render('index.ejs', {hier: req.session.hier, auj: req.session.auj, mood: req.session.mood, sprint: req.session.sprint, copyarea: req.session.copyarea});
    })

    .post('/save/', urlencodedParser, function(req, res) {
	if (req.body.old != '') {
	    req.session.hier = req.body.old;
	    console.log("Hier ajouté");
	}
	if (req.body.news != '') {
	    req.session.auj = req.body.news;
	    console.log("Auj ajouté");
	}
	if (req.body.sprint != '') {
	    req.session.sprint = req.body.sprint;
	    console.log("Sprint ajouté");
	}
	if (req.body.mood != '') {
	    req.session.mood = req.body.mood;
	    console.log("Mood ajouté");
	}
	res.redirect('/');
    })

    .post('/copy/', function(req, res) {
	req.session.copyarea = "#Sprint de la semaine :\r" + req.session.sprint + "\r#Hier j'ai : \r" + req.session.hier + "\r#Aujourd'hui j'ai : \r" + req.session.auj + "\r#Mood of the day :\r" + req.session.mood;
	res.redirect('/');
    })

    .use(function(req, res, next){
	res.redirect('/');
    })

.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

