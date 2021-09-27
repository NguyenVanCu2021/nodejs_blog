//https://mongoosejs.com/
// connect tới địa chỉ CSDL mongoDB (mongodb://localhost:27017/f8_education_dev)
const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('sucseccfull')
    } catch (err) {
        console.log('failed')
    }

}

module.exports = { connect };