export type AuthProvider = "GOOGLE";

export interface UserAuthAccount {
    id: string;
    userId: string;
    provider: AuthProvider;
    providerAccountId: string;
    createdAt: Date;
    updatedAt: Date;
}