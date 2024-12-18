// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: get_following_call_timeline.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const getFollowingCallTimeline = `-- name: GetFollowingCallTimeline :many
SELECT
    calls.id, calls.title, calls.type, calls.joinable_by, calls.host_id, calls.started_at, calls.ended_at,
    json_agg(json_build_object(
        'role', call_participants.role,
        'user', to_jsonb(users) || jsonb_build_object(
            'block_status', jsonb_build_object(
                'blocking', EXISTS (
                    SELECT 1
                    FROM user_blocks
                    WHERE blocker_id = $2::uuid
                    AND blocked_id = users.id
                ),
                'blocked_by', EXISTS (
                    SELECT 1
                    FROM user_blocks
                    WHERE blocker_id = users.id
                    AND blocked_id = $2::uuid
                )
            )
        )
    )) AS participants
FROM
    calls
    LEFT JOIN
        call_participants
        ON calls.id = call_participants.call_id
    LEFT JOIN
        users
        ON call_participants.participant_id = users.id
WHERE
    (
        -- ブロックユーザーがホストの場合は取得しない
        NOT EXISTS (
            SELECT 1
            FROM
                user_blocks
            WHERE
                (
                    blocker_id = $2::uuid
                    AND blocked_id = calls.host_id
                )
                OR (
                    blocker_id = calls.host_id
                    AND blocked_id = $2::uuid
                )
        )
    )
    AND (
        EXISTS (
            SELECT 1
            FROM
                user_follows
            WHERE
                follower_id = $2::uuid
                AND followed_id = call_participants.participant_id
        )
    )
GROUP BY
    calls.id
ORDER BY
    RANDOM()
LIMIT
    $1
`

type GetFollowingCallTimelineParams struct {
	Limit  int64     `json:"limit"`
	SelfID uuid.UUID `json:"self_id"`
}

type GetFollowingCallTimelineRow struct {
	Call         Call   `json:"call"`
	Participants []byte `json:"participants"`
}

func (q *Queries) GetFollowingCallTimeline(ctx context.Context, arg GetFollowingCallTimelineParams) ([]GetFollowingCallTimelineRow, error) {
	rows, err := q.db.Query(ctx, getFollowingCallTimeline, arg.Limit, arg.SelfID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetFollowingCallTimelineRow{}
	for rows.Next() {
		var i GetFollowingCallTimelineRow
		if err := rows.Scan(
			&i.Call.ID,
			&i.Call.Title,
			&i.Call.Type,
			&i.Call.JoinableBy,
			&i.Call.HostID,
			&i.Call.StartedAt,
			&i.Call.EndedAt,
			&i.Participants,
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