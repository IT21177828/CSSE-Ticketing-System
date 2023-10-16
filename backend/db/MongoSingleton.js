import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

class MongoSingleton {
  constructor() {
    if (!MongoSingleton.instance) {
      this.connect();
      MongoSingleton.instance = this;
    }

    return MongoSingleton.instance;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected!ttttttttt");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected!");
  }
}

const mongoSingleton = new MongoSingleton();
export default mongoSingleton;
