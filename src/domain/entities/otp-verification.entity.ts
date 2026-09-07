export type OtpPurpose =
  | "EMAIL_VERIFICATION"
  | "EMAIL_CHANGE"
  | "PASSWORD_RESET";

export interface OtpVerification {
  id: string;

  userId: string;

  codeHash: string;

  purpose: OtpPurpose;

  expiresAt: Date;

  attempts: number;

  resendCount: number;

  verifiedAt: Date | null;

  createdAt: Date;
}