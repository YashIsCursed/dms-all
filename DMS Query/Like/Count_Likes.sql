SELECT post_id, COUNT(*) AS like_count
FROM Likes
GROUP BY post_id
HAVING post_id = 2;