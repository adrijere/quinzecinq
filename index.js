var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(session({secret: 'bobythetruebaandits'}))

    .use(function(req, res, next){
	if (typeof(req.session.hier) == 'undefined') {
	    req.session.hier = [];
	}
	else if (typeof(req.session.auj) == 'undefined') {
	    req.session.auj = [];
		}
	else if (typeof(req.session.sprint) == 'undefined') {
	    req.session.sprint = [];
	}
	else if (typeof(req.session.mood) == 'undefined') {
	    req.session.mood = "";
	}
	next();
    })

/* On affiche la todolist et le formulaire */
    .get('/', function(req, res) {
	res.render('index.ejs', {hier: req.session.hier, auj: req.session.auj, mood: req.session.mod, sprint: req.session.sprint });
    })

/* On ajoute un élément à la todolist */
    .post('/ajouter/', urlencodedParser, function(req, res) {
	if (req.body.newtodo != '') {
	    req.session.auj.push(req.body.newtodo);
	}
	res.redirect('/');
    })

/* Supprime un élément de la todolist */
    .get('/todo/supprimer/:id', function(req, res) {
	if (req.params.id != '') {
	    req.session.todolist.splice(req.params.id, 1);
	}
	res.redirect('/');
    })

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function(req, res, next){
	res.redirect('/');
    })

    .listen(8080);
