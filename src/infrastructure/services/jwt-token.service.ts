import jwt from "jsonwebtoken";

import type {
    AccessTokenPayload,
    RefreshTokenPayload,
    ITokenService,
} from "@/application/services/token-service";

import { env } from "@/config/env";

export class JwtTokenService implements ITokenService {

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