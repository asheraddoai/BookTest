var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);


app.get('/', function(req, res)
{
	
	
	res.render("views/index",{name:'asher'});
	//res.send({name:'asher'});
	//res.sendFile('/Users/V0X/hello/views/index.html');
	
});

app.post('/', function(req, res){
  console.log(req.body);      // your JSON
  var name = req.body.name + ' Welcome';
  res.render("views/index",{name});
  //res.send();    // echo the result back
});

app.listen(6969, function(){
console.log("UnR");
});