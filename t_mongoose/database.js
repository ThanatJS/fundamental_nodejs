const mongoose = require('mongoose');
const config = {
    autoIndex: true,
    useNewUrlParser: true,
};

const connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0.fvuwi.mongodb.net/dbUser?retryWrites=true&w=majority';
mongoose.connect(connectionString,config)
.then(() => console.log('Connect to MongoDB...') )
.catch(err => console.log('Cannot connect to MongoDB',err));

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    class: String,
    hobbies: [String],
    isStudying: {type:Boolean, default: true},
    score: {type: Number,default: 0}
});

const Student = mongoose.model('Student', studentSchema);
// const student = Student({
//         id: '06101009',
//         name: 'Thanat',
//         hobbies: ['Golf','Swimming'],
//         class: '6/1',
//         score: "99"
// });

// student.save()
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// })

async function studentAll() {
    const stAll = await Student.deleteMany();
    console.log(stAll);
}

studentAll();



