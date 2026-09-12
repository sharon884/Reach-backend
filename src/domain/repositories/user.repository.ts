import { User, UserStatus } from "../entities/user.entity.js";
import { BaseRepository } from "./base.repository.js";

export interface PaginatedUsers {
    users: User[];
    total: number;
}

export interface GetUsersQuery {
    page: number;
    limit: number;
    search?: string;
    sortBy: "fullName" | "email" | "role" | "status" | "createdAt";
    sortOrder: "asc" | "desc";
}

export interface IUserRepository extends BaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;

    updateEmailVerification(
        id: string,
        isEmailVerified: boolean,
    ): Promise<void>;

    getUsers(
        query: GetUsersQuery,
    ): Promise<PaginatedUsers>;


    updateStatus(
    userId: string,
    status: UserStatus,
): Promise<User>;


}


