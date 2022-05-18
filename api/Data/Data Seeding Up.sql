USE api_database
DECLARE @UserID as INT
--------------------------
--Create User
--------------------------
IF not exists (select Id from Users where Username='Demo')
insert into Users(Username,Password, PasswordKey,LastUpdatedOn,LastUpdatedBy)
select 'Demo',
0x4D5544D09B8319B423F6D4E054360D5289B57A98781A66B276E00C57919FDCD599BF45623D48CC81F535748F560AF0F70C8C7F3B4C3DB672562B5DD0E5E7C297,
0x44A0BD5BFD689DF399346200A1117C33BEDF5869C17A7CB3DC6D8598A93845DB333B379AA90931D8D4E5F2CC7B1A4A96A7DB71B186DBCDCDC53B0A95440E4EDD7473668627970FBD9BB0BA17530CCAB2D9446A1902BD6AC12FE691FE09DD78A43398B89111056145843060026A414FFA8C5E75B474E187AD753D2872038D9FDD,
getdate(),
0

SET @UserID = (select id from Users where Username='Demo')

--------------------------
-- Property Types
--------------------------
IF not exists (select name from PropertyTypes where Name='House')
insert into PropertyTypes(Name,LastUpdatedOn,LastUpdatedBy)
select 'House', GETDATE(),@UserID

IF not exists (select name from PropertyTypes where Name='Apartment')
insert into PropertyTypes(Name,LastUpdatedOn,LastUpdatedBy)
select 'Apartment', GETDATE(),@UserID
	
IF not exists (select name from PropertyTypes where Name='Unit')
insert into PropertyTypes(Name,LastUpdatedOn,LastUpdatedBy)
select 'Unit', GETDATE(),@UserID


--------------------------
-- Furnishing Types
--------------------------
IF not exists (select name from FurnishingTypes where Name='Fully')
insert into FurnishingTypes(Name, LastUpdatedOn, LastUpdatedBy)
select 'Fully', GETDATE(),@UserID
	
IF not exists (select name from FurnishingTypes where Name='Semi')
insert into FurnishingTypes(Name, LastUpdatedOn, LastUpdatedBy)
select 'Semi', GETDATE(),@UserID
	
IF not exists (select name from FurnishingTypes where Name='Unfurnished')
insert into FurnishingTypes(Name, LastUpdatedOn, LastUpdatedBy)
select 'Unfurnished', GETDATE(),@UserID

--------------------------
-- Cities
--------------------------
IF not exists (select top 1 id from Cities)
Insert into Cities(Name,LastUpdatedBy,LastUpdatedOn,Country)
select 'New York',@UserID,getdate(),'USA'
union
select 'Tokyo',@UserID,getdate(),'Japan'
union
select 'Los Angeles',@UserID,getdate(),'USA'
union
select 'Sydney',@UserID,getdate(),'Australia'
union
select 'Wellington',@UserID,getdate(),'NZ'

--------------------------
-- Properties
--------------------------
-- Sell Property
IF not exists (select top 1 name from Properties where Name='Studio Unit')
insert into Properties(SellRent,Name,PropertyTypeId,Bedrooms,FurnishingTypeId,Price,LandArea,Address,
Address2,CityId,ReadyToMove,Bond,Maintenance,EstPossessionOn,Age,Description,PostedOn,PostedBy,LastUpdatedOn,LastUpdatedBy)
select 
1, -- 1) Sell Rent
'Studio Unit', -- 2) Name
(select Id from PropertyTypes where Name='Unit'), -- 3) Property Type ID
2, -- 4) Bedrooms
(select Id from FurnishingTypes where Name='Fully'), -- 5) Furnishing Type ID
1800, -- 6) Price
1400, -- 7) Land Area
'20 Sesame Street', -- 8) Address
'CBD', -- 9) Address2
(select top 1 Id from Cities), -- 10) City ID
1, -- 11) Ready to Move
100, -- 12) Bond
300, -- 13) Maintenance
'2019-01-01', -- 14) Establishment or Posession on
0, -- 15) Age
'Well Maintained studio unit to rent at prime location. # property features- - 5 mins away from metro station - 24*7 security. # property includes- - Big rooms (good sunlight) - 
Lounge and dining area - Ensuite - Balcony - Open plan -', -- 16) Description
GETDATE(), -- 17) Posted on
@UserID, -- 18) Posted by
GETDATE(), -- 19) Last Updated on
@UserID -- 20) Last Updated by

---------------------------
-- Rent Property
---------------------------
IF not exists (select top 1 name from Properties where Name='Brand new Home')
insert into Properties(SellRent,Name,PropertyTypeId,Bedrooms,FurnishingTypeId,Price,LandArea,Address,
Address2,CityId,ReadyToMove,Bond,Maintenance,EstPossessionOn,Age,Description,PostedOn,PostedBy,LastUpdatedOn,LastUpdatedBy)
select 
2, -- 1) Sell Rent
'Brand new Home', -- 2) Name
(select Id from PropertyTypes where Name='House'), -- 3) Property Type ID
2, -- 4) Bedrooms
(select Id from FurnishingTypes where Name='Unfurnished'), -- 5) Furnishing Type ID
1800, -- 6) Price
1400, -- 7) Land Area
'6 Main Street', -- 8) Address
'Longview', -- 9) Address2
(select top 1 Id from Cities), -- 10) City ID
1, -- 11) Ready to Move
100, -- 12) Bond
300, -- 13) Maintenance
'2019-01-01', -- 14) Establishment or Posession on
0, -- 15) Age
'Recently completed home for rent in a prime location. # property features- - 5 mins away from metro station - 24*7 security. # property includes- - Big rooms (Cross ventilation & proper sunlight) - 
High-end fittings throughout - Underfloor heating - Security System -', -- 16) Description
GETDATE(), -- 17) Posted on
@UserID, -- 18) Posted by
GETDATE(), -- 19) Last Updated on
@UserID -- 20) Last Updated by

