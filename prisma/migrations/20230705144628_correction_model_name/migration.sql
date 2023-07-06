/*
  Warnings:

  - You are about to alter the column `profile_id` on the `reader` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `profile_id` on the `visitor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `readerChildren` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "reader" ALTER COLUMN "profile_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "visitor" ALTER COLUMN "profile_id" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "readerChildren";

-- CreateTable
CREATE TABLE "reader_children" (
    "uuid" TEXT NOT NULL,
    "parent_library_card" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reader_children_pkey" PRIMARY KEY ("uuid")
);
