var express = require('express');
var request= require('request');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(bodyParser.urlencoded({
    extended: true
}));



/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sampleDB', 'postgres', 'test123', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Books = sequelize.define('Books', {
  Name: {
    	type: Sequelize.STRING
    },
  Price: {
    	type: Sequelize.INTEGER
    },
  id: {
    	type: Sequelize.INTEGER,
    	primaryKey: true,
    	autoIncrement: true
    }
  },
    {
    timestamps: false
  
  });

var temp;

Books.findAll().then(books => {
  temp = books;
  console.log(JSON.stringify(books));
});

*/
app.get('/', function(req, res)
{

	/*var options = {
  	host: 'localhost',
	port: 6968,
  	method: 'GET',
	};
	request(options, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    			console.log("Success!!" + body.id)
  		}
	//var temp = body;
	//res.render("views/index",{temp:temp});
	res.send(JSON.stringify(response));
	});*/
	
	request('http://localhost:6968', { json: true }, (err, resp, body) => {
  	if (err) { return console.log(err); }
  	console.log(body);
	var temp = body;
	res.render("views/index",{temp:temp});
  	//console.log(resp);
});
	
	
});
app.get('/delete', function(req, res)
{
	console.log("Hello");
	console.log(req.query.id);
	/*Books.destroy({
		where: {
		  id: req.query.id
		}
	}).then(rowDeleted => {
  		
  		if(rowDeleted === 1){
			Books.findAll().then(books => {
  				temp = books;
  				console.log(JSON.stringify(books));
				console.log('Deleted successfully.....', temp);
				res.render("views/index",{temp:temp});
				res.redirect("/");
			});
     			
		}
		
	});
	*/
	
	request('http://localhost:6968/delete?id=' + req.query.id, { json: true,  method:'GET' }, (err, resp, body) => {
  		if (err) { return console.log(err); }
  		//console.log(body);
		var temp = body;
    console.log(JSON.stringify(temp));
		res.render("views/index",{temp:temp});
  		//console.log(resp);
	});
	
	
});

app.post('/', function(req, res)
{
	/*var options = {
  	url: 'localhost:6968/',
  	method: 'POST',
  	json: true,
	body:{name: req.body.name, price: req.body.price}
	};
	request(options, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    			console.log("Success!!" + body.id)
  		}
	var temp = body;
	res.render("views/index",{temp:temp});
	});*/
	request('http://localhost:6968', { json: true, method: 'POST',body:{name: req.body.name, price: req.body.price}  }, (err, resp, body) => {
  		if (err) { return console.log(err); }
  		console.log(body);
		var temp = body;
		res.render("views/index",{temp:temp});
  		//console.log(resp);
	});
	
});



app.listen(6969, function(){
console.log("UnR");
});