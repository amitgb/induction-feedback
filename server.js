var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('elitefeedbackdb',['elitefeedbackdb']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/feedback',function(req,res){
	console.log("Feedback SERVER: I received a get request");
	// db.elitefeedbackdb.find(function(err,docs){
	// 	console.log(docs);
	// 	res.json(docs);
	// });
});

app.post('/feedback', function(req,res){
  console.log('(SERVER)POST: call received');
  console.log(req.body);
 //	res.json('{a:1}');	
  db.elitefeedbackdb.insert(req.body,function(err,doc){
  	res.json(doc);
  	console.log("Feedback SERVER: Inserted successfully");
  });
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(port, ip)
console.log("NODE.js Server running on port 3000");