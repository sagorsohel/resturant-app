const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(
      "Database connected successfully".bgGreen.white.bold
    );
  } catch (error) {
    console.error(
      `Error connecting to the database: ${error.message}`.bgRed.white.bold
    );
    process.exit(1); // Exit the process with failure
  }
};
module.exports= ConnectDb;