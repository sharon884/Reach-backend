import { PrismaClient } from "@/generated/prisma/client";

import type { IUserSessionRepository } from "@/domain/auth/repositories/user-session.repository";

import type { UserSession } from "@/domain/auth/entities/user-session.entity";




export class PrismaUserSessionRepository implements IUserSessionRepository {

     constructor( 
         private readonly _prisma : PrismaClient,
     ) {}



     async create ( session : UserSession ) : Promise<UserSession> {
            return this._prisma.userSession.create({
                 data : session,
            });
     }


     async findById(id: string): Promise<UserSession | null> {
         return this._prisma.userSession.findUnique({
            where: {
                 id ,
            },
         });
     }



      async updateRefreshToken(
        id: string,
        refreshTokenHash: string,
        expiresAt: Date,
    ): Promise<UserSession> {
        return this._prisma.userSession.update({
            where: {
                id,
            },
            data: {
                refreshTokenHash,
                expiresAt,
                updatedAt: new Date(),
            },
        });
    }

    async revoke(
        id: string,
        revokedAt: Date,
    ): Promise<void> {
        await this._prisma.userSession.update({
            where: {
                id,
            },
            data: {
                revokedAt,
                updatedAt: new Date(),
            },
        });
     }


     async revokeAllByUserId(
    userId: string,
    revokedAt: Date,
): Promise<void> {
    await this._prisma.userSession.updateMany({
        where: {
            userId,
            revokedAt: null,
        },
        data: {
            revokedAt,
        },
    });
}


}