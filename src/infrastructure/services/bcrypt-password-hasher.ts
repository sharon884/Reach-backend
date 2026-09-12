import bcrypt from "bcrypt";

import { IPasswordHasher } from "@/application/services/password-hasher";

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async compare(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}