// require required libraries/modules?
const express = require('express'); // we need express!
const app = express(); // create an instance of express
app.use(express.json()); // allows us to use the json libraries in express (like using bodies for POST and PUT)

const data = require('./data'); // data.json file that contains all of the... data
const db = require('./queries'); // queries.js for database functions

// ROUTES
// Test Routes
//
app.get('/', (req, res)=> { // landing page
    res.json({ummm: "hey trying using ~/events instead ^-^"});
});

app.get('/test', (req, res)=> { // just a simple test
    res.json({test: "Hiya~"});
});

// Actual Routes
//
// send a GET request to /events to READ a list of events
app.get('/events', db.getEvents);
// app.get('/events', (req, res)=> {
//     res.json(data.events);
// });

// send a GET request to /events/:id to READ an event
app.get('/events/:id', db.getEventById);
// app.get('/events/:id', (req, res)=> {
//     const foundEvent = data.events.find(event => {
//         return parseInt(req.params.id) === event.id; // return if requested id is same as an existing id in the events object
//         //res.status(404).send("ID NOT FOUND"); // TODO
//     });
//    res.json(foundEvent);
// });

// send a POST request to /events/new to CREATE an event
app.post('/events', db.createEvent);
// app.post('/events', (req, res)=> {
//     const newEvent = { // this sets the inputs you put in the body of Postman or whatever and sets it as a JSON object in the server???
//         id: req.body.id,
//         name: req.body.name,
//         description: req.body.description
//     }
//     data.events.push(newEvent); // pushes new event to the JSON data object
//     res.json(data); // this uhh does something?? sends the results to some sort of server or output or i dunno
// });

// send a PUT request to /events/:id to UPDATE an event
app.put('/events/:id', db.updateEvent);
// app.put('/events/:id', (req, res)=> {
//     const foundEvent = data.events.find(event => {
//         return parseInt(req.params.id) === event.id; // return if requested id is same as an existing id in the events object
//         //res.status(404).send("ID NOT FOUND"); // TODO
//     });
//     //oldEvent.id = req.body.id; // LETS NOT ALLOW US TO CHANGE THE ID YET
//     foundEvent.name = req.body.name;
//     foundEvent.description = req.body.description;
//     res.json(data);
// });

// send a DELETE request to /events/:id to DELETE an event
app.delete('/events/:id', db.deleteEvent);
// app.delete('/events/:id', (req, res)=> {
//     const foundEvent = data.events.find(event => {
//         return parseInt(req.params.id) === event.id; // return if requested id is same as an existing id in the events object
//         //res.status(404).send("ID NOT FOUND"); // TODO
//     });
//     const eventIndex = data.events.indexOf(foundEvent) // find the index of our event // NOTE: there is a findIndex() method that combines find() and indexOf()
//     data.events.splice(eventIndex, 1); // delete the event
//     res.json(data); // generally you want to return the item ACTED ON so it may be better to define the splice() statement as a const that gets returned here as a single-item array (ex: deleted[0])
// });

// do this to make things actually work
app.listen(3000, () => console.log('Eventonica API listening on port 3000!'));