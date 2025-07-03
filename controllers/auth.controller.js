const { sendErrorResponse } = require("../utlis/responseHelper");

const registerController = async (req, res) => {
  // Logic for user registration

  try {
    const { name, email, password, phone, address, profilePhoto } = req?.body;



    // Check if all required fields are provided
    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");

    if (missingFields.length > 0) {
      return sendErrorResponse(res,400,  "The following fields are required: " + missingFields.join(", "),
    { missingFields });
    }

    // Check if the user already exists
    const existingUser = await User.findOne(email);
    if (existingUser) {
      return sendErrorResponse(res, 400, "User already exists with this email");
    }


    


  } catch (error) {
    console.error("Error during registration:", error);
    return sendErrorResponse(res,500, "Internal server error", )
  }
};

module.exports = {
  registerController,
};
