/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `A` on the `_PeerTags` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `B` on the `_PeerTags` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `System` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Peer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Peer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `ownerId` on the `Peer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `Peer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `PeerTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ownerId` on the `PeerTag` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `peerId` on the `PeerTag` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `tagId` on the `PeerTag` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `UserToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `UserToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "color" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_Tag" ("color", "id", "isActive", "tag", "userId") SELECT "color", "id", "isActive", "tag", "userId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_tag_userId_key" ON "Tag"("tag", "userId");
CREATE TABLE "new__PeerTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PeerTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Peer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PeerTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PeerTags" ("A", "B") SELECT "A", "B" FROM "_PeerTags";
DROP TABLE "_PeerTags";
ALTER TABLE "new__PeerTags" RENAME TO "_PeerTags";
CREATE UNIQUE INDEX "_PeerTags_AB_unique" ON "_PeerTags"("A", "B");
CREATE INDEX "_PeerTags_B_index" ON "_PeerTags"("B");
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
CREATE TABLE "new_System" (
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
INSERT INTO "new_System" ("cpu", "hostname", "id", "lastSeen", "memory", "os", "platform", "userId", "uuid", "version") SELECT "cpu", "hostname", "id", "lastSeen", "memory", "os", "platform", "userId", "uuid", "version" FROM "System";
DROP TABLE "System";
ALTER TABLE "new_System" RENAME TO "System";
CREATE TABLE "new_Peer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "ownerId" INTEGER NOT NULL,
    "systemId" TEXT NOT NULL,
    "alias" TEXT,
    "hash" TEXT,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "Peer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Peer_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Peer" ("alias", "hash", "id", "isActive", "ownerId", "systemId", "userId") SELECT "alias", "hash", "id", "isActive", "ownerId", "systemId", "userId" FROM "Peer";
DROP TABLE "Peer";
ALTER TABLE "new_Peer" RENAME TO "Peer";
CREATE UNIQUE INDEX "Peer_systemId_ownerId_key" ON "Peer"("systemId", "ownerId");
CREATE TABLE "new_PeerTag" (
    "peerId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    PRIMARY KEY ("peerId", "tagId", "ownerId"),
    CONSTRAINT "PeerTag_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "Peer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerTag_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PeerTag" ("isActive", "ownerId", "peerId", "tagId") SELECT "isActive", "ownerId", "peerId", "tagId" FROM "PeerTag";
DROP TABLE "PeerTag";
ALTER TABLE "new_PeerTag" RENAME TO "PeerTag";
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
