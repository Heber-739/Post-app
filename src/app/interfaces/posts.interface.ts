export interface Post {
  author:           Author;
  title:            string;
  description:      string;
  state:            boolean;
  creationDate:     Date;
  modificationDate: Date;
  id:               string;
}

export interface Author {
  name:   string;
  userId: string;
  role:   string;

}
