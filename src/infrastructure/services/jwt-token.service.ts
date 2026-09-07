import jwt from "jsonwebtoken";

import type {
    AccessTokenPayload,
    RefreshTokenPayload,
    TokenService,
} from "../../application/services/token-service.js";

import { env } from "../../config/env.js";

export class JwtTokenService implements TokenService {

    generateAccessToken(payload: AccessTokenPayload): string {
        return jwt.sign(
            payload,
            env.JWT_SECRET,
            {
                expiresIn: "15m",
            },
        );
    }

    generateRefreshToken(payload: RefreshTokenPayload): string {
        return jwt.sign(
            payload,
            env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );
    }

    verifyAccessToken(token: string): AccessTokenPayload {
        return jwt.verify(
            token,
            env.JWT_SECRET,
        ) as AccessTokenPayload;
    }

    verifyRefreshToken(token: string): RefreshTokenPayload {
        return jwt.verify(
            token,
            env.JWT_SECRET,
        ) as RefreshTokenPayload;
    }
}