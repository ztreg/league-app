// src/users/usersService.ts
import { User } from "./user";

// A post request should not contain an id.
export type UserCreationParams = Pick<User,  "name" | "following">;

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      name: name ?? "Jane Doe",
      status: "Happy",
      following: [],
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      ...userCreationParams,
    };
  }
}