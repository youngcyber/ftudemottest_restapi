const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dummy data
let events = [
    { id: 1, name: 'John Doe', student_id: 'S123', branch: 'CSE', year: '3' },
    { id: 2, name: 'Jane Smith', student_id: 'S124', branch: 'ECE', year: '2' }
];

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define a sample REST API route
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is your data' });
});

// CRUD API routes
// Create a new event
app.post('/api/events', (req, res) => {
    const newEvent = { id: events.length + 1, ...req.body };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Read all events
app.get('/api/events', (req, res) => {
    res.json(events);
});

// Read a single event by ID
app.get('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).send('Event not found');
    res.json(event);
});

// Update an event by ID
app.put('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).send('Event not found');

    Object.assign(event, req.body);
    res.json(event);
});

// Delete an event by ID
app.delete('/api/events/:id', (req, res) => {
    const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
    if (eventIndex === -1) return res.status(404).send('Event not found');

    const deletedEvent = events.splice(eventIndex, 1);
    res.json(deletedEvent);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
