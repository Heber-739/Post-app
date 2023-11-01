export interface Comment {
    author:       Author;
    comment:      string;
    creationDate: Date;
    id:           string;
    idPost:       string;
    likes:        Author[];
    state:        boolean;
}

export interface Author {
    imageUrl:   string;
    username:   string;
    name:       string;
    uid:        string;
}
