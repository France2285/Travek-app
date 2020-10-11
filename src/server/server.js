// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)})


//Server routes
app.get('/all', function(req, res){
    console.log('Route /all called!')
    console.log(projectData)
    res.send(projectData)
})


app.post('/add', function(req, res){
    const data = req.body;
    console.log(data);
    projectData.temperature = data.temperature;
    projectData.date = data.date;
    projectData.userResponse = data.userResponse;
    res.send('Data Added!');
})
