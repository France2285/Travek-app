

/* Global Variables */
let placeVal = '';
let date = '';
let userAnswer = '';

/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);


function performAction(e){
  alert("coucou")
  placeVal = document.getElementById('place').value;/*Take the place int the HTML*/
    console.log(place)
    if (place == null){
      alert ("Please enter a valid destination")
      return
    }
    
    date = document.getElementById('date').value;/*Take the answer from the user*/

    postData('http://localhost:3000/getgeonames', {place: placeVal})
    .then(function(data){
      console.log(data)
    })
}

    
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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