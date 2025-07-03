const User = require("../models/user.model");
const { sendErrorResponse,sendSuccessResponse } = require("../utils/responseHelper");

const getUserController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user by the auth middleware
    
    const user= await User.findById(userId).select("-password"); // Exclude password and version field from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return sendSuccessResponse(res, 200, "User fetched successfully", {user})

    
  } catch (error) {
    console.error("Error fetching user:", error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
};

/* ---------------------------- update user data ---------------------------- */

const updateUserController = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, phone, address } = req.body;
    const file = req.file;

    console.log("Received file:", file);
    console.log("Received data:", { name, email, phone, address });

    // Optional: Validate fields here
    if (!name || !email || !phone || !address) {
      return sendErrorResponse(res, 400, "All fields are required", {
        missingFields: ['name', 'email', 'phone', 'address'].filter(field => !req.body[field])
      });
    }

    

    // TODO: Update user logic here (e.g. User.findByIdAndUpdate)

    const updateData = {
      name,
      email,
      phone,
      address,
      profilePhoto: file ? file.path : undefined // Assuming file.path contains the URL of the uploaded image
    };
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Update the user with the provided ID
      updateData, // Update data
      { new: true, runValidators: true } // Return the updated document and run validators
      );
    if (!updatedUser) {
      return sendErrorResponse(res, 404, "User not found");
    }
    // Exclude password and version field from the response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    delete userResponse.__v;
    return sendSuccessResponse(res, 200, "User updated successfully", { user: userResponse });
    

  } catch (error) {
    console.error("Error updating user:", error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
};



module.exports = {
  getUserController,
  updateUserController
};
