import mongosee from 'mongoose';

const connectDB = async () => {
  try {
    await mongosee.connect(process.env.MONGODB!, {});
    console.log('DB is connected');
  } catch (e) {
    console.log(e);
    console.log('errroooor');
    process.exit(1);
  }
};

export default connectDB;
