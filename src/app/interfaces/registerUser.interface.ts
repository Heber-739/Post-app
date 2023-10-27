import { LngLat } from "mapbox-gl";

export interface RegisterUser {
  name:     string;
  username: string;
  imageUrl: string;
  mail:     string;
  password: string;
  address:  Address;
  phone:    string;
  birthday: Date;
  coords:   [number,number];
}

export interface Address {
  street:   string;
  location: string;
  city:     string;
  country:  string;
  cp:       string;
}
