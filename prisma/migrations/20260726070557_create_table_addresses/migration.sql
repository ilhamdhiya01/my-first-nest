/*
  Warnings:

  - You are about to drop the column `username` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_username_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "username",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
