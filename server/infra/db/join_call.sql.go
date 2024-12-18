// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: join_call.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const joinCall = `-- name: JoinCall :exec
INSERT INTO
  call_participants (
    call_id,
    participant_id,
    role
  )
VALUES
  (
    $1::uuid,
    $2::uuid,
    $3::call_participant_role
  )
`

type JoinCallParams struct {
	CallID        uuid.UUID               `json:"call_id"`
	ParticipantID uuid.UUID               `json:"participant_id"`
	Role          NullCallParticipantRole `json:"role"`
}

func (q *Queries) JoinCall(ctx context.Context, arg JoinCallParams) error {
	_, err := q.db.Exec(ctx, joinCall, arg.CallID, arg.ParticipantID, arg.Role)
	return err
}