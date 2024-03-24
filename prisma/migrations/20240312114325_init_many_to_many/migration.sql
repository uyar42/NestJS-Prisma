BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[GroupPost] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [GroupPost_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserOnGroupPosts] (
    [userId] INT NOT NULL,
    [groupPostId] INT NOT NULL,
    CONSTRAINT [UserOnGroupPosts_pkey] PRIMARY KEY CLUSTERED ([userId],[groupPostId])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserOnGroupPosts] ADD CONSTRAINT [UserOnGroupPosts_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserOnGroupPosts] ADD CONSTRAINT [UserOnGroupPosts_groupPostId_fkey] FOREIGN KEY ([groupPostId]) REFERENCES [dbo].[GroupPost]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
