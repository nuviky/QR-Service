-- CreateTable
CREATE TABLE "visitor" (
    "uid" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "creds" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitor_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "reader" (
    "uid" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "creds" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reader_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "readerChildren" (
    "uid" SERIAL NOT NULL,
    "parent_library_card" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "readerChildren_pkey" PRIMARY KEY ("uid")
);
