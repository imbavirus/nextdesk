/*
  Warnings:

  - Added the required column `accessToken` to the `AuthCode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuthCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "systemId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "AuthCode_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AuthCode" ("id", "isActive", "systemId") SELECT "id", "isActive", "systemId" FROM "AuthCode";
DROP TABLE "AuthCode";
ALTER TABLE "new_AuthCode" RENAME TO "AuthCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
