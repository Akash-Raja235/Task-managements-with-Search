
import User from "../models/UserModel.js"

import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken'


const signup = async (req, res,) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json("all field are required");
  }

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(400)
        .json({ msg: "user is already exist try to login !" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)
    const user = await User.create({
      name,
      email,
      password: hashPass

    });
    return res.status(201).json({
      msg: " user has successfully signed Up",
      user,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const signin = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All field are required" });
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "this user not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credential" });
    }
    const token = JWT.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    return res.status(200).json({ message: "user successfully logged In", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // const { email, password } = req.body;
  // console.log(password
  // )

  // if (!email || !password) {
  //   return res.json({ message: "plese provide email and pass" });
  // }

  // try {

  //   const user = await User.findOne({ email });

  //   if (!user) {
  //     return res.status(400).json({ message: "user not found" });
  //   }

  //   const isPassword = await bcrypt.compare(password, user.password);

  //   if (!isPassword) {
  //     return res.status(400).json({ message: "password not match" });
  //   }

  //   const token = JWT.sign({ userId: user_id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '30d' })

  //   return res.status(200).json({
  //     message: "success",
  //     user,
  //     token
  //   });


  // } catch (error) {
  //   return res.status(500).json({ msg: error.message });

  // }
};










export { signup, signin };