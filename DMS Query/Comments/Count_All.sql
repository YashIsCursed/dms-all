SELECT 
    p.post_id,
    p.post_text, 
    COUNT(c.comment_id) AS total_comments
FROM 
    Posts p
LEFT JOIN 
    Comments c ON p.post_id = c.post_id
GROUP BY 
    p.post_id, p.post_text
ORDER BY 
    p.post_id;