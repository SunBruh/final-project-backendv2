import { ObjectId, ObjectID } from "bson";
import express from "express";
import { getClient } from "../db";
import Review from "../models/Review";

const reviewRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// display reviews
reviewRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Review>("reviews")
      .find({ reviewId: id })
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

reviewRouter.get("/reviewPage/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Review>("reviews")
      .find({ reviewerId: id })
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

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

reviewRouter.put("/", async (req, res) => {
  const updatedReview: Review = req.body;
  const id = updatedReview._id;
  delete updatedReview._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Review>("reviews")
      .replaceOne({ _id: id }, updatedReview);
    if (result.matchedCount) {
      updatedReview._id = new ObjectId(id);
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default reviewRouter;
