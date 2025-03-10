const express = require('express');
const fs = require('fs');
const cityApi = require('./api/city');
const coordinateApi = require('./api/coordinate');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.json());

app.get('/', (req,res) => {
    fs.readFile('./th-city.json',(err,data) => {
        const listObj = JSON.parse(data);
        if(err){
            res.status(400).send('Error List not Found');
        }else{
            res.status(200).render('home',{lists:listObj});
        }
    });
});
app.get('/api/coordinate',(req,res) => {
    const longtitude = req.query.lon !== "" ?req.query.lon : "0";
    const latitude = req.query.lat !== "" ?req.query.lat : "0";
    if(longtitude == null || latitude == null){
        const err = 'Error';
        res.status(400).render('notfound',{forcastObj: err});
    }else{
        const resultData = coordinateApi(longtitude,latitude)
        .then((result) => {
            const data = (result.data);
            res.status(200).render('forcast',{forcastObj:result.data});
        })
        .catch((err) => {
            res.status(400).render('notfound',{forcastObj: err});
        });
    }
})
app.get('/api/city',(req,res) => {
    const city = req.query.city !== "" ? req.query.city : "Bangkok";
    const country = "th";
    if(city == null || country == null){
        const err = 'Error';
        res.status(400).render('notfound',{forcastObj: err});
    }else{
        const resultData = cityApi(city,country)
        .then((result) => {
            const data = result.data;
            res.status(200).render('forcast',{forcastObj:result.data});
        })
        .catch((err) => {
            res.status(400).render('notfound',{forcastObj:err});
        });
    }
})

app.listen(3000,() => {
    console.log('Listening on port 3000');
})
