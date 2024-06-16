-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Broker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "BrokerLogo" TEXT NOT NULL,
    "brokerCredentials" JSONB NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userConnectedBroker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brokerId" TEXT NOT NULL,

    CONSTRAINT "userConnectedBroker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userBrokerCredential" (
    "id" TEXT NOT NULL,
    "userConnectedBrokerId" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "feedToken" TEXT NOT NULL,
    "otherDetails" JSONB NOT NULL,

    CONSTRAINT "userBrokerCredential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userConnectedBroker_userId_brokerId_key" ON "userConnectedBroker"("userId", "brokerId");

-- CreateIndex
CREATE UNIQUE INDEX "userBrokerCredential_userConnectedBrokerId_key" ON "userBrokerCredential"("userConnectedBrokerId");

-- AddForeignKey
ALTER TABLE "userConnectedBroker" ADD CONSTRAINT "userConnectedBroker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userConnectedBroker" ADD CONSTRAINT "userConnectedBroker_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userBrokerCredential" ADD CONSTRAINT "userBrokerCredential_userConnectedBrokerId_fkey" FOREIGN KEY ("userConnectedBrokerId") REFERENCES "userConnectedBroker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
