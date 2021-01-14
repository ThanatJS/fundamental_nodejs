const bcrypt = require('bcryptjs');
const myText = 'hello';
const ex = '$2a$10$ku5fyh6mKrMCnFVJv.8D5evGOgm9KgxpQtRkPHsy0fm56arJU77V2';
// const resultPromise = bcrypt.hash(myText,10);
// resultPromise.then((hash) => {
//     console.log(hash);
// })
// .catch((err) => {
//     console.log(err);
// })

bcrypt.compare(myText,ex)
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
})
