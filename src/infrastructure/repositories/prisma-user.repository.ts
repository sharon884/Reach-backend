import { PrismaClient } from "@/generated/prisma/client";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { User, UserStatus } from "@/domain/entities/user.entity";

import type {
    PaginatedUsers,
    GetUsersQuery,
} from "@/domain/repositories/user.repository";

import type { Prisma } from "@/generated/prisma/client";



export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(user: User): Promise<User> {
        return this.prisma.user.create({
            data: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                passwordHash: user.passwordHash,
                role: user.role,
                status: user.status,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async updateEmailVerification(
        id: string,
        isEmailVerified: boolean,
    ): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: {
                isEmailVerified,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }

async getUsers(
    query: GetUsersQuery,
): Promise<PaginatedUsers> {

    const {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput | undefined = search
        ? {
              OR: [
                  {
                      fullName: {
                          contains: search,
                          mode: "insensitive",
                      },
                  },
                  {
                      email: {
                          contains: search,
                          mode: "insensitive",
                      },
                  },
              ],
          }
        : undefined;

    const orderBy = {
        [sortBy]: sortOrder,
    };

    const [users, total] = await Promise.all([
        this.prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy,
        }),

        this.prisma.user.count({
            where,
        }),
    ]);

    return {
        users,
        total,
    };
}




async updateStatus(
    userId: string,
    status: UserStatus,
): Promise<User> {
    return this.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status,
        },
    });
}



}





