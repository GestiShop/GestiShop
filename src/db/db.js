/* eslint-disable import/prefer-default-export */
const mongoose = window.require('mongoose');

const connect = () => {
  return mongoose.connect(
    process.env.DATABASE_URL.replace(
      '<password>',
      process.env.DATABASE_PASSWORD
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export { connect };
