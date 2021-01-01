import * as env from 'env-var';
import mongoose from 'mongoose';

const connection: any = {};
const DB_URI: string = env.get('DB_URI').required().asString();

const dbConnect = async () => {
  if (connection.isConnected) return true;
  try {
    const db = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};

export default dbConnect;