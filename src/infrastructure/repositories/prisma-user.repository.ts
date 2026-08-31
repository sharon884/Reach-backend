import { PrismaClient } from "../../generated/prisma/client.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { User } from "../../domain/entities/user.entity.js";

export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) { }

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
}