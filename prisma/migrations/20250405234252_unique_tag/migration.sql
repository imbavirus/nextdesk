/*
  Warnings:

  - A unique constraint covering the columns `[tag,userId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_tag_userId_key" ON "Tag"("tag", "userId");
