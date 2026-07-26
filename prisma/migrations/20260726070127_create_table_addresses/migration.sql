-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "street" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "province" VARCHAR(100),
    "postalCode" VARCHAR(10) NOT NULL,
    "country" VARCHAR(100) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
