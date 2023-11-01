export interface Post {
  author:           Author;
  title:            string;
  description:      string;
  state:            State;
  creationDate:     Date;
  modificationDate: Date;
  id:               string;
}

export interface Author {
  uid:           string;
  username:      string;
  imageUrl:      string
}

export enum State {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC"
}
