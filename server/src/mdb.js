import mongoose from 'mongoose';

const {
  MONGO_INITDB_ROOT_USERNAME: username,
  MONGO_INITDB_ROOT_PASSWORD: password,
  MONGODB_CONTAINER: container,
} = process.env;

const url = `mongodb://${username}:${password}@${container}:27017?authSource=admin`;
const options = {};
// console.log(url);
const mongoConn = async () => {
  try {
    await mongoose.connect(url, options);
    console.log('Mdb connected');
  } catch (error) {
    console.log('Mdb failed to connect');
  }
};

export default mongoConn;
