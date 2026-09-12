import { randomInt } from "node:crypto";

import { IOtpGenerator } from "@/application/services/otp-generator";

export class RandomOtpGenerator implements IOtpGenerator {
  generate(): string {
    return randomInt(100000, 1000000).toString();
  }
}