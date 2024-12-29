import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check all fields are entered
    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, msg: "Please enter all fields" });
    }

    //check user is exists or not
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ success: false, msg: "User not exists" });
    }

    //check password is correct or not
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(403).json({ success: false, msg: "Password is wrong" });
    }

    res.status(200).json({ success: true, data: user, msg: "User logged in" });
  } catch (error) {
    console.log(error);
  }
};
