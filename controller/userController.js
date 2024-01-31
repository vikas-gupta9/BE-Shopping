import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    if (!username || !email || !password) {
      res.status(400).json({ msg: "All fields are mandatory" });
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400).json({ msg: "User already registered" });
    }
    //hash password
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    if (newUser) {
      res.status(201).json({
        user_id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
    } else res.status(400).json({ msg: "User data is not valid" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
  // process.exit(0)
};

//Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "All fields are mandatory." });
    }
    const user = await User.findOne({ email });
    //compare hash password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            user_id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ accessToken: accessToken, user_id: user.id });
    } else res.status(401).json({ msg: "Email or Password is InValid." });
    // res.status(200).json({ msg: "login" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//logout user
export const logout = async (req, res) => {
 try {
  res.status(200).json({msg:"Logout successful"});
 } catch (error) {
  res.status(500).json({ error: error });
 }
}

//GET current user
export const current = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
