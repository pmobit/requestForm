//Single Page App using express

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//mongoDB
var mongodb = require('mongodb');
//could use local host or Atlas MongoDB link
var dbConnect = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'page')));
//post
app.post('/post', function (req, res) {
    dbConnect.then(function(db) {
        db.collection('feedbacks').insertOne(req.body);
    });    

    //recieved request in JSON parsed with strigify
    res.send('Request received:\n' + JSON.stringify(req.body));
});
//view
app.get('/view',  function(req, res) {
    dbConnect.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});
//port public 0.0.0.0
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );