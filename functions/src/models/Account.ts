import { ObjectId } from "mongodb";
import BoardGame from "./BoardGame";

interface Friends {
  name: string;
  picture: string;
  id: string;
}

export default interface Account {
  _id?: ObjectId;
  name: string;
  wishlist: BoardGame[];
  myShelf: BoardGame[];
  myFriends: Friends[];
  uid: string;
  profilePic: string;
}
