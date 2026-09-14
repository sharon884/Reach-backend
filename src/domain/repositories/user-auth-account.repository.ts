import type { UserAuthAccount } from "@/domain/entities/user-auth-account.entity";

export interface IUserAuthAccountRepository {
    findByProviderAccountId(
        provider: UserAuthAccount["provider"],
        providerAccountId: string,
    ): Promise<UserAuthAccount | null>;

    create(
        userAuthAccount: UserAuthAccount,
    ): Promise<UserAuthAccount>;
}