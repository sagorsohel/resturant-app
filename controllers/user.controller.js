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

module.exports = {
  getUserController,
};
