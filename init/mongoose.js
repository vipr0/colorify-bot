const mongoose = require('mongoose')

const setupMongoose = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(
        process.env.MONGO_URL,
        () => { console.log('successfully connected!') }
    ).catch(console.error)
}

module.exports = setupMongoose