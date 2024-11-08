// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: delete_user_follower.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const deleteUserFollower = `-- name: DeleteUserFollower :exec
DELETE FROM user_followers
WHERE follower_id = $1::uuid AND following_id = $2::uuid
`

type DeleteUserFollowerParams struct {
	FollowerID  uuid.UUID
	FollowingID uuid.UUID
}

func (q *Queries) DeleteUserFollower(ctx context.Context, arg DeleteUserFollowerParams) error {
	_, err := q.db.Exec(ctx, deleteUserFollower, arg.FollowerID, arg.FollowingID)
	return err
}
