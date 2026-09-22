-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "PropertyDataType" AS ENUM ('TEXT', 'LONG_TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT', 'MULTI_SELECT');

-- CreateEnum
CREATE TYPE "CoreFieldKey" AS ENUM ('TITLE', 'DESCRIPTION', 'IMAGES', 'LOCATION', 'QUANTITY', 'EXPIRY');

-- CreateEnum
CREATE TYPE "PropertyDefinitionStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,
    "status" "CategoryStatus" NOT NULL DEFAULT 'ACTIVE',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "dataType" "PropertyDataType" NOT NULL,
    "validationConfig" JSONB,
    "status" "PropertyDefinitionStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyOption" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryProperty" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "filterable" BOOLEAN NOT NULL DEFAULT false,
    "sortable" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryField" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "fieldKey" "CoreFieldKey" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Category_status_idx" ON "Category"("status");

-- CreateIndex
CREATE INDEX "Category_parentId_displayOrder_idx" ON "Category"("parentId", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyDefinition_slug_key" ON "PropertyDefinition"("slug");

-- CreateIndex
CREATE INDEX "PropertyDefinition_status_idx" ON "PropertyDefinition"("status");

-- CreateIndex
CREATE INDEX "PropertyDefinition_dataType_idx" ON "PropertyDefinition"("dataType");

-- CreateIndex
CREATE INDEX "PropertyOption_propertyId_idx" ON "PropertyOption"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyOption_propertyId_displayOrder_idx" ON "PropertyOption"("propertyId", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyOption_propertyId_value_key" ON "PropertyOption"("propertyId", "value");

-- CreateIndex
CREATE INDEX "CategoryProperty_categoryId_displayOrder_idx" ON "CategoryProperty"("categoryId", "displayOrder");

-- CreateIndex
CREATE INDEX "CategoryProperty_propertyId_idx" ON "CategoryProperty"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryProperty_categoryId_propertyId_key" ON "CategoryProperty"("categoryId", "propertyId");

-- CreateIndex
CREATE INDEX "CategoryField_categoryId_displayOrder_idx" ON "CategoryField"("categoryId", "displayOrder");

-- CreateIndex
CREATE INDEX "CategoryField_fieldKey_idx" ON "CategoryField"("fieldKey");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryField_categoryId_fieldKey_key" ON "CategoryField"("categoryId", "fieldKey");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyOption" ADD CONSTRAINT "PropertyOption_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProperty" ADD CONSTRAINT "CategoryProperty_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProperty" ADD CONSTRAINT "CategoryProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryField" ADD CONSTRAINT "CategoryField_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
