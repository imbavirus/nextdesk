/*
  Warnings:

  - You are about to drop the column `last_seen` on the `SystemInformation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SystemInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpu" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "lastSeen" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SystemInformation" ("cpu", "hostname", "id", "memory", "os", "username", "uuid", "version") SELECT "cpu", "hostname", "id", "memory", "os", "username", "uuid", "version" FROM "SystemInformation";
DROP TABLE "SystemInformation";
ALTER TABLE "new_SystemInformation" RENAME TO "SystemInformation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
