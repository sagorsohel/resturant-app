// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

const fs= require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required for upload");
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "restaurant-app",
      resource_type:'auto'
    });
    fs.unlinkSync(filePath); // Delete the file after upload
    return result.url; // Return the URL of the uploaded image
  } catch (error) {
    fs.unlinkSync(filePath); // Delete the file after upload

    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

module.exports = {
  
  uploadToCloudinary,
};
