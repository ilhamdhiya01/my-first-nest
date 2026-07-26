-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100),
    "email" VARCHAR(100),
    "phone" VARCHAR(20),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_username_key" ON "contacts"("username");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
