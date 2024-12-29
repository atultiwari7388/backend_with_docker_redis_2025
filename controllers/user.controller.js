import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    //check all fields are entered
    if (!fullName || !email || !password) {
      return res
        .status(403)
        .json({ success: false, msg: "Please enter all fields" });
    }

    //check user is already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(403).json({ success: false, msg: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, data: newUser, msg: "User created" });
  } catch (error) {
    console.log(error);
  }
};
