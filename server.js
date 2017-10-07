var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
//var path = require("path")

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'hello'}));
//app.use(express.static(path.join(__dirname,'/static')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    if (!req.session.rand) {
        req.session.rand = Math.floor(Math.random() * 100);
    }
    var text;
    if (req.session.new > req.session.rand) {
        text = "too high!"
    } else if (req.session.new < req.session.rand) {
        text = "too low!"
    } else if (req.session.new == req.session.rand) {
        text = req.session.rand + " was the number!"
    } else {
        text = ''
    }

    res.render('index', {text: text})
})

app.post('/check', function (req, res) {
    req.session.new = req.body.number;
    res.redirect('/')
})

app.post('/reset', function (req, res) {
    req.session.destroy();    
    res.redirect('/')
})

app.listen(8000, function() {
    console.log("listening on 8000")
})