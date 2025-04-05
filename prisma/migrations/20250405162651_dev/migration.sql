/*
  Warnings:

  - Added the required column `systemId` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "systemId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    CONSTRAINT "UserToken_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "SystemInformation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserToken" ("id", "token", "userId") SELECT "id", "token", "userId" FROM "UserToken";
DROP TABLE "UserToken";
ALTER TABLE "new_UserToken" RENAME TO "UserToken";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
