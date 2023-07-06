/*
  Warnings:

  - The primary key for the `reader` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profile_id` on the `reader` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `reader` table. All the data in the column will be lost.
  - The primary key for the `readerChildren` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `readerChildren` table. All the data in the column will be lost.
  - The primary key for the `visitor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `visitor` table. All the data in the column will be lost.
  - Added the required column `profile_idprofile_id` to the `reader` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `reader` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `creds` on the `reader` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `uuid` was added to the `readerChildren` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `visitor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `creds` on the `visitor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "reader" DROP CONSTRAINT "reader_pkey",
DROP COLUMN "profile_id",
DROP COLUMN "uid",
ADD COLUMN     "profile_idprofile_id" INTEGER NOT NULL,
ADD COLUMN     "uuid" UUID NOT NULL,
DROP COLUMN "creds",
ADD COLUMN     "creds" UUID NOT NULL,
ADD CONSTRAINT "reader_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "readerChildren" DROP CONSTRAINT "readerChildren_pkey",
DROP COLUMN "uid",
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "parent_library_card" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "readerChildren_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "visitor" DROP CONSTRAINT "visitor_pkey",
DROP COLUMN "uid",
ADD COLUMN     "uuid" UUID NOT NULL,
DROP COLUMN "creds",
ADD COLUMN     "creds" UUID NOT NULL,
ADD CONSTRAINT "visitor_pkey" PRIMARY KEY ("uuid");
