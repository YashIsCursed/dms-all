SELECT 
    p.post_id,
    p.post_text, 
    COUNT(c.comment_id) AS total_comments
FROM 
    Posts p
LEFT JOIN 
    Comments c ON p.post_id = c.post_id
WHERE 
    p.post_id = 1 
GROUP BY 
    p.post_id, p.post_text;