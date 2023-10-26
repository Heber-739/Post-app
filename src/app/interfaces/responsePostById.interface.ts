import { Post } from "./responsePostList.interface";

export interface ResponsePostByID {
  header: Header;
  data:   Data;
}

export interface Data {
  post: Post;
}



export interface Author {
  name:   string;
  userId: string;
  role:   string;
}

export interface Header {
  resultCode: number;
}
