import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: true,
  }
});

const User = mongoose.model('user', userSchema);

export default User;