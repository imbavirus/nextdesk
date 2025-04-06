/*
  Warnings:

  - You are about to alter the column `status` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT,
    "status" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);
INSERT INTO "new_User" ("email", "id", "isAdmin", "name", "note", "password", "status") SELECT "email", "id", "isAdmin", "name", "note", "password", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
