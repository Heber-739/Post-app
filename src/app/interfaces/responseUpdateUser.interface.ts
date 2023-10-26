import { User } from "./loginResponse.interface";
import { Header } from "./registerResponse.interface";

export interface ResponseUpdateUser {
  header: Header;
  user:   User;
}

