export interface RegisterResponse {
  header: Header;
  data:   Data;
}

export interface Data {
  user: RegisterResUser;
}

export interface RegisterResUser {
  id:       string;
  role:     string;
  name:     string;
  mail:     string;
  address:  Address;
  birthday: Date;
  phone:    string;
  date:     Date;
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
