SELECT * FROM MadLib;
SELECT * FROM UserProfile;

SELECT * FROM MLAnswerTemplate;

DELETE FROM MadLib WHERE Id = 17;

UPDATE MLAnswerTemplate
       SET Content = 'Summer is finally here and I can’t wait to hit the beach! I grabbed my @input and my '
       WHERE Id = 1;