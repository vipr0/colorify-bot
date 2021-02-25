const mongoose = require('mongoose')

const setupMongoose = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connect(
        process.env.MONGO_URL,
        () => { console.log('Successfully connected to DB') }
    ).catch(console.error)
}

module.exports = setupMongoose