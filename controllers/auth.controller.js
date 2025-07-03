const registerController = async (req, res) => {
  // Logic for user registration

  try {
    const { name, email, password, phone, address, profilePhoto } = req.body;

    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message:
          "The following fields are required: " + missingFields.join(", "),
        missingFields,
        success: false,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  registerController,
};
