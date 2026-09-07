-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OtpPurpose" ADD VALUE 'EMAIL_CHANGE';
ALTER TYPE "OtpPurpose" ADD VALUE 'PASSWORD_RESET';

-- DropIndex
DROP INDEX "OtpVerification_userId_idx";

-- AlterTable
ALTER TABLE "OtpVerification" ADD COLUMN     "resendCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "OtpVerification_userId_purpose_idx" ON "OtpVerification"("userId", "purpose");
