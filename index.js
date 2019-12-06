var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require ('handlebars');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require("underscore");
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var Dish = require('./models/Dish');
var Order = require('./models/Order');
var Recipe = require('./models/Recipe');



var dotenv = require('dotenv');
dotenv.config();

//var http = require('http').Server(app);
//var io = require('socket.io')(http);


var url = "mongodb://localhost:3000/Dish";

// Connect to MongoDB
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});




// mongoose.connect(process.env.MONGODB);
// mongoose.connection.on('error', function() {
//     console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
//     process.exit(1);
// });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(logger('dev'));
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
  Dish.find({}, function(err, dishes) {
    if (err) throw err;
    res.send(dishes);
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
  var dish = new Dish({ 
  name: req.body.name,
  cuisine: req.body.cuisine ,
  course: req.body.course ,
  price: parseInt(req.body.price),
  chef: req.body.chef ,
  allergens: req.body.allergens,
  });

  dish.save(function(err) {
    if (err) throw err;
    return res.send('Succesfully inserted movie.');
  });
});  

//have to make another page handlebars
app.get('/order-form', function(req,res){
  res.render('addorder');
});


app.post('/api/add-order', function(req, res) {
  //getting fields 
  var order = new Order({ 
  name: req.body.name,

  });

  dish.save(function(err) {
    if (err) throw err;
    return res.send('Succesfully inserted movie.');
  });
});  

app.delete('/dish/:name', function(req, res) {

  // Find and delete by name
  Dish.deleteOne({ name: req.params.name }, function (err) {});
  res.send('Dish deleted!');
 

});

//should be deleteed off page
app.delete('/order/:name', function(req, res) {

  // Find and delete by name
  Order.deleteOne({ name: req.params.name }, function (err) {});
  res.send('Order deleted!');
 

});


app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
