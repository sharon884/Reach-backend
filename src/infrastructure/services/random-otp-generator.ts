import { randomInt } from "node:crypto";
import { OtpGenerator } from "../../application/services/otp-generator.js";

export class RandomOtpGenerator implements OtpGenerator {
  generate(): string {
    return randomInt(100000, 1000000).toString();
  }
}