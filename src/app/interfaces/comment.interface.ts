export interface ResponseCommentsByID {
    header: Header;
    data:   Data;
}
export interface ResponseCreateComment {
  header: Header;
  data:   NewCommnet;
}

export interface Data {
    info:     Info;
    comments: Comment[];
}

export interface Comment {
    author:       Author;
    idPost:       string;
    comment:      string;
    state:        boolean;
    creationDate: Date;
    id:           string;
    status?:      string;
}
export interface DeleteComment{
  id:          string;
}

export interface CreateComment {
  idPost:        string;
  comment:       string;
}
export interface UpdateComponent{
  id:             string;
  comment:        string;
}
export interface NewCommnet {
    idPost:       string;
    comment:      string;
    author:       Author;
    state:        boolean;
    creationDate: Date;
    id:           string;
}

export interface Author {
    name:   string;
    userId: string;
    role:   string;
}

export interface Info {
    totalDocs:     number;
    limit:         number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    nextPage:      null;
}

export interface Header {
    resultCode: number;
}
