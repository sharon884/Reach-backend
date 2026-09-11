import { PrismaClient } from "@/generated/prisma/client";

import type { IUserSessionRepository } from "@/domain/repositories/user-session.repository";

import type { UserSession } from "@/domain/entities/user-session.entity";




export class PrismaUserSessionRepository implements IUserSessionRepository {

     constructor( 
         private readonly prisma : PrismaClient,
     ) {}



     async create ( session : UserSession ) : Promise<UserSession> {
            return this.prisma.userSession.create({
                 data : session,
            });
     }


     async findById(id: string): Promise<UserSession | null> {
         return this.prisma.userSession.findUnique({
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
        return this.prisma.userSession.update({
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
        await this.prisma.userSession.update({
            where: {
                id,
            },
            data: {
                revokedAt,
                updatedAt: new Date(),
            },
        });
     }


}