const mongoose = require('mongoose');

const url = process.env.APP_DATABASE_URL;

mongoose.connect(
    url,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Connection error:', error.message);
});

db.once('open', () => {
    console.log('Connected to DB!');
});

module.exports = mongoose;
