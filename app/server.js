var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

/**
 * When runing on teh local machine in development, the url
 * for the mongodb must point to the localhost. When running
 * in production, the url must point to the mongodb domain.
 * 
 * The port can also be omitted, because it is given in the compose 
 * file `mongo.yaml`
 * 
 */



const env = {
  mode: 'production',
  dbname: 'my-db',
  collection: 'users',
  port:3000
};


if (env.mode === 'development') {
  env.root = "./";
  env.url = 'mongodb://admin:password@localhost:27017'
}


if (env.mode === 'production') {
  env.root = "/home/app/";
  env.url = 'mongodb://admin:password@mongodb'
}



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture', function (req, res) {
  var img = fs.readFileSync(`${env.root}images/profile-1.jpg`);
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.post('/update-profile', function (req, res) {
  var userObj = req.body;

  MongoClient.connect(env.url, function (err, client) {
    if (err) throw err;

    var db = client.db(env.dbname);
    userObj['userid'] = 1;

    var myquery = { userid: 1 };
    var newvalues = { $set: userObj };

    db.collection(env.collection).updateOne(myquery, newvalues, { upsert: true }, function (err, res) {
      if (err) throw err;
      client.close();
    });

  });
  // Send response
  res.send(userObj);
});

app.get('/get-profile', function (req, res) {
  var response = {};
  // Connect to the db
  MongoClient.connect(env.url, function (err, client) {
    if (err) throw err;

    var db = client.db(env.dbname);

    var myquery = { userid: 1 };

    db.collection(env.collection).findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.listen(env.port, function () {
  console.log(`app listening on port ${env.port}! http://localhost:${env.port}`);
});
