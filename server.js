// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(static('website'));

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('Website'));


// Setup Server
const port = 5500;

const server = app.listen(port, listening);

function listening() {
    console.log(`server running`);
    console.log(`running on localhost: ${port}`);
}

//Get data
app.get('/data', getWeather);

function getWeather(req,res) {
    res.send(projectData);
}

//Post data
app.post('/add', addData);

function addData (req,res) {
    Newjournalpost = {
       resp: req.body.resp,
       temp: req.body.temp,
       date: req.body.date, 
    }
    projectData = Newjournalpost;
    res.send(data);
    console.log(Newjournalpost);
};