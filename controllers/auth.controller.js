const User = require("../models/user.model");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHelper");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');





// ----------------------------------------------------------------
//  ------------------register function--------------------------------
// ---------------------------------------------------------------


const registerController = async (req, res) => {
  // Logic for user registration
  const saltRounds = 10;

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
      return sendErrorResponse(
        res,
        400,
        "The following fields are required: " + missingFields.join(", "),
        { missingFields }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 400, "User already exists with this email");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object
    const newUser = {
      name,
      email,
      phone,
      address,
      profilePhoto,
      password: hashedPassword,
    };


    // Save the new user to the database
    const user= await User.create(newUser);
    if (!user) {
      return sendErrorResponse(res, 500, "Failed to create user");
    }
    // Respond with success

    // Exclude the password from the response
    
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profilePhoto: user.profilePhoto,
      role: user.role,
    };


    return sendSuccessResponse(res,201,'User registered successfully', {
        user: userResponse
    })
  

  } catch (error) {
    console.error("Error during registration:", error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
};





// ----------------------------------------------------------------
//  ------------------login function--------------------------------
// ---------------------------------------------------------------



const loginController = async (req, res) => {


  const { email, password } = req.body;

  const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (missingFields.length > 0) {
      return sendErrorResponse(
        res,
        400,
        "The following fields are required: " + missingFields.join(", "),
        { missingFields }
      );
    }

    const existingUser= await User.findOne({email})
    
    if (!existingUser) {
      return sendErrorResponse(res, 400, "User does not exist with this email");
    }

    // Check if the password is correct
    const isPasswordValid =await  bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 400, "Invalid password");
    }
 // Exclude the password from the response
    const userResponse = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        profilePhoto: existingUser.profilePhoto,
        role: existingUser.role,

    }

    // generate a JWT token (if you have JWT setup)
     const token = jwt.sign( {id:existingUser._id} , process.env.JWT_SECRET, { expiresIn: '30d' });

   

    return sendSuccessResponse(res, 200, 'User logged in successfully', {
        user: userResponse,
        token: token
    });

}






module.exports = {
  registerController,
  loginController
};
