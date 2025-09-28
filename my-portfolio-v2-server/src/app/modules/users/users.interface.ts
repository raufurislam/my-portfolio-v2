export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
}

export interface IAuthProvider {
  provider: "google" | "github" | "credentials";
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
  auths?: IAuthProvider[];
  createdAt?: Date;
  updatedAt?: Date;
}
