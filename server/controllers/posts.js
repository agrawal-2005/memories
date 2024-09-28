import express from "express";
import { isValidObjectId } from "mongoose";
import PostMessage from "../models/postMessages.js";

const router = express.Router();

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIdx = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIdx);

    res.status(200).json({ data: posts, currentPages: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    // Correctly pass 'i' as a flag to make the search case-insensitive
    const title = new RegExp(searchQuery, 'i');
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  // console.log("Creating post with data:", req.body);
  // console.log("User ID:", req.userId);
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!isValidObjectId(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).send("No post found to update");
    }

    res.json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const postToDelete = await PostMessage.findById(id);

    if (!postToDelete) {
      return res.status(404).send("Post not found");
    }

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    if (!req.userId)
      return res.status(401).json({ message: "Unauthenticated" });

    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).send("No post found");

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
