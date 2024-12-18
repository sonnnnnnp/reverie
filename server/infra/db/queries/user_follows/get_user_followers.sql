-- name: GetUserFollowers :many
SELECT
    users.*,
    user_follows.created_at AS followed_at
FROM
    users
    INNER JOIN
        user_follows
        ON users.id = user_follows.follower_id
WHERE
    user_follows.followed_id = @user_id::uuid
ORDER BY
    user_follows.created_at DESC;