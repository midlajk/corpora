const mongoose = require("mongoose");

// Connect to the db
const url = "mongodb+srv://midlaj:zain9747@cluster0.nuuwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//Connect methode of mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Connect methode of mongoose

//include employee model

require('./data');
