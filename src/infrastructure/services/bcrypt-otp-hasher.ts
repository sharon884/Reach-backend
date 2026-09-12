import bcrypt from "bcrypt";

import { IOtpHasher } from "@/application/services/otp-hasher";

export class BcryptOtpHasher implements IOtpHasher {
  async hash(otp: string): Promise<string> {
    return bcrypt.hash(otp, 10);
  }

  async compare(otp: string, hash: string): Promise<boolean> {
    return bcrypt.compare(otp, hash);
  }
}