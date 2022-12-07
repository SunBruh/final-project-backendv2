import { ObjectId } from "mongodb";

export default interface Review {
  _id?: ObjectId;
  reviewId: string;
  title: string;
  content: string;
  comments?: string[];
}
