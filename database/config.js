const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.CNN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connection OK');
  } catch (error) {
    throw new Error('Connection Error')
  }
}

module.exports = { dbConnection }