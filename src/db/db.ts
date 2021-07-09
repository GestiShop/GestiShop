const { connect } = window.require('mongoose');

const connectDb = () => {
  if (
    process &&
    process.env &&
    process.env.DATABASE_URL &&
    process.env.DATABASE_PASSWORD
  ) {
    return connect(
      process.env.DATABASE_URL.replace(
        '<password>',
        process.env.DATABASE_PASSWORD
      ),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  return connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
