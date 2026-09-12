import type { RedisClientType } from "redis";

import type { IOtpStore } from "@/application/services/otp-store";

import type { OtpPurpose } from "@/domain/entities/otp-verification.entity";

export class RedisOtpStore implements IOtpStore {
  constructor(
    private readonly _client: RedisClientType,
  ) {}

  private _otpKey(
    userId: string,
    purpose: OtpPurpose,
  ): string {
    return `otp:${purpose}:${userId}`;
  }

  private _attemptKey(
    userId: string,
    purpose: OtpPurpose,
  ): string {
    return `otp:attempts:${purpose}:${userId}`;
  }

  async save(
    userId: string,
    purpose: OtpPurpose,
    codeHash: string,
    expiresInSeconds: number,
  ): Promise<void> {
    const otpKey = this._otpKey(userId, purpose);
    const attemptKey = this._attemptKey(userId, purpose);

    await this._client.set(
      otpKey,
      codeHash,
      {
        EX: expiresInSeconds,
      },
    );

    await this._client.set(
      attemptKey,
      "0",
      {
        EX: expiresInSeconds,
      },
    );
  }

  async find(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<string | null> {
    const key = this._otpKey(userId, purpose);

    return this._client.get(key);
  }

  async incrementAttempts(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<number> {
    const key = this._attemptKey(userId, purpose);

    return this._client.incr(key);
  }

  async getAttempts(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<number> {
    const key = this._attemptKey(userId, purpose);

    const attempts = await this._client.get(key);

    return attempts ? Number(attempts) : 0;
  }

  async delete(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    const otpKey = this._otpKey(userId, purpose);
    const attemptKey = this._attemptKey(userId, purpose);

    await this._client.del([
      otpKey,
      attemptKey,
    ]);
  }
}