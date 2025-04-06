/*
  Warnings:

  - You are about to drop the `SystemInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `color` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SystemInformation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "System" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpu" TEXT,
    "hostname" TEXT,
    "memory" TEXT,
    "os" TEXT,
    "platform" TEXT,
    "userId" INTEGER,
    "uuid" TEXT,
    "version" TEXT,
    "lastSeen" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "System_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Peer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "systemId" TEXT NOT NULL,
    "alias" TEXT,
    "hash" TEXT,
    CONSTRAINT "Peer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Peer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Peer_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PeerTag" (
    "peerId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    PRIMARY KEY ("peerId", "tagId"),
    CONSTRAINT "PeerTag_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "Peer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PeerTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PeerTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Peer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PeerTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "color" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_Tag" ("color", "id", "isActive", "tag", "userId") SELECT "color", "id", "isActive", "tag", "userId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_UserToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "systemId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "UserToken_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserToken" ("id", "isActive", "systemId", "token", "userId") SELECT "id", "isActive", "systemId", "token", "userId" FROM "UserToken";
DROP TABLE "UserToken";
ALTER TABLE "new_UserToken" RENAME TO "UserToken";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateIndex
CREATE UNIQUE INDEX "_PeerTags_AB_unique" ON "_PeerTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PeerTags_B_index" ON "_PeerTags"("B");
