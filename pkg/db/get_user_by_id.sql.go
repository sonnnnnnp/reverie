// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_user_by_id.sql

package db

import (
	"context"

	uuid "github.com/google/uuid"
)

const getUserByID = `-- name: GetUserByID :one
SELECT id, name, nickname, line_id FROM users
WHERE id = $1
`

func (q *Queries) GetUserByID(ctx context.Context, id uuid.UUID) (User, error) {
	row := q.db.QueryRow(ctx, getUserByID, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Nickname,
		&i.LineID,
	)
	return i, err
}
