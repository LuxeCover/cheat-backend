-- AlterTable
ALTER TABLE "Earnings" ADD COLUMN     "isWithdrawn" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SteamAccount" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "Key" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeemedKey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "keyId" INTEGER NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedeemedKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_key_key" ON "Key"("key");

-- AddForeignKey
ALTER TABLE "SteamAccount" ADD CONSTRAINT "SteamAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeemedKey" ADD CONSTRAINT "RedeemedKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeemedKey" ADD CONSTRAINT "RedeemedKey_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "Key"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
