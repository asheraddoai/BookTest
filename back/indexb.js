var express = require('express');
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


app.get('/', function(req, res)
{
  var temp;

  Books.findAll().then(books => {
    temp = books;
    console.log("Sending " + JSON.stringify(temp));
    res.send(JSON.stringify(temp));

  });


	
	
	//res.send({temp:temp});
	//res.sendFile('/Users/V0X/hello/views/index.html');
	
	
});
app.get('/delete', function(req, res)
{
	console.log("Hello");
	console.log(req.query.id);
	Books.destroy({
		where: {
		  id: req.query.id
		}
	}).then(rowDeleted => {
  		
  		if(rowDeleted === 1){
			Books.findAll().then(books => {
  			var temp = books;
  			console.log(JSON.stringify(books));
			  console.log('Deleted successfully.....', temp);
				
				//res.redirect("/");
			});
      res.send(JSON.stringify(temp));
     			
		}
		
	});
	
	
	
});

app.post('/', function(req, res)
{

	console.log(req.body);
	Books.create({ Name: req.body.name, Price: req.body.price })
  	.then(book => {
		console.log( JSON.stringify(book) )
		Books.findAll().then(books => {
  		var temp = books;
  		console.log(JSON.stringify("Posting: " + JSON.stringify(temp)));
			res.send(JSON.stringify(temp));
		});
	});
});



app.listen(6968, function(){
  console.log("UnR");
});