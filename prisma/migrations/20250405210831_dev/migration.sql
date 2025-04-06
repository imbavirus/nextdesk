/*
  Warnings:

  - Added the required column `isActive` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_Tag" ("color", "id", "tag", "userId") SELECT "color", "id", "tag", "userId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
