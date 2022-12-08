import { ObjectId } from "mongodb";
import Account from "./Account";

export default interface Review {
  _id?: ObjectId;
  reviewId: string;
  reviewerId: string;
  title: string;
  content: string;
  comments?: string[];
  reviewAccount: Account;
  gameName: string;
}
