/*
  Warnings:

  - You are about to drop the `TrackingEntities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TrackingEntities";

-- CreateTable
CREATE TABLE "TrackingEntity" (
    "id" TEXT NOT NULL,
    "trackingName" TEXT NOT NULL,
    "fbName" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "TrackingEntity_pkey" PRIMARY KEY ("id")
);
