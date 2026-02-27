-- CreateTable
CREATE TABLE "Correction" (
    "id" TEXT NOT NULL,
    "essayId" TEXT NOT NULL,
    "c1" INTEGER NOT NULL,
    "c2" INTEGER NOT NULL,
    "c3" INTEGER NOT NULL,
    "c4" INTEGER NOT NULL,
    "c5" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Correction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendedTheme" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "focusCompetency" TEXT NOT NULL,

    CONSTRAINT "RecommendedTheme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Correction_essayId_key" ON "Correction"("essayId");

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_essayId_fkey" FOREIGN KEY ("essayId") REFERENCES "Essay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
