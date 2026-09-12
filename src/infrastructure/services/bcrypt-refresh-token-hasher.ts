import bcrypt from "bcrypt";

import type { IRefreshTokenHasher } from "@/application/services/refresh-token-hasher";

export class BcryptRefreshTokenHasher implements IRefreshTokenHasher {

    async hash(token: string): Promise<string> {
        return bcrypt.hash(token, 10);
    }

    async compare(
        token: string,
        hash: string,
    ): Promise<boolean> {
        return bcrypt.compare(token, hash);
    }
}