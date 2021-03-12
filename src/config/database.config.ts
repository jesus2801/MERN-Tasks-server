import mongosee from 'mongoose';

const connectDB = async () => {
  try {
    await mongosee.connect(process.env.MONGODB!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('DB is connected');
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
