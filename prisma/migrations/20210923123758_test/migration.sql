/*
  Warnings:

  - You are about to drop the column `dealer` on the `Dealership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dealership" DROP COLUMN "dealer",
ADD COLUMN     "dealerName" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "uid" DROP DEFAULT;
