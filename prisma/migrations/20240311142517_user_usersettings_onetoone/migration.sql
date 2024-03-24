/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserSettings` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserSettings] ADD [userId] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[UserSettings] ADD CONSTRAINT [UserSettings_userId_key] UNIQUE NONCLUSTERED ([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[UserSettings] ADD CONSTRAINT [UserSettings_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
