import { ObjectId } from "mongodb";
import BoardGame from "./BoardGame";

export default interface Account {
  _id?: ObjectId;
  name: string;
  wishlist: BoardGame[];
  myShelf: BoardGame[];
  myFriends: string[];
  uid: string;
}
