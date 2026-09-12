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

  isResendAllowed(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<boolean>;

  incrementResendCount(
    userId: string,
    purpose: OtpPurpose,
    expiresInSeconds: number,
  ): Promise<number>;

  getResendCount(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<number>;

  startResendCooldown(
    userId: string,
    purpose: OtpPurpose,
    cooldownSeconds: number,
  ): Promise<void>;
}