
//Object data modelling library for mongo
const mongoose = require('mongoose');

//Mongo db client library
//const MongoClient  = require('mongodb');

//Express web service library
const express = require('express')

//used to parse the server response from json to object.
const bodyParser = require('body-parser');

//instance of express and port to use for inbound connections.
const app = express()
const port = 3000

//connection string listing the mongo servers. This is an alternative to using a load balancer. THIS SHOULD BE DISCUSSED IN YOUR ASSIGNMENT.
const connectionString = 'mongodb://localmongo1:27017,localmongo2:27017,localmongo3:27017/NotFLIXDB?replicaSet=rs0';

setInterval(function() {

  console.log(`Intervals are used to fire a function for the lifetime of an application.`);

}, 3000);

//tell express to use the body parser. Note - This function was built into express but then moved to a seperate package.
app.use(bodyParser.json());

//connect to the cluster
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var informationSchema = new Schema({
  _id: Number,
  accountID: Number,
  userName: String,
  titleID: Number,
  userAction: String,
  dateAndTime: Date,
  pointOfInteration: String,
  typeOfInteraction: String


});

var informationModel = mongoose.model('information', informationSchema, 'informtaion');



app.get('/', (req, res) => {
  informationModel.find({},'userName titleID userAction dateAndTime pointOfInteraction typeOfInteraction', (err, information) => {
    if(err) return handleError(err);
    res.send(JSON.stringify(information))
  }) 
})


app.post('/',  (req, res) => { 
  var new_information_instance = new informationModel(req.body); 
  new_information_instance.save(function (err) { 
  if (err) res.send('Error'); 
    res.send(JSON.stringify(req.body)) 
  }); 
}) 






app.put('/',  (req, res) => {
  res.send('Got a PUT request at /')
})

app.delete('/',  (req, res) => {
  res.send('Got a DELETE request at /')
})

//bind the express web service to the port specified
app.listen(port, () => {
 console.log(`Express Application listening at port ` + port)
})

