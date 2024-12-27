-- name: GetPostTimeline :many
SELECT
    sqlc.embed(posts),
    sqlc.embed(users),
    (
        SELECT
            COUNT(*)
        FROM
            post_favorites
        WHERE
            post_favorites.post_id = posts.id
    ) AS favorites_count,
    EXISTS (
        SELECT
            1
        FROM
            post_favorites
        WHERE
            post_favorites.post_id = posts.id
            AND (
                post_favorites.user_id = @self_id::uuid
            )
    ) AS favorited
FROM
    posts
    INNER JOIN
        users
        ON posts.author_id = users.id
    LEFT JOIN
        user_blocks AS ub1
        ON users.id = ub1.blocked_id AND ub1.blocker_id = @self_id::uuid
    LEFT JOIN
        user_blocks AS ub2
        ON users.id = ub2.blocker_id AND ub2.blocked_id = @self_id::uuid
WHERE
    (
        sqlc.narg(created_at)::timestamptz IS NULL
        OR posts.created_at < sqlc.narg(created_at)::timestamptz
    )
    AND ub1.blocked_id IS NULL
    AND ub2.blocker_id IS NULL
ORDER BY
    posts.created_at DESC
LIMIT
    $1;
