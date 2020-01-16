const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
});

//hashing password
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
//generating auth token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
module.exports = mongoose.model("user", userSchema);
