/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const apikey = "9774c3958a7adc17c0ea70b5c7a02d3b&units=imperial";
const temp = document.getElementById('temp');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
const Zip = document.getElementById('zip').value;
const feel = document.getElementById('feelings').value;

getWeather(baseURL, Zip, apikey)
.then(function (data) {
    // add data to POST request
    console.log(data);
    postData('/add', { date: newDate, temperature: data.main.temp, feelings: userText});
    updateUI('/all');
  })
};
//Get weather
const getWeather = async (baseURL,Zip,apikey)=>{
    const res = await fetch(baseURL + Zip + apikey)
         try{
             const data = await res.json();
             console.log(data)
             return data;
         } catch (error) {
             console.log("error", error);
         } 
    }
//Post data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch (error) {
      console.log('error', error);
    };
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feelings;
    }
    catch (error) {
        console.log("error", error);
    }
};