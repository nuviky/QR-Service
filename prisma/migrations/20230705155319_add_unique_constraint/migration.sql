/*
  Warnings:

  - A unique constraint covering the columns `[creds]` on the table `reader` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creds]` on the table `visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "reader_children" ALTER COLUMN "finished_at" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reader_creds_key" ON "reader"("creds");

-- CreateIndex
CREATE UNIQUE INDEX "visitor_creds_key" ON "visitor"("creds");
