// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_post.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const getPostByID = `-- name: GetPostByID :one
SELECT
    posts.id, posts.author_id, posts.text, posts.created_at, posts.updated_at,
    users.id, users.name, users.nickname, users.biography, users.avatar_image_url, users.banner_image_url, users.birthdate, users.line_id, users.created_at, users.updated_at,
    (
        SELECT COUNT(*)
        FROM post_favorites
        WHERE post_favorites.post_id = posts.id
    ) AS favorites_count,
    EXISTS (
        SELECT 1
        FROM post_favorites
        WHERE post_favorites.post_id = posts.id AND (
            post_favorites.user_id = $1::uuid
        )
    ) AS favorited
FROM posts
INNER JOIN users ON posts.author_id = users.id
WHERE
    posts.id = $2::uuid
`

type GetPostByIDParams struct {
	SelfID *uuid.UUID
	PostID uuid.UUID
}

type GetPostByIDRow struct {
	Post           Post
	User           User
	FavoritesCount int64
	Favorited      bool
}

func (q *Queries) GetPostByID(ctx context.Context, arg GetPostByIDParams) (GetPostByIDRow, error) {
	row := q.db.QueryRow(ctx, getPostByID, arg.SelfID, arg.PostID)
	var i GetPostByIDRow
	err := row.Scan(
		&i.Post.ID,
		&i.Post.AuthorID,
		&i.Post.Text,
		&i.Post.CreatedAt,
		&i.Post.UpdatedAt,
		&i.User.ID,
		&i.User.Name,
		&i.User.Nickname,
		&i.User.Biography,
		&i.User.AvatarImageUrl,
		&i.User.BannerImageUrl,
		&i.User.Birthdate,
		&i.User.LineID,
		&i.User.CreatedAt,
		&i.User.UpdatedAt,
		&i.FavoritesCount,
		&i.Favorited,
	)
	return i, err
}
