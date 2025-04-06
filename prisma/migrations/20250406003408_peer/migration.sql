-- RedefineTables
PRAGMA foreign_keys=OFF;
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
