import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true } // This option creates a createdAt and updatedAt
  //  field on the user document so that we can see when the document
  // was created or updated.
);

const User = mongoose.model("User", userSchema);

export default User;
// This file is a Mongoose model that represents a user in the MongoDB database.
