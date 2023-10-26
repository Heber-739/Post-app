export interface ResponsePostList {
  header: Header;
  data:   Data;
}

export interface Data {
  info:  Info;
  posts: Post[];
}

export interface Info {
  totalDocs:     number;
  limit:         number;
  totalPages:    number;
  page:          number;
  pagingCounter: number;
  nextPage:      null;
}

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

export interface Header {
  resultCode: number;
}
