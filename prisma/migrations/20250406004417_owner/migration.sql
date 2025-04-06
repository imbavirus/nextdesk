/*
  Warnings:

  - The primary key for the `PeerTag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
