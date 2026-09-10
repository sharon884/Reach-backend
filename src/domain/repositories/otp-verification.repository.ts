import { OtpPurpose } from "@/domain/entities/otp-verification.entity";

import { OtpVerification } from "@/domain/entities/otp-verification.entity";

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