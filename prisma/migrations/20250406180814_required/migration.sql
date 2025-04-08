/*
  Warnings:

  - Made the column `provider` on table `UserToken` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "systemId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "UserToken_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserToken" ("id", "isActive", "provider", "systemId", "token", "userId") SELECT "id", "isActive", "provider", "systemId", "token", "userId" FROM "UserToken";
DROP TABLE "UserToken";
ALTER TABLE "new_UserToken" RENAME TO "UserToken";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
