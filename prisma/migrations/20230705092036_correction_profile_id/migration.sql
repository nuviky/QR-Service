/*
  Warnings:

  - You are about to drop the column `profile_idprofile_id` on the `reader` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `reader` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `visitor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `reader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reader" DROP COLUMN "profile_idprofile_id",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reader_profile_id_key" ON "reader"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "visitor_profile_id_key" ON "visitor"("profile_id");
