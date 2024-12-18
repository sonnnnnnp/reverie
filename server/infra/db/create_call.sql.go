// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: create_call.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createCall = `-- name: CreateCall :one
INSERT INTO
  calls (
    host_id,
    title,
    type,
    joinable_by
  )
VALUES
  (
    $1::uuid,
    $2::text,
    $3::call_type,
    $4::call_joinable_by
  )
RETURNING calls.id
`

type CreateCallParams struct {
	HostID     uuid.UUID      `json:"host_id"`
	Title      string         `json:"title"`
	Type       CallType       `json:"type"`
	JoinableBy CallJoinableBy `json:"joinable_by"`
}

func (q *Queries) CreateCall(ctx context.Context, arg CreateCallParams) (uuid.UUID, error) {
	row := q.db.QueryRow(ctx, createCall,
		arg.HostID,
		arg.Title,
		arg.Type,
		arg.JoinableBy,
	)
	var id uuid.UUID
	err := row.Scan(&id)
	return id, err
}