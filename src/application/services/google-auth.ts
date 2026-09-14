export interface IGoogleAuthService {
    verifyIdToken(
        idToken: string,
    ): Promise<{
        providerAccountId: string;
        email: string;
        fullName: string;
        emailVerified: boolean;
    }>;
}