const dotenv = require('dotenv');
dotenv.config();

const geonames_username = process.env.GEONAMES_USERNAME;
const weatherAPI_KEY = process.env.weatherbit_KEY;
console.log(geonames_username)

let placeVal="";

const baseURL = 'http://api.geonames.org/searchJSON?maxRows=1&username=' + geonames_username + '&name=';
const baseURL2=  'https://api.weatherbit.io/v2.0/current?key=' + weatherAPI_KEY ;

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
    projectData.place = data.place;
    projectData.date = data.date;
    res.send('Data Added!');
})

//POST FOR GEONAMES
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

//POST FOR WEATHERBIT
app.post('/getweatherbit', function(req, res){
    const formData = req.body;
    console.log('data received!');
    console.log(formData);

    //calling the api
    console.log('calling api')
    console.log(baseURL2 + '&lat=' +encodeURIComponent(formData.lat) + '&lon=' +encodeURIComponent(formData.lon))
    
    getData(baseURL2 + '&lat=' +encodeURIComponent(formData.lat) + '&lon=' +encodeURIComponent(formData.lon)) //encodeURIComponent()
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