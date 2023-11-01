
export interface Comment {
    author:       Author;
    idPost:       string;
    comment:      string;
    state:        boolean;
    creationDate: Date;
    id:           string;
    status?:      string;
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
    imageUrl:   string;
    username:   string;
    name:       string;
}
