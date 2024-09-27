import mongoose, { Schema } from "mongoose";

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  selectedFile: {
    type: String,
    required: false,
  },
  likes: {
    type: [String],
    default: [],
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
