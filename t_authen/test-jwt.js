const jwt = require('jsonwebtoken');
const payload = {
    name:"Jeerawuth",
    occupation:"Engineer",
    age:14
}
const key = 'keytest';
const token = jwt.sign(payload, key, { expiresIn: 60*5});
console.log(token);

try{
    const dataInToken = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmVlcmF3dXRoIiwib2NjdXBhdGlvbiI6IkVuZ2luZWVyIiwiYWdlIjoxNCwiaWF0IjoxNjEwMzY1Nzg0LCJleHAiOjE2MTAzNjYwODR9.9DCYYo8h01c-eULgAv24LGfPLnCeV3OeWVnntXy6wXk',key);
    console.log(dataInToken);
}catch(error){
    console.log(error);
}