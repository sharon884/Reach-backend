import bcrypt from "bcrypt";

import type { RefreshTokenHasher } from "../../application/services/refresh-token-hasher.js";

export class BcryptRefreshTokenHasher implements RefreshTokenHasher {

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