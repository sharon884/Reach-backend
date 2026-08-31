import { OtpPurpose } from "../entities/otp-verification.entity.js";
import { OtpVerification } from "../entities/otp-verification.entity.js";

export interface OtpVerificationRepository {
  create(otp: OtpVerification): Promise<OtpVerification>;

  findActiveByUserAndPurpose(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<OtpVerification | null>;

  invalidateActiveOtp(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<void>;

  incrementAttempts(id: string): Promise<void>;

  markAsVerified(id: string, verifiedAt: Date): Promise<void>;

  delete(id: string): Promise<void>;
}