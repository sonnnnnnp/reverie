-- name: GetPostByID :one
SELECT * FROM posts
WHERE id = $1;
