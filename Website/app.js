/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

const apikey = "5444a19938889d2fa295971ee299eaf0&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
const Zip = document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value;

getWeather(baseURL,Zip,apikey)
    .then(function(data) {
        console.log(data);
        postData('/add', {date:d, temp:data.list[0].main.temp, content:feelings})

    })
        .then(() => {
            updateUI();
        })

};

//Get weather
const getWeather = async (baseURL,Zip,apikey)=>{
    const response = await fetch(baseURL + Zip + apikey);
    try {
        const data = await response.json();
        return data;
    }catch(errror) {
        console.log('error', error);
    }
    
};

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