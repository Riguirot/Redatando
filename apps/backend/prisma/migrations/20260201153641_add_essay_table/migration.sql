-- CreateTable
CREATE TABLE "Essay" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Essay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Essay_studentId_idx" ON "Essay"("studentId");
