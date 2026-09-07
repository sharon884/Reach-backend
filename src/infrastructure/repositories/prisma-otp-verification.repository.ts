import { PrismaClient } from "../../generated/prisma/client.js";
import {
  OtpPurpose,
  OtpVerification,
} from "../../domain/entities/otp-verification.entity.js";
import { OtpVerificationRepository } from "../../domain/repositories/otp-verification.repository.js";

export class PrismaOtpVerificationRepository
  implements OtpVerificationRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(otp: OtpVerification): Promise<OtpVerification> {
    return this.prisma.otpVerification.create({
      data: {
        id: otp.id,
        userId: otp.userId,
        codeHash: otp.codeHash,
        purpose: otp.purpose,
        expiresAt: otp.expiresAt,
        attempts: otp.attempts,
        resendCount: otp.resendCount,
        verifiedAt: otp.verifiedAt,
        createdAt: otp.createdAt,
      },
    });
  }

  async findActiveByUserAndPurpose(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<OtpVerification | null> {
    return this.prisma.otpVerification.findFirst({
      where: {
        userId,
        purpose,
        verifiedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async invalidateActiveOtp(
    userId: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    await this.prisma.otpVerification.updateMany({
      where: {
        userId,
        purpose,
        verifiedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      data: {
        verifiedAt: new Date(),
      },
    });
  }

  async incrementAttempts(id: string): Promise<void> {
    await this.prisma.otpVerification.update({
      where: { id },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });
  }

  async markAsVerified(id: string, verifiedAt: Date): Promise<void> {
    await this.prisma.otpVerification.update({
      where: { id },
      data: {
        verifiedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.otpVerification.delete({
      where: { id },
    });
  }
}