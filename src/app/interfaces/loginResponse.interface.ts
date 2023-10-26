export interface LoginResponse {
  header: Header;
  data:   Data;
}

export interface Data {
  user:  User;
  token: string;
}

export interface User {
  id:       string;
  role:     string;
  name:     string;
  mail:     string;
  address:  Address;
  birthday: Date;
  phone:    string;
}

export interface Address {
  street:   string;
  location: string;
  city:     string;
  country:  string;
  cp:       string;
}

export interface Header {
  message:    string;
  resultCode: number;
}
