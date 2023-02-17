const mongoose = require('mongoose');

/* Connection MongoDB*/
const mongoUrl = process.env.MONGO_DB;

mongoose.set("strictQuery", false);

mongoose.connect(mongoUrl)
        .then(() => console.log('Database connection successful'))
        .catch(err => console.error('Database connection error'));