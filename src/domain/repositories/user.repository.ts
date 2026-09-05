import { User } from "../entities/user.entity.js";
import { BaseRepository } from "./base.repository.js";

export interface PaginatedUsers {
    users: User[];
    total: number;
}

export interface UserRepository extends BaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;

    updateEmailVerification(
        id: string,
        isEmailVerified: boolean,
    ): Promise<void>;

    getUsers(
        page: number,
        limit: number,
    ): Promise<PaginatedUsers>;
}