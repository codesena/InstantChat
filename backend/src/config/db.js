import mongoose from "mongoose";
const ConnectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    return error.message;
  }
};
export { ConnectDB };
