// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_following_post_timeline.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const getFollowingPostTimeline = `-- name: GetFollowingPostTimeline :many
SELECT
    posts.id, posts.author_id, posts.reply_to_id, posts.repost_id, posts.text, posts.created_at, posts.updated_at,
    users.id, users.custom_id, users.nickname, users.biography, users.avatar_image_url, users.banner_image_url, users.is_private, users.birthdate, users.line_id, users.created_at, users.updated_at,
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
                post_favorites.user_id = $2::uuid
            )
    ) AS favorited
FROM
    posts
    INNER JOIN
        users
        ON posts.author_id = users.id
    LEFT JOIN
        user_follows
        ON users.id = user_follows.followed_id
WHERE
    (
        $3::timestamptz IS NULL
        OR posts.created_at < $3::timestamptz
    )
    AND (
        user_follows.follower_id = $2::uuid
        OR posts.author_id = $2::uuid
    )
ORDER BY
    posts.created_at DESC
LIMIT
    $1
`

type GetFollowingPostTimelineParams struct {
	Limit     int64      `json:"limit"`
	SelfID    uuid.UUID  `json:"self_id"`
	CreatedAt *time.Time `json:"created_at"`
}

type GetFollowingPostTimelineRow struct {
	Post           Post  `json:"post"`
	User           User  `json:"user"`
	FavoritesCount int64 `json:"favorites_count"`
	Favorited      bool  `json:"favorited"`
}

func (q *Queries) GetFollowingPostTimeline(ctx context.Context, arg GetFollowingPostTimelineParams) ([]GetFollowingPostTimelineRow, error) {
	rows, err := q.db.Query(ctx, getFollowingPostTimeline, arg.Limit, arg.SelfID, arg.CreatedAt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetFollowingPostTimelineRow{}
	for rows.Next() {
		var i GetFollowingPostTimelineRow
		if err := rows.Scan(
			&i.Post.ID,
			&i.Post.AuthorID,
			&i.Post.ReplyToID,
			&i.Post.RepostID,
			&i.Post.Text,
			&i.Post.CreatedAt,
			&i.Post.UpdatedAt,
			&i.User.ID,
			&i.User.CustomID,
			&i.User.Nickname,
			&i.User.Biography,
			&i.User.AvatarImageUrl,
			&i.User.BannerImageUrl,
			&i.User.IsPrivate,
			&i.User.Birthdate,
			&i.User.LineID,
			&i.User.CreatedAt,
			&i.User.UpdatedAt,
			&i.FavoritesCount,
			&i.Favorited,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
