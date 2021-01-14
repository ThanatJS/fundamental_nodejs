const express = require('express');
const app = express();
const fs = require('fs');
app.set('view engine','ejs');
app.set('views','all-views');

app.get('/', (req,res) => {
    //res.status(200).send('Hello World');
    //res.render('first_template',{name:'Thanat'});
    fs.readFile('data.json',(err,data) =>{
        const list = JSON.parse(data);
        if(err){
            res.status(404).send('Error List not Found');
        }else{
            res.render('first_template',{list:list});
        }
    })
});

app.listen(3000, () =>{
    console.log('Listening on Port 3000');
})