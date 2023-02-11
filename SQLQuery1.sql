SELECT * FROM MLTemplate;
SELECT * FROM MLAnswerTemplate WHERE TemplateId = 15;

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


DELETE FROM CategoryTemplate
WHERE TemplateId = 16
AND CategoryId = 6;