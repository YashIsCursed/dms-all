SELECT 
    p.post_text AS post_content,
    u.full_name AS commenter_name,
    c.comment_text AS comment_content,
    c.comment_date
FROM 
    Posts p
JOIN 
    Comments c ON p.post_id = c.post_id
JOIN 
    Users u ON c.user_id = u.user_id  
ORDER BY 
    p.post_id, c.comment_date; 