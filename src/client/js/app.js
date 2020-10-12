

/* Global Variables */
let placeVal = '';
let dateVal = '';

/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);


function performAction(e){
  alert("coucou")
  placeVal = document.getElementById('place').value;/*Take the place int the HTML*/
    console.log(placeVal)
    if (placeVal == null){
      alert ("Please enter a valid destination")
      return
    }
    
    dateVal = document.getElementById('start').value;/*Take the answer from the user*/
console.log(dateVal)

    postData('http://localhost:3000/getgeonames', {place: placeVal})
    .then(function(data){
      console.log(data)
      const lng = data.geonames[0].lng;
      const lat = data.geonames[0].lat;
      const countryName = data.geonames[0].countryName;
      console.log(lng)
      console.log(lat)
      console.log(countryName)
      postData('http://localhost:3000/getweatherbit', {lon : data.geonames[0].lng, lat: data.geonames[0].lat })
      .then(function(data1){
        console.log(data1)
        console.log(data1.data[0].weather.description)
      
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

 
export {performAction}