;import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Name is a required field"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
      required: [true, "Name is a required field"],
    minlength: 6,
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;