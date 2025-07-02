const registerController=(req,res)=>{
    // Logic for user registration
    res.status(201).json({message: "User registered successfully"});
}

module.exports={
    registerController
}