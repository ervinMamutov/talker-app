import mongoose from 'mongoose';
const connectToDB = async () => {
  try {
    await mongoose.connect(print.env.CONNECTION_URI);
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;
