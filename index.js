var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(session({secret: 'bobythetruebaandits'}))

    .use(function(req, res, next){
	if (typeof(req.session.hier) == 'undefined') {
	    req.session.hier = "";
	}
	else if (typeof(req.session.auj) == 'undefined') {
	    req.session.auj = "";
		}
	else if (typeof(req.session.sprint) == 'undefined') {
	    req.session.sprint = "";
	}
	else if (typeof(req.session.mood) == 'undefined') {
	    req.session.mood = "";
	}
	next();
    })

    .get('/', function(req, res) {
	res.render('index.ejs', {hier: req.session.hier, auj: req.session.auj, mood: req.session.mood, sprint: req.session.sprint });
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

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function(req, res, next){
	res.redirect('/');
    })

    .listen(8080);
