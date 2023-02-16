SELECT * FROM UserProfile;
SELECT * FROM UserType;

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Author');
set identity_insert [UserType] off

UPDATE UserProfile
	SET UserTypeId = 2
	WHERE Id = 5;

	 SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.Email, up.UserTypeId,
                         ut.[Name],
                        t.[Id] 'TemplatePK', t.Title,
                        ml.[Id] 'MadLibPK', ml.MLTemplateId
                        FROM UserProfile up
                        JOIN UserType ut ON up.UserTypeId = ut.[Id]
                        JOIN MLTemplate t ON t.UserId = up.[Id]
                        JOIN MadLib ml ON ml.UserId = up.[Id]
                        WHERE up.Id = 3;

                            SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.Email, up.UserTypeId, ut.[Id], ut.[Name]
                        FROM UserProfile up
                        LEFT JOIN UserType ut ON up.UserTypeId = ut.[Id]
                        WHERE up.Id = 1;