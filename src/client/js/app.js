
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
let pixa_image = '';

let placeTrip = document.getElementById ("placeGenerate");
let dateTrip = document.getElementById ("dateGenerate");
let imgContent = document.getElementById ("imageReceived");
let weatherContent = document.getElementById ("entryHolder");


/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);


function performAction(e){
  
  placeVal = document.getElementById('place').value;
    console.log(placeVal)
    if (placeVal == null){
      alert ("Please enter a valid destination")
      return
    }
  dateVal = document.getElementById("start").value;
    if (dateVal == null){
      alert ("please enter a valid date dd/mm/yyyy")
      return
      }
    postData('http://localhost:3000/getgeonames', {place: placeVal})
    .then(function(data){
      console.log(data)
      
      lng = data.geonames[0].lon;
      lat = data.geonames[0].lat;
      countryName = data.geonames[0].countryName;
      placeTrip.innerHTML = "My trip To : " + placeVal;

      /*
      
      si dateval > date daujourdhui alors changer l'ammee de dateval a lanne du jour - 1
      sinon
      */
      let myDate = new Date(dateVal);
      let current_date = new Date();

      if(myDate.getDate() > current_date.getDate() + 16 || myDate.getDate() < current_date.getDate()){         
        alert("Error : you must specify a date within 16 days from the current date")
        return
      }

      postData('http://localhost:3000/getweatherbit', {lon : data.geonames[0].lng, lat: data.geonames[0].lat, date : dateVal })
      .then(function(data1){
        console.log(data1)
        
        var i = 0;
        while(data1.data[i].valid_date != dateVal){
          console.log(i)
          console.log(data1.data[i].valid_date)
          console.log(dateVal)
          i++;
        }
        
        weatherDescription = data1.data[i].weather.description;
        maxtemp = data1.data[i].max_temp;
        mintemp = data1.data[i].min_temp;

        console.log(weatherDescription)
        console.log(maxtemp)
        console.log(mintemp)

        weatherContent.innerHTML = "Forecast weather for then is : " + weatherDescription + " and the temperature will be between " + mintemp + " °C and "+ maxtemp +" °C";

        postData('http://localhost:3000/getpixaBay', {place : placeVal})
          .then(function(data2){
            console.log(data2)
            
            pixa_image = data2.hits[0].webformatURL;
            console.log(pixa_image)

            
            imgContent.innerHTML = '<img src =\"'+ pixa_image+'">';
            let nbDays = getNbDaysBeforeTrip()
            dateTrip.innerHTML = "Departing in "+ nbDays + " days";

        })
        

      })
  })
}

    
// Create a new date instance dynamically with JS
/* let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); */

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

  /*console.log(dateVal)
  console.log(dateTxt)
  console.log(Difference_In_Days)*/
  return Difference_In_Days
}

export {performAction}