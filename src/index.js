const express = require('express'); 
const app     = express();
const cors    = require('cors');
const routes  = require("./routes"); //routes
const config  = require('./config');
require('dotenv/config'); // eviroment vars
require('./database/mongo'); //mongo connection

/* Accept form and json formats */
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

/* CORS-enabled for all origins! */
app.use(cors())

/* routes */
app.use(routes);

app.listen(config.PORT, () => {
    console.log('Server running on port ' + config.PORT)
});