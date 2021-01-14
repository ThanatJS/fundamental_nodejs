const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const homeController = require('./controllers/home-controller');
const pageNotFoundController = require('./controllers/page-not-found-controller');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(authRoute);

const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0.fvuwi.mongodb.net/dbUser?retryWrites=true&w=majority';
mongoose.connect(connectionString,config)
.then(() => console.log('Connect to MongoDB...') )
.catch(err => console.log('Cannot connect to MongoDB',err));

app.get('/',homeController.home);
app.get('*',pageNotFoundController.notFound);


const port = process.env.port || 3000;

app.listen(port,() => {
    console.log('Listening on port',port);
})