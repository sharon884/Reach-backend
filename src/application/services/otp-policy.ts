import type { OtpPurpose } from "@/domain/entities/otp-verification.entity";

export interface OtpPolicy {
  expiresInSeconds: number;
  maxAttempts: number;
  resendCooldownSeconds: number;
  maxResends: number;
}

export const OTP_POLICIES: Record<OtpPurpose, OtpPolicy> = {
  EMAIL_VERIFICATION: {
    expiresInSeconds: 5 * 60,
    maxAttempts: 5,
    resendCooldownSeconds: 60,
    
    maxResends: 5,
  },

  PASSWORD_RESET: {
    expiresInSeconds: 5 * 60,
    maxAttempts: 5,
    resendCooldownSeconds: 60,
    maxResends: 3,
  },

  EMAIL_CHANGE: {
    expiresInSeconds: 5 * 60,
    maxAttempts: 5,
    resendCooldownSeconds: 60,
    maxResends: 3,
  },
};