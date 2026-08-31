import { User } from "../entities/user.entity.js";
import { BaseRepository } from "./base.repository.js";

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;

  updateEmailVerification(
    id: string,
    isEmailVerified: boolean,
  ): Promise<void>;
}