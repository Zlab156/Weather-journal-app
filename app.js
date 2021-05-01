/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=1cc21e1fd8a9e8868b138b75d9f31ecd';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apikey)
    .then(function (data) {
        // add data to POST request
        const temperature = data.main.temp;
        console.log(data);
        postData('/add', {date: newDate, temperature: temp, context: feelings}).then(updateUI());
    });
} 
//Get weather
const getWeather = async(baseURL, zip, apikey) => {
    const res = await fetch(baseURL+zip+apikey);
    try {
        const data = await res.json();
             return data;
        } catch (error) {
             console.log("error", error);
        } 
    };  
//Post data
const postData = async(url, data) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temperature').innerHTML = allData.temperature;
        document.getElementById('feelings').innerHTML = allData.feelings;
    }
    catch (error) {
        console.log("error", error);
    }
};