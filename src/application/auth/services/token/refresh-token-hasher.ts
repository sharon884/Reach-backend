export interface IRefreshTokenHasher {
    hash(token: string): Promise<string>;

    compare(token: string, hash: string): Promise<boolean>;
}