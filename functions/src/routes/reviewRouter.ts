import express from "express";
import { getClient } from "../db";
import Review from "../models/Review";

const reviewRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// create a review
reviewRouter.post("/", async (req, res) => {
  const newReview: Review = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Review>("reviews").insertOne(newReview);
    res.status(201).json(newReview);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default reviewRouter;
