SELECT * FROM MLTemplate;
SELECT * FROM MLAnswerTemplate WHERE TemplateId = 2;

SELECT t.[Id] 'TemplatePK', t.[Title], t.UserId,
                        at.[Id] 'AnswerTemplatePK', at.TemplateId, at.Position, at.PartOfSpeech, at.Content,
                        up.[Id] 'UserPK', up.FirstName, up.LastName, up.Email
                        FROM MLTemplate t
                        LEFT JOIN UserProfile up ON t.UserId = up.[Id]
                        LEFT JOIN MLAnswerTemplate at ON t.[Id] = at.TemplateId
                        WHERE t.[Id] = 15;

SELECT * FROM MadLib WHERE MLTemplateId = 15; 

SELECT ct.[Id] 'CategoryTemplatePK', ct.TemplateId, ct.CategoryId,
                                        c.[Id] 'CategoryPK', c.[Name]
                                        FROM CategoryTemplate ct
                                        LEFT JOIN Category c ON ct.CategoryId = c.[Id]
                                        WHERE ct.TemplateId = 1;

SELECT * FROM CategoryTemplate;
SELECT * FROM Category WHERE Id = 5;

SELECT * FROM UserProfile;
DELETE FROM MLTemplate WHERE Id = 14;

SELECT * FROM UserType;

UPDATE UserProfile
SET UserTypeId = 2
WHERE Id = 4;

DELETE FROM CategoryTemplate
WHERE TemplateId = 16
AND CategoryId = 6;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Imperative Verb'
WHERE Id = 11;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Celebrity'
WHERE Id = 12;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Place'
WHERE Id = 13;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Noun'
WHERE Id = 14;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Noun'
WHERE Id = 15;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Animal'
WHERE Id = 16;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Animal'
WHERE Id = 17;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Fruit'
WHERE Id = 18;

UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Past Tense Verb'
WHERE Id = 19;


UPDATE MLAnswerTemplate
SET [PartOfSpeech] = 'Adjective'
WHERE Id = 20;