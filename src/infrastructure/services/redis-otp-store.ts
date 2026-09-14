import type { RedisClientType } from "redis";

import type { IOtpStore } from "@/application/services/otp-store"

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

    private _resendCountKey(
        userId: string,
        purpose: OtpPurpose,
    ): string {
        return `otp:resends:${purpose}:${userId}`;
    }

    private _cooldownKey(
        userId: string,
        purpose: OtpPurpose,
    ): string {
        return `otp:cooldown:${purpose}:${userId}`;
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
        return this._client.get(
            this._otpKey(userId, purpose),
        );
    }

    async incrementAttempts(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<number> {
        return this._client.incr(
            this._attemptKey(userId, purpose),
        );
    }

    async getAttempts(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<number> {
        const attempts = await this._client.get(
            this._attemptKey(userId, purpose),
        );

        return attempts ? Number(attempts) : 0;
    }

    async delete(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<void> {
        await this._client.del([
            this._otpKey(userId, purpose),
            this._attemptKey(userId, purpose),
        ]);
    }

    async isResendAllowed(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<boolean> {
        const cooldown = await this._client.exists(
            this._cooldownKey(userId, purpose),
        );

        return cooldown === 0;
    }

    async incrementResendCount(
        userId: string,
        purpose: OtpPurpose,
        expiresInSeconds: number,
    ): Promise<number> {
        const key = this._resendCountKey(
            userId,
            purpose,
        );

        const count = await this._client.incr(key);

        if (count === 1) {
            await this._client.expire(
                key,
                expiresInSeconds,
            );
        }

        return count;
    }

    async getResendCount(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<number> {
        const count = await this._client.get(
            this._resendCountKey(userId, purpose),
        );

        return count ? Number(count) : 0;
    }

    async startResendCooldown(
        userId: string,
        purpose: OtpPurpose,
        cooldownSeconds: number,
    ): Promise<void> {
        await this._client.set(
            this._cooldownKey(userId, purpose),
            "1",
            {
                EX: cooldownSeconds,
            },
        );
    }
}