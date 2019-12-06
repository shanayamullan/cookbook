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
  Dish.find({}, function(err, movies) {
    if (err) throw err;
    res.render('home',{data: movies});
});
});

app.get('/dishName', function(req,res){
  Dish.find({name}, function(err, movies) {
    if (err) throw err;
    res.render('home',{data: movies});
});
});

app.get('/cuisine', function(req,res){
  Dish.find({}, null, {sort: {cuisine: 1}}, function (err, result) {
    business = result.filter(function(result){
      return result.cusine;
    });
    res.render('home', {
      data:business
    })
  });
});

app.get('/course', function(req,res){
  Dish.find({}, null, {sort: {course: 1}}, function (err, result) {
    business = result.filter(function(result){
      return result.course;
    });
    res.render('home', {
      data:business
    })
  });
});

app.get('/dinner', function(req,res){
  Dish.find({course:"Dinner"}, function(err, movies) {
    if (err) throw err;
    res.render('home',{data: movies});
});
  // res.render('home', {
  // data: Dish.find({course:"Dinner"}),
  // renderDinner:true
  // });
});

app.get('/lunch', function(req,res){
  Dish.find({course:"Lunch"}, function(err, movies) {
    if (err) throw err;
    res.render('home',{data: movies});
});
});

app.get('/breakfast', function(req,res){
  Dish.find({course:"Breakfast"}, function(err, movies) {
    if (err) throw err;
    res.render('home',{data: movies});
});
});

app.get('/price', function(req,res){
  Dish.find({},null, {sort: {price: 1}}, function (err, result) {
    thedish = result.filter(function(result){
      return result.price;
    });
    res.render('home', {
      data:thedish
    })
  });
});

app.get('/chef', function(req,res){
  Dish.find({}, null, {sort: {chef: 1}}, function (err, result) {
    business = result.filter(function(result){
      return result.chef;
    });
    res.render('home', {
      data:business
    })
  });
});

app.get('/api/alphabetical', function(req,res) {
  Dish.find({},null, {sort: {name: 1}}, function (err, result) {
    mythings = result.filter(function(result){
      return result.name;
    });
    res.send(mythings)
  });
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
    return res.send('Succesfully inserted dosh.');
  });
});  

//have to make another page handlebars
app.get('/order-form', function(req,res){
  res.render('addorder');
});


app.post('/api/add-order', function(req, res) {
  //getting fields 
  var order = new Order({ 
  dishName: req.body.dishName,
  recipient: req.body.recipient


  });

  order.save(function(err) {
    if (err) throw err;
    return res.send('Succesfully inserted movie.');
  });
});  

app.post('/api/add-recipe', function(req, res) {
  //getting fields 
  var recipe = new Recipe({ 

  items: req.body.items,
  });

  order.save(function(err) {
    if (err) throw err;
    return res.send('Succesfully inserted movie.');
  });
});  

app.delete('/dish/:id', function(req, res) {
  // Find movie by id
  Dish.findByIdAndRemove(req.params.id, function(err, dish) {
  if (err) throw err;
  res.send('Dish deleted!');
});
});

//should be deleteed off page
app.delete('/order/:id', function(req, res) {
  // Find movie by id
  Order.findByIdAndRemove(req.params.id, function(err, business) {
  if (err) throw err;
  res.send('Business deleted!');
});
});

app.get('/group', function(req,res){
  res.render('group');
});


app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
