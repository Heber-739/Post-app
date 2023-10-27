import { LngLat } from "mapbox-gl";

export interface FireUser {
  uid:      string;
  name:     string;
  username: string;
  imageUrl: string;
  mail:     string;
  address:  Address;
  phone:    string;
  birthday: Date;
  role:     string[];
  coords:   [number,number];
}

export interface Address {
  street:   string;
  location: string;
  city:     string;
  country:  string;
}