import type { OtpPurpose } from "@/domain/entities/otp-verification.entity";

export interface IOtpStore {
 save(
  userId: string,
  purpose: OtpPurpose,
  codeHash: string,
  expiresInSeconds: number,
): Promise<void>;

  find(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<string | null>;

  incrementAttempts(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<number>;

  getAttempts(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<number>;

  delete(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<void>;
}