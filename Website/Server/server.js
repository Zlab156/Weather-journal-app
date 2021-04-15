// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
import express, { static } from 'express';

// Start up an instance of app
const app = express();
import { urlencoded, json } from 'body-parser';
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(static('website'));

// Cors for cross origin allowance
import cors from 'cors';
app.use(cors());

// Initialize the main project folder



// Setup Server
const port = 5500;

const server = app.listen(port, listening);

function listening() {
    console.log(`server running`);
    console.log(`running on localhost: ${port}`);
}

//Get data
app.get('/add', addJournalData);

function sendData(req,res) {
    res.send(projectData);
}

//Post data
app.post('/add', addData);

function addData (require,res) {
    Newjournalpost = {
       context: require.body.context,
       temp: require.body.temp,
       date: require.body.date, 
    }
    projectData = Newjournalpost;
    res.send(projectData);
}