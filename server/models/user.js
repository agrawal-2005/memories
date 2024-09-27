import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true, // Consider making email unique if applicable
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true, // Ensure id remains unique if needed
    default: () => mongoose.Types.ObjectId() // Generate a default ObjectId
  },
});

const User = mongoose.model("User", userSchema);
export default User;