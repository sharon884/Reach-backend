export interface OtpHasher {
  hash(otp: string): Promise<string>;

  compare(otp: string, hash: string): Promise<boolean>;
}