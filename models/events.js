// require mongoose to connect 
const mongoose= require('mongoose');

// this sis the event schema of Todo App
const eventSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
});

const Event = mongoose.model('Event',eventSchema);

// exports this schema 
module.exports = Event;