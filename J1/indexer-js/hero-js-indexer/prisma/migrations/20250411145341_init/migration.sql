-- CreateTable
CREATE TABLE "HeroEvent" (
    "dbId" TEXT NOT NULL,
    "hero_id" TEXT NOT NULL,
    "hero_name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "HeroEvent_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "TakeFeesEvent" (
    "dbId" TEXT NOT NULL,
    "treasury_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "admin" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "TakeFeesEvent_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "cursor" (
    "id" TEXT NOT NULL,
    "eventSeq" TEXT NOT NULL,
    "txDigest" TEXT NOT NULL,

    CONSTRAINT "cursor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeroEvent_dbId_key" ON "HeroEvent"("dbId");

-- CreateIndex
CREATE UNIQUE INDEX "TakeFeesEvent_dbId_key" ON "TakeFeesEvent"("dbId");
