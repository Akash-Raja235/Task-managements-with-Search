

import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " name must be required"],
  },
  email: {
    type: String,
    required: [true, " email must be required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, " password must be required"],
  },
 
});


const User = mongoose.model('User',UserSchema)

export default User