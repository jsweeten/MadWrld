USE [MadWrld];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FireBaseUserId, FirstName, LastName, Email) values (1, '9zigiEfx3SVOGGQAtcMTofV0UZE3', 'Foo', 'Bar', 'foo@bar.com');
insert into UserProfile (Id, FireBaseUserId, FirstName, LastName, Email) values (2, 'nuldgqyqy9gmuC5DrLrtirRjk9l2', 'David', 'Grohl', 'foo@fighters.com');
insert into UserProfile (Id, FireBaseUserId, FirstName, LastName, Email) values (3, 'hvW8G4mABFUlA7YjIVqG3JnVJe92', 'Admina', 'Strator', 'admin@example.com');
insert into UserProfile (Id, FireBaseUserId, FirstName, LastName, Email) values (4, 'rb3pvnLBVgXD1d9UPEeeR6zG6lC3', 'Maddie', 'Libbington', 'madlibluvr@madwrld.com');
insert into UserProfile (Id, FireBaseUserId, FirstName, LastName, Email) values (5, '9c1SAQiMbIfRZTt7KcZRXC1VtXq2', 'Mad', 'Lib', 'm@dlib.com');
set identity_insert [UserProfile] off

set identity_insert [MLTemplate] on
insert into [MLTemplate] ([ID], [Title], [UserId]) VALUES
	(1, 'A Day At The Beach', 1),
	(2, 'Grammy Night', 3),
	(3, 'The Big Game', 2),
	(4, 'My Semester Abroad', 5),
	(5, 'The Train Conductor', 4),
	(6, 'Recess', 1),
	(7, 'The Roadtrip', 3),
	(8, 'First Contact', 2),
	(9, 'Moving Day', 5),
	(10, 'A Long, Strange Trip', 5);
set identity_insert [MLTemplate] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Travel'), (2, 'School'), (3, 'Job'), (4, 'Art'), (5, 'News'),
	   (6, 'Fantasy'), (7, 'History'), (8, 'Sports');
set identity_insert [Category] off

set identity_insert [CategoryTemplate] on
insert into [CategoryTemplate] ([Id], [CategoryId], [TemplateId])
values (1, 1, 1), (2, 4, 2), (3, 5, 2), (4, 8, 3), (5, 2, 4), (6, 1, 4), (7, 3, 5), (8, 2, 6), (9, 1, 7), (10, 6, 8), (11, 5, 8), (12, 1, 9), (13, 2, 9), (14, 1, 10), (15, 6, 10);
set identity_insert [CategoryTemplate] off


set identity_insert [MLAnswerTemplate] on
insert into MLAnswerTemplate (Id, TemplateId, Position, PartofSpeech, Content)
values 
/* A Day At The Beach */
(1, 1, 1, 'Plural Noun', 'Summer is finally here and I can’t wait to hit the beach! I grabbed my @pluralnoun and my'),
(2, 1, 2, 'Noun', '@noun and hopped in the Jeep for a what I hoped was a beautiful day.'),
(3, 1, 3, 'Place', 'As I was pulling in to the @place parking lot, I got a call from Chad telling me he was no longer able to make it. Shucks! Despite the disappointing news, I was still determined have a good time. I grabbed my beach bag and headed for the water.'),
(4, 1, 4, 'Adjective', 'The beach was much more @adjective than I remember,'),
(5, 1, 5, 'Number', 'though it has been @number years since I last visited.'),
(6, 1, 6, 'Hobby', 'I laid out my beach blanket, set up my chair and my umbrella, and cracked open to page one of my new book: “An Advanced Guide To @hobby”.'),
(7, 1, 7, 'Article of Clothing', 'After an hour of reading, I decided it was time to take a dip. I put on my flippers and lucky @articleofclothing and waded in'),
(8, 1, 8, 'Adjective', 'to the @adjective, blue ocean water. The water was freezing!'),
(9, 1, 9, 'Sport', '“Oh well,” I thought to myself. “Maybe I’ll find someone on the beach who wants to play @sport with me.”'),
(10, 1, 10, 'Beverage', 'I walked up and down the beach, but couldn’t find anyone who was interested. Defeated, I packed up my beach bag and headed to the boardwalk. I found a bar with great pizza and half off glasses of @beverage. It wasn’t the day I imagined, but I still had a pretty good time.'),

/* Grammy Night */
(11, 2, 1, 'Plural Noun', 'Summer is finally here and I can’t wait to hit the beach! I grabbed my @pluralnoun and my'),
(12, 2, 2, 'Noun', '@noun and hopped in the Jeep for a what I hoped was a beautiful day.'),
(13, 2, 3, 'Place', 'As I was pulling in to the @place parking lot, I got a call from Chad telling me he was no longer able to make it. Shucks! Despite the disappointing news, I was still determined have a good time. I grabbed my beach bag and headed for the water.'),
(14, 2, 4, 'Adjective', 'The beach was much more @adjective than I remember,'),
(15, 2, 5, 'Number', 'though it has been @number years since I last visited.'),
(16, 2, 6, 'Hobby', 'I laid out my beach blanket, set up my chair and my umbrella, and cracked open to page one of my new book: “An Advanced Guide To @hobby”.'),
(17, 2, 7, 'Article of Clothing', 'After an hour of reading, I decided it was time to take a dip. I put on my flippers and lucky @articleofclothing and waded in'),
(18, 2, 8, 'Adjective', 'to the @adjective, blue ocean water. The water was freezing!'),
(19, 2, 9, 'Sport', '“Oh well,” I thought to myself. “Maybe I’ll find someone on the beach who wants to play @sport with me.”'),
(20, 2, 10, 'Beverage', 'I walked up and down the beach, but couldn’t find anyone who was interested. Defeated, I packed up my beach bag and headed to the boardwalk. I found a bar with great pizza and half off glasses of @beverage. It wasn’t the day I imagined, but I still had a pretty good time.'),

/* The Big Game */
(21, 3, 1, 'adj', ''),
(22, 3, 2, '', ''),
(23, 3, 3, '', ''),
(24, 3, 4, '', ''),
(25, 3, 5, '', ''),
(26, 3, 6, '', ''),
(27, 3, 7, '', ''),
(28, 3, 8, '', ''),
(29, 3, 9, '', ''),
(30, 3, 10, '', ''),

/* My Semester Abroad */
(31, 4, 1, 'adj', ''),
(32, 4, 2, '', ''),
(33, 4, 3, '', ''),
(34, 4, 4, '', ''),
(35, 4, 5, '', ''),
(36, 4, 6, '', ''),
(37, 4, 7, '', ''),
(38, 4, 8, '', ''),
(39, 4, 9, '', ''),
(40, 4, 10, '', ''),

/* The Train Conductor */
(41, 5, 1, 'adj', ''),
(42, 5, 2, '', ''),
(43, 5, 3, '', ''),
(44, 5, 4, '', ''),
(45, 5, 5, '', ''),
(46, 5, 6, '', ''),
(47, 5, 7, '', ''),
(48, 5, 8, '', ''),
(49, 5, 9, '', ''),
(50, 5, 10, '', ''),

/* Recess */
(51, 6, 1, 'adj', ''),
(52, 6, 2, '', ''),
(53, 6, 3, '', ''),
(54, 6, 4, '', ''),
(55, 6, 5, '', ''),
(56, 6, 6, '', ''),
(57, 6, 7, '', ''),
(58, 6, 8, '', ''),
(59, 6, 9, '', ''),
(60, 6, 10, '', ''),

/* The Roadtrip */
(61, 7, 1, 'adj', ''),
(62, 7, 2, '', ''),
(63, 7, 3, '', ''),
(64, 7, 4, '', ''),
(65, 7, 5, '', ''),
(66, 7, 6, '', ''),
(67, 7, 7, '', ''),
(68, 7, 8, '', ''),
(69, 7, 9, '', ''),
(70, 7, 10, '', ''),

/* First Contact */
(71, 8, 1, 'adj', ''),
(72, 8, 2, '', ''),
(73, 8, 3, '', ''),
(74, 8, 4, '', ''),
(75, 8, 5, '', ''),
(76, 8, 6, '', ''),
(77, 8, 7, '', ''),
(78, 8, 8, '', ''),
(79, 8, 9, '', ''),
(80, 8, 10, '', ''),

/* Moving Day */
(81, 9, 1, 'adj', ''),
(82, 9, 2, '', ''),
(83, 9, 3, '', ''),
(84, 9, 4, '', ''),
(85, 9, 5, '', ''),
(86, 9, 6, '', ''),
(87, 9, 7, '', ''),
(88, 9, 8, '', ''),
(89, 9, 9, '', ''),
(90, 9, 10, '', ''),

/* A Long, Strange Trip */
(91, 10, 1, 'adj', ''),
(92, 10, 2, '', ''),
(93, 10, 3, '', ''),
(94, 10, 4, '', ''),
(95, 10, 5, '', ''),
(96, 10, 6, '', ''),
(97, 10, 7, '', ''),
(98, 10, 8, '', ''),
(99, 10, 9, '', ''),
(100, 10, 10, '', '')

set identity_insert [MLAnswerTemplate] off

set identity_insert [MadLib] on
insert into [MadLib] ([Id], [UserId], [MLTemplateId],[FinishedStory]) 
values (1, 1, 1, 'Summer is finally here and I can’t wait to hit the beach! I grabbed my loafers and my
cane and hopped in the Jeep for a what I hoped was a beautiful day.
As I was pulling in to the K-Mart parking lot, I got a call from Chad telling me he was no longer able to make it. Shucks! Despite the disappointing news, I was still determined have a good time. I grabbed my beach bag and headed for the water.
The beach was much more glassy than I remember,
though it has been 12 years since I last visited.
I laid out my beach blanket, set up my chair and my umbrella, and cracked open to page one of my new book: “An Advanced Guide To Candlemaking”.
After an hour of reading, I decided it was time to take a dip. I put on my flippers and lucky sock and waded in
to the moist, blue ocean water. The water was freezing!
“Oh well,” I thought to myself. “Maybe I’ll find someone on the beach who wants to play marble racing with me.”
I walked up and down the beach, but couldn’t find anyone who was interested. Defeated, I packed up my beach bag and headed to the boardwalk. I found a bar with great pizza and half off glasses of milk. It wasn’t the day I imagined, but I still had a pretty good time.
');
set identity_insert [MadLib] off