USE [master]

IF db_id('Presnet') IS NULl
  CREATE DATABASE [Presnet]
GO

USE [Presnet]
GO

DROP TABLE IF EXISTS [user];
DROP TABLE IF EXISTS [event];
DROP TABLE IF EXISTS [friend];
DROP TABLE IF EXISTS [userWishList];
DROP TABLE IF EXISTS [wishList];
DROP TABLE IF EXISTS [gift];
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
  [status] nvarchar(255)
)
GO

CREATE TABLE [userWishList] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [userId] int,
  [wishListId] int
)
GO

CREATE TABLE [wishList] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [wishListName] nvarchar(255),
  [eventId] int,
  [giftId] int
)
GO

CREATE TABLE [gift] (
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

ALTER TABLE [clothingSize] ADD FOREIGN KEY ([id]) REFERENCES [user] ([clothingSizeId])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([favoriteColorId]) REFERENCES [favoriteColor] ([id])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([id]) REFERENCES [friend] ([userId])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([id]) REFERENCES [friend] ([friendId])
GO

ALTER TABLE [wishList] ADD FOREIGN KEY ([id]) REFERENCES [userWishList] ([wishListId])
GO

ALTER TABLE [userWishList] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [gift] ADD FOREIGN KEY ([id]) REFERENCES [wishList] ([giftId])
GO

ALTER TABLE [event] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [event] ADD FOREIGN KEY ([id]) REFERENCES [wishList] ([eventId])
GO

ALTER TABLE [gift] ADD FOREIGN KEY ([id]) REFERENCES [user] ([id])
GO
