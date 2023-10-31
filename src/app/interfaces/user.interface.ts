export interface FireUser {
  uid:      string;
  name:     string;
  username: string;
  imageUrl: string;
  mail:     string;
  address:  Address;
  phone:    string;
  birthday: Date;
  role:     Role[];
  coords:   [number,number];
}

export interface Address {
  street:   string;
  location: string;
  city:     string;
  country:  string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
