-- CreateTable
CREATE TABLE "SystemInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpu" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "version" TEXT NOT NULL
);
