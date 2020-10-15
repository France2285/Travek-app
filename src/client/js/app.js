
let projectData = [];

/* Global Variables */
let placeVal = '';
let dateVal = '';

let countryName = '';
let lng = 0;
let lat = 0;
let weatherDescription = '';
let humidity = "";

/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);


function performAction(e){
  
  placeVal = document.getElementById('place').value;/*Take the place int the HTML*/
    console.log(placeVal)
    if (placeVal == null){
      alert ("Please enter a valid destination")
      return
    }
    
  /*   dateVal = document.getElementById('start').value;
console.log(dateVal) */

    postData('http://localhost:3000/getgeonames', {place: placeVal})
    .then(function(data){
      console.log(data)
      
      lng = data.geonames[0].lon;
      lat = data.geonames[0].lat;
      countryName = data.geonames[0].countryName;
     /* 
      console.log(lng)
      console.log(lat)
      console.log(countryName)
      */
      postData('http://localhost:3000/getweatherbit', {lon : data.geonames[0].lng, lat: data.geonames[0].lat })
      .then(function(data1){
        console.log(data1)
        
        
        weatherDescription = data1.data[0].weather.description;
        humidity = data1.data[0].rh;
        console.log(weatherDescription)
        console.log(humidity)

        //post...
        /*.then(function(data1){
          const nbDays = getNbDaysBeforeTrip()
          document.getElementById('div id to write').innerHTML = nbDays;

        })
        */

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