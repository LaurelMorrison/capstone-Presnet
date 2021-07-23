SET IDENTITY_INSERT [userProfile] ON
INSERT INTO [userProfile]
  ([id], [firebaseUserId], [firstName], [lastName], [email], [address], [createdTime], [age], [shoeSize], [clothingSizeId], [favoriteColorId])
VALUES
  (1, 'RYcwnCD1gfSvTggjZtDPoY111112', 'Admin', 'Admin', 'admin@test.com', '123 Strawberry Street, Nashville, TN 01234', '2020-04-23', '28', '5', '1', '1'),
  (2, 'RYcwnCD1gfSvTggjZtDPoYGdltf2', 'Laurel', 'Morrison', 'laurel@test.com', '123 Strawberry Street, Nashville, TN 01234', '2020-04-23', '28', '5', '2', '1'),
  (3, 'OUPOrhdW4DY0W40XiDnen20JgIH3', 'Kyle', 'King', 'kyle@test.com', '123 Blueberry Street, Nashville, TN 01234', '2020-08-02', '29', '12', '2', '2');
SET IDENTITY_INSERT [userProfile] OFF

SET IDENTITY_INSERT [clothingSize] ON
INSERT INTO [clothingSize]
  ([id], [size])
VALUES 
  (1, 'xs'), 
  (2, 's'),
  (3, 'm'),
  (4, 'l'), 
  (5, 'xl'),
  (6, 'xxl');
SET IDENTITY_INSERT [clothingSize] OFF

SET IDENTITY_INSERT [event] ON
INSERT INTO [event]
  ([id], [eventName], [eventDetails], [date], [userId])
VALUES 
  (1, 'Christmas', 'Merry Christmas', '12/24/2022', 1), 
  (2, 'Easter', 'Happy Easter', '04/17/2022', 1),
  (3, 'New Years Day', 'Happy New Years', '01/01/2022', 1),
  (4, 'Labor Day', 'Happy Labor Day', '09/06/2021', 1), 
  (5, 'Halloween', 'Happy Halloween', '10/31/2021', 1),
  (6, 'Thanksgiving', 'Happy Thanksgiving', '11/25/2021', 1);
SET IDENTITY_INSERT [event] OFF

SET IDENTITY_INSERT [favoriteColor] ON
INSERT INTO [favoriteColor]
  ([id], [color])
VALUES 
  (1, 'red'), 
  (2, 'orange'),
  (3, 'yellow'),
  (4, 'green'), 
  (5, 'blue'),
  (6, 'purple');
SET IDENTITY_INSERT [favoriteColor] OFF

SET IDENTITY_INSERT [friend] ON
INSERT INTO [friend]
  ([id], [userId], [friendId], [statusId])
VALUES 
  (1, 2, 3, 1), 
  (2, 3, 2, 2);
SET IDENTITY_INSERT [friend] OFF

SET IDENTITY_INSERT [friendStatus] ON
INSERT INTO [friendStatus]
  ([id], [status])
VALUES 
  (1, 'accepted'), 
  (2, 'accepted');
SET IDENTITY_INSERT [friendStatus] OFF

SET IDENTITY_INSERT [wishListItem] ON
INSERT INTO [wishListItem]
  ([id], [gift], [giftURL], [userId])
VALUES 
  (1, 'A new puppy', 'https://www.petfinder.com/search/dogs-for-adoption/us/fl/stuart/', 2), 
  (2, 'Green Sweater', 'https://www.nordstrom.com/browse/women/clothing/sweaters?filterByColor=green', 2),
  (3, 'A new kitten', 'https://www.petfinder.com/search/cats-for-adoption/us/fl/stuart/', 3), 
  (4, 'Blue Sweater', 'https://www.nordstrom.com/browse/women/clothing/sweaters?filterByColor=blue', 3);
SET IDENTITY_INSERT [wishListItem] OFF