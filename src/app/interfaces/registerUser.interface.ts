export interface RegisterUser {
  name:     string;
  username: string;
  imageUrl: string;
  mail:     string;
  password: string;
  address:  Address;
  phone:    string;
  birthday: Date;
}

export interface Address {
  street:   string;
  location: string;
  city:     string;
  country:  string;
  cp:       string;
}
