
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.pre("remove", async function (next) {
  console.log(`Post removed for the user ${this.username}`);
  await this.model("Post").deleteMany({ username: this.username });
  next()
});


module.exports = mongoose.model("User", UserSchema);