import bcrypt from "bcrypt";
import { OtpHasher } from "../../application/services/otp-hasher.js";

export class BcryptOtpHasher implements OtpHasher {
  async hash(otp: string): Promise<string> {
    return bcrypt.hash(otp, 10);
  }

  async compare(otp: string, hash: string): Promise<boolean> {
    return bcrypt.compare(otp, hash);
  }
}