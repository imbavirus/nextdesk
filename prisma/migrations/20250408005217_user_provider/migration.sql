-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guid" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT,
    "status" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'jwt'
);
INSERT INTO "new_User" ("email", "guid", "id", "isAdmin", "name", "note", "password", "status") SELECT "email", "guid", "id", "isAdmin", "name", "note", "password", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
