const mongoose = require('mongoose')
const {MONGODB_URI} = process.env

const dbConnection = async() => {
  try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Database is Connected')

  } catch (e) {
    console.log(e)
    throw new Error('Error to connect BD')
  }
}

module.exports = {
  dbConnection
}
