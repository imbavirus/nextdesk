-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);
