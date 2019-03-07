// using the node-postgres module to create a pool of connections
// so we dont have to open a client and close it every time we make a query
const Pool = require('pg').Pool;
const pool = new Pool({
    //user: 'me',
    host: 'localhost',
    database: 'eventonica',
    //password: 'password',
    //port: 5432
});

// Routes/ Endpoints (WHY DONT ANY OF THESE NEED SEMICOLONS GAHH)
//
// send a GET request to /events to READ a list of events
const getEvents = (req, res) => {
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

// send a GET request to /events/:id to READ a single event
const getEventById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

// send a POST request to /events to CREATE a single event
const createEvent = (req, res) => {
    const { name, description } = req.body;
    pool.query('INSERT INTO events (name, description) VALUES ($1, $2) RETURNING *', [name, description], (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        res.status(201).send(`Event added with ID: ${results.rows[0].id}`);
    });
}

// send a PUT request to /events to UPDATE a single event
const updateEvent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    pool.query('UPDATE events SET name = $1, description = $2 WHERE id = $3', [name, description, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Event modified with ID: ${id}`);
    });
}

// send a DELETE request to /events to DELETE a single event
const deleteEvent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Event delete with ID: ${id}`);
    });
}

// WE GOTTA ACTUALLY EXPORT THESE TO USE THEM
module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}