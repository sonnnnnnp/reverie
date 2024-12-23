// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_user_followers.sql

package db

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const getUserFollowers = `-- name: GetUserFollowers :many
SELECT
    users.id, users.custom_id, users.nickname, users.biography, users.avatar_image_url, users.banner_image_url, users.is_private, users.birthdate, users.line_id, users.created_at, users.updated_at,
    user_follows.created_at AS followed_at
FROM
    users
    INNER JOIN
        user_follows
        ON users.id = user_follows.follower_id
WHERE
    user_follows.followed_id = $1::uuid
ORDER BY
    user_follows.created_at DESC
`

type GetUserFollowersRow struct {
	ID             uuid.UUID          `json:"id"`
	CustomID       string             `json:"custom_id"`
	Nickname       string             `json:"nickname"`
	Biography      *string            `json:"biography"`
	AvatarImageUrl *string            `json:"avatar_image_url"`
	BannerImageUrl *string            `json:"banner_image_url"`
	IsPrivate      *bool              `json:"is_private"`
	Birthdate      pgtype.Timestamptz `json:"birthdate"`
	LineID         *string            `json:"line_id"`
	CreatedAt      pgtype.Timestamptz `json:"created_at"`
	UpdatedAt      pgtype.Timestamptz `json:"updated_at"`
	FollowedAt     pgtype.Timestamptz `json:"followed_at"`
}

func (q *Queries) GetUserFollowers(ctx context.Context, userID uuid.UUID) ([]GetUserFollowersRow, error) {
	rows, err := q.db.Query(ctx, getUserFollowers, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetUserFollowersRow{}
	for rows.Next() {
		var i GetUserFollowersRow
		if err := rows.Scan(
			&i.ID,
			&i.CustomID,
			&i.Nickname,
			&i.Biography,
			&i.AvatarImageUrl,
			&i.BannerImageUrl,
			&i.IsPrivate,
			&i.Birthdate,
			&i.LineID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.FollowedAt,
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
