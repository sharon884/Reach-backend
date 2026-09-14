import type { UserAuthAccount } from "@/domain/entities/user-auth-account.entity";
import type { IUserAuthAccountRepository } from "@/domain/repositories/user-auth-account.repository";
import type { PrismaClient } from "@/generated/prisma/client";

export class PrismaUserAuthAccountRepository
    implements IUserAuthAccountRepository
{
    constructor(private readonly _prisma: PrismaClient) {}

    async findByProviderAccountId(
        provider: UserAuthAccount["provider"],
        providerAccountId: string,
    ): Promise<UserAuthAccount | null> {
        return this._prisma.userAuthAccount.findUnique({
            where: {
                provider_providerAccountId: {
                    provider,
                    providerAccountId,
                },
            },
        });
    }

    async create(
        userAuthAccount: UserAuthAccount,
    ): Promise<UserAuthAccount> {
        return this._prisma.userAuthAccount.create({
            data: {
                id: userAuthAccount.id,
                userId: userAuthAccount.userId,
                provider: userAuthAccount.provider,
                providerAccountId: userAuthAccount.providerAccountId,
                createdAt: userAuthAccount.createdAt,
                updatedAt: userAuthAccount.updatedAt,
            },
        });
    }
}