var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require ('handlebars');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require("underscore");
var fs = require('fs');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var _DATA = dataUtil.loadData().dishes;



/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

//Get Requests: 
app.get("/", function(req,res){
  res.render('home', {
    data: _DATA
  });
})

app.get('/dishName', function(req,res){
  res.render('home', {
    data: _.where(_DATA,{name}),

  });
});

app.get('/cuisine', function(req,res){
  res.render('home', {
    data: _.sortBy(_DATA, function(dish) { return dish.cuisine }),
    renderCuisine:true
  });
});
app.get('/course', function(req,res){
  res.render('home', {
    data: _.where(_DATA,{course}),
    renderCourses:true
  });
});


app.get('/dinner', function(req,res){
  res.render('home', {
    data: _.where(_DATA,{course:"Dinner"}),
    renderDinner:true
  });
});

app.get('/lunch', function(req,res){
  res.render('home', {
    data: _.where(_DATA,{course:"Lunch"}),
    renderDinner:true
  });
});

app.get('/breakfast', function(req,res){
  res.render('home', {
    data: _.where(_DATA,{course:"Breakfast"}),
    renderDinner:true
  });
});

app.get('/price', function(req,res){
  res.render('home', {
    data: _.sortBy(_DATA, function(dish) { return dish.price })
  });
});

app.get('/chef', function(req,res){
  res.render('home', {
    // data: _.sortBy(_DATA, function(dish) { return dish.chef })
    data: _.where(_DATA,{chef})
  });
});

app.get('/api/alphabetical', function(req,res) {
  var val = _.sortBy(_DATA, function(dish) { return dish.name })
  res.json(val)
});

app.get('/dish-form', function(req,res){
  res.render('adddish');
});

app.post('/api/add-dish', function(req, res) {
  //getting fields 
  let _name= req.body.name
  let _cuisine = req.body.cuisine 
  let _course = req.body.course 
  let _price = req.body.price
  let _chef = req.body.chef 
  let _allergens = req.body.allergens 

  let result = _.findWhere(_DATA, {name: _name})

	if(result){
		res.send("The dish has already been added")
	} else {
		let obj = [{
			
			"name": _name,
			"cuisine": _cuisine,
			"course": _course,
			"price": _price,
			"chef": _chef,
			"allergens": _allergens
		}]
		_DATA = _.union(_DATA, obj)
	
		let ret = {
			dishes: _DATA
    }
    fs.writeFileSync("dishes.json", (JSON.stringify(ret, null, 4)))
  }
  res.redirect("/");
});


app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
