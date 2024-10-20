SELECT 
    p.user_id AS 'User No',
    p.post_text AS 'Post Title',
    u.full_name AS 'user_name'
FROM 
    Posts p
JOIN 
    Users u ON p.user_id = u.user_id
ORDER BY 
    p.post_id ASC;