-- CreateTable
CREATE TABLE "AuthCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "systemId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "AuthCode_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
