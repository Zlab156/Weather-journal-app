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
    let temperature = document.getElementById('temp').value;
    getWeather(baseURL, zip, apikey)
    .then(function (data) {
        // add data to POST request
        console.log(data);
        postData('/add', { date: newDate, temperature: temp, context:feelings}).then(updateUI());
    });
}; 
//Get weather
const getWeather = async(baseURL, zip, apikey) => {
    const res = await fetch(baseURL+zip+apikey)
    try {
        const data = await res.json();
             console.log(data)
             return data;
        } catch (error) {
             console.log("error", error);
        } 
    }
    
//Post data
const postData = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const resData = await response.json();
        console.log(resData);
        return resData;
    } catch (error) {
        console.log('error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].feelings;
    }
    catch (error) {
        console.log("error", error);
    }
};