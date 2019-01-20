import {Injectable} from "@angular/core";
import {User} from "../models/user";

@Injectable()
export class UserService {

  user: User;
  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser() : User {
    return this.user;
  }

}
