const dotenv = require('dotenv');
dotenv.config();

const geonames_username = process.env.GEONAMES_USERNAME;
console.log(geonames_username)

const baseURL = 'http://api.geonames.org/searchJSON?maxRows=1&username=' + geonames_username + '&name=';


// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require("express");


// to be able to use fetch on from the server
const fetch = require('node-fetch');


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

app.post('/getgeonames', function(req, res){
    const formData = req.body;
    console.log('data received!');
    console.log(formData);

    //calling the api
    console.log('calling api')
    console.log(baseURL + encodeURIComponent(formData.place))
    
    getData(baseURL + encodeURIComponent(formData.place)) //encodeURIComponent()
    .then(function(data){
        console.log(data)
        res.send(data);
      })
})

app.post('/getweather', function(req, res){
    const formData = req.body;
    console.log('data received!');
    console.log(formData);

    //calling the api
    console.log('calling api')
    console.log(baseURL + encodeURIComponent(formData.place))
    
    getData(baseURL + encodeURIComponent(formData.place)) //encodeURIComponent()
    .then(function(data){
        console.log(data)
        res.send(data);
      })
})

//GET ROUTE
const getData = async (url='') =>{ 
    let allData = ''
    const request = await fetch(url);
    try {
        allData = await request.json()
    }
    catch(error) {
        console.log("error", error);
        }
    return allData;
}

//POST ROUTE
const postData = async ( url = '', data = {}) => {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),        
      });
      try {
        const newData = await response.json();
        return newData
      }catch(error) {
        console.log("error", error);
      }
  }