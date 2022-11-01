if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const expressLayouts= require('express-ejs-layouts')
const app = express();
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const mongoose = require('mongoose');
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts)
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/authors', authorRouter);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'));


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");

})