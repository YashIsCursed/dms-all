DELETE FROM Likes 
WHERE user_id = 2 AND post_id = 5 
AND EXISTS (SELECT 1 FROM Likes WHERE user_id = 2 AND post_id = 5);