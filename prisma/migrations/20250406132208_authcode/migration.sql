/*
  Warnings:

  - The primary key for the `AuthCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `AuthCode` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuthCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "systemId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "AuthCode_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AuthCode" ("id", "isActive", "systemId") SELECT "id", "isActive", "systemId" FROM "AuthCode";
DROP TABLE "AuthCode";
ALTER TABLE "new_AuthCode" RENAME TO "AuthCode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
