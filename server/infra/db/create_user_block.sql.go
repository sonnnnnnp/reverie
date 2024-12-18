// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: create_user_block.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createUserBlock = `-- name: CreateUserBlock :exec
INSERT INTO
  user_blocks (
    blocker_id,
    blocked_id
  )
VALUES
  (
    $1::uuid,
    $2::uuid
  )
`

type CreateUserBlockParams struct {
	BlockerID uuid.UUID `json:"blocker_id"`
	BlockedID uuid.UUID `json:"blocked_id"`
}

func (q *Queries) CreateUserBlock(ctx context.Context, arg CreateUserBlockParams) error {
	_, err := q.db.Exec(ctx, createUserBlock, arg.BlockerID, arg.BlockedID)
	return err
}