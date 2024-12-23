// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_user_by_line_id.sql

package db

import (
	"context"
)

const getUserByLineID = `-- name: GetUserByLineID :one
SELECT
    id, custom_id, nickname, biography, avatar_image_url, banner_image_url, is_private, birthdate, line_id, created_at, updated_at
FROM
    users
WHERE
    line_id = $1::text
`

func (q *Queries) GetUserByLineID(ctx context.Context, lineID string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByLineID, lineID)
	var i User
	err := row.Scan(
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
	)
	return i, err
}
