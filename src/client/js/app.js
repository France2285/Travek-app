'http://api.geonames.org/searchJSON?name='+ destination +'&maxRows=1&username=france'

/* Global Variables */
const apiKey = '';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial&zip=';
let userAnswer = '';

/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);


function performAction(e){
    destination = document.getElementById('place').value;/*Take the zip code from HTML*/
    if (isNaN(destination)){
      alert ("Please enter a valid destination")
      return
    }
    userAnswer = document.getElementById('feelings').value;/*Take the answer from the user*/
    const customURL = baseURL + zipCode /*Create the new URL with the zip code*/
    getData(customURL).then(function(data){
      console.log(data)
      const reqBody = {
                            temperature: data.main.temp, 
                            date: newDate, 
                            userResponse: userAnswer
                        } 
    console.log(reqBody)
    /*send and post the data*/
    postData('http://localhost:3000/add', {temperature: data.main.temp, date: newDate, userResponse: userAnswer})
    }).then(function(data){
      getData('http://localhost:3000/all').then(function(data){
        console.log(data)
        
        document.getElementById('temperature').innerHTML = data.temperature
        document.getElementById('userinput').innerHTML =  data.date
        document.getElementById('date').innerHTML = data.userResponse

      })
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