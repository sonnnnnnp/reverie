// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_post_favorites.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const getPostFavorites = `-- name: GetPostFavorites :many
SELECT
    users.id, users.name, users.nickname, users.biography, users.avatar_image_url, users.banner_image_url, users.birthdate, users.line_id, users.created_at, users.updated_at,
    post_favorites.user_id, post_favorites.post_id, post_favorites.created_at
FROM users
INNER JOIN post_favorites ON users.id = post_favorites.user_id
WHERE post_favorites.post_id = $1::uuid
ORDER BY post_favorites.created_at DESC
`

type GetPostFavoritesRow struct {
	User         User
	PostFavorite PostFavorite
}

func (q *Queries) GetPostFavorites(ctx context.Context, postID uuid.UUID) ([]GetPostFavoritesRow, error) {
	rows, err := q.db.Query(ctx, getPostFavorites, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetPostFavoritesRow{}
	for rows.Next() {
		var i GetPostFavoritesRow
		if err := rows.Scan(
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
			&i.PostFavorite.UserID,
			&i.PostFavorite.PostID,
			&i.PostFavorite.CreatedAt,
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
