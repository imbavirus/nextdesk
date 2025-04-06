/*
  Warnings:

  - A unique constraint covering the columns `[systemId,ownerId]` on the table `Peer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Peer_systemId_ownerId_key" ON "Peer"("systemId", "ownerId");
