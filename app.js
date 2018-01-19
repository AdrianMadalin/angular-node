const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');
const routes = require('./routes/routes');
const users = require('./routes/users');
const config = require('./config/database');

// mongoose.connect()
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
   console.log(`Connected to DB`);
}).on('error', (err)=>{
    console.log(`Eroare`, err);
});

const app = express();
const port = process.env.port || 8080;


app.use(cors());

// set static folde file
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use(routes);
app.use(users);


// start server and log
app.listen(port, ()=>{
    let date = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
    fs.appendFile(path.join(__dirname, './log/logfile.txt'), `${date}\n`, 'utf8', (err)=> {
        if(err) {
            console.log('Eroare',err);
            throw new Error(err);
        }
    });
    console.log(`Server started on port ${port}`);
});
