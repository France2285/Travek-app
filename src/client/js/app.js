
let projectData = [];

/* Global Variables */
let placeVal = '';
let dateVal = '';
let countryName = '';
let lng = 0;
let lat = 0;
let weatherDescription = '';
let maxtemp = "";
let mintemp = "";
let icon = "";
let pixa_image = '';

//Take all element ID to work on it
let placeTrip = document.getElementById ("placeGenerate");
let dateTrip = document.getElementById ("dateGenerate");
let imgContent = document.getElementById ("imageReceived");
let weatherContent = document.getElementById ("entryHolder");

/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);


function performAction(e){
// Take the informations about the input place
  placeVal = document.getElementById('place').value;
    console.log(placeVal)
    if (placeVal == null){
      alert ("Please enter a valid destination")
      return
    }

// Take the informations about the input date
  dateVal = document.getElementById("start").value;
    if (dateVal == null){
      alert ("please enter a valid date dd/mm/yyyy")
      return
      }

//Send the information to Geonames URL and take the information needed
    postData('http://localhost:3000/getgeonames', {place: placeVal})
    .then(function(data){
      console.log(data)
      
      lng = data.geonames[0].lon;
      lat = data.geonames[0].lat;
      countryName = data.geonames[0].countryName;
      placeTrip.innerHTML = "My trip To : " + placeVal;

//Create the data format and check what the client is wrtiting
      let myDate = new Date(dateVal);
      let current_date = new Date();

      if(myDate.getDate() > current_date.getDate() + 16 || myDate.getDate() < current_date.getDate()){         
        alert("Error : you must specify a date within 16 days from the current date")
        return
      }

//Send the data to weatherbit and take all the information need: longitude, latiture and the date
      postData('http://localhost:3000/getweatherbit', {lon : data.geonames[0].lng, lat: data.geonames[0].lat, date : dateVal })
      .then(function(data1){
        console.log(data1)
        //Choose the right date on the data
        var i = 0;
        while(data1.data[i].valid_date != dateVal){
          i++;
        }

        // Take the information we need on the data
        weatherDescription = data1.data[i].weather.description;
        maxtemp = data1.data[i].max_temp;
        mintemp = data1.data[i].min_temp;

        // Write on the HTML file
        weatherContent.innerHTML = "Forecast weather for then is : " + weatherDescription + " and the temperature will be between " + mintemp + " °C and "+ maxtemp +" °C" + icon;

        //Send the data form pixabay to find a picture
        postData('http://localhost:3000/getpixaBay', {place : placeVal})
          .then(function(data2){
            pixa_image = data2.hits[0].webformatURL;

            //Write on HTML file what we need to show t the client
            imgContent.innerHTML = '<img src =\"'+ pixa_image+'">';
            let nbDays = getNbDaysBeforeTrip()
            dateTrip.innerHTML = "Departing in "+ nbDays + " days";
        })
      })
  })
}

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

//Create a countdown
function getNbDaysBeforeTrip(){
  let dateVal = new Date(document.getElementById("start").value);
  let current_date = new Date();
  let dateTxt = current_date.getFullYear()+'-'+(current_date.getMonth()+1)+'-'+current_date.getDate();
  
  let Difference_In_Time = dateVal.getTime() - current_date.getTime(); 
  let Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24)); 
  return Difference_In_Days
}

export {performAction}