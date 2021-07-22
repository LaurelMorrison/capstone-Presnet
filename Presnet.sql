USE [master]

IF db_id('Presnet') IS NULl
  CREATE DATABASE [Presnet]
GO

USE [Presnet]
GO

DROP TABLE IF EXISTS [user];
DROP TABLE IF EXISTS [event];
DROP TABLE IF EXISTS [friend];
DROP TABLE IF EXISTS [friendStatus];
DROP TABLE IF EXISTS [wishListItem];
DROP TABLE IF EXISTS [clothingSize];
DROP TABLE IF EXISTS [favoriteColor];
GO

CREATE TABLE [user] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [address] nvarchar(255),
  [email] nvarchar(255),
  [firebaseUserId] int,
  [password] nvarchar(255),
  [createdTime] timestamp,
  [age] int,
  [shoeSize] int,
  [clothingSizeId] int,
  [favoriteColorId] int
)
GO

CREATE TABLE [event] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [userId] int,
  [eventName] nvarchar(255),
  [eventDetails] nvarchar(255),
  [date] datetime
)
GO

CREATE TABLE [friend] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [userId] int,
  [friendId] int,
  [statusId] int
)
GO

CREATE TABLE [friendStatus] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [status] nvarchar(255)
)
GO

CREATE TABLE [wishListItem] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [gift] nvarchar(255),
  [giftURL] nvarchar(255),
  [userId] int
)
GO

CREATE TABLE [clothingSize] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [size] nvarchar(255)
)
GO

CREATE TABLE [favoriteColor] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [color] nvarchar(255)
)
GO

ALTER TABLE [friend] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [friend] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [friend] ADD FOREIGN KEY ([statusId]) REFERENCES [friendStatus] ([id])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([clothingSizeId]) REFERENCES [clothingSize] ([id])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([favoriteColorId]) REFERENCES [favoriteColor] ([id])
GO

ALTER TABLE [event] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [wishListItem] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO