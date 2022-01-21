require('./model/db');

const path = require('path');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');


const PORT = process.env.PORT || 5000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// const url = 'mongodb://127.0.0.1:27017'
 const url = "mongodb+srv://admin:admin123@cluster0.6fhhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const store = new MongoDBStore({
    uri: url,
    collection: 'sessions',
    

 });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    }).single('image')
);


app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    

    })
);


// const csrfProtection = csrf();
// app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
 
    // res.locals.csrfToken = req.csrfToken();
    next();
});
const admin = require('./routes/admin');
const clientroutes = require('./routes/client');

app.use(clientroutes);
app.use('/controller',admin);



app.listen(PORT)