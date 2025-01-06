package post_timeline

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/sonnnnnnp/reverie/server/adapter/http/api"
)

type IPostTimelineUsecase interface {
	GetPostTimeline(ctx context.Context, params *api.GetPostTimelineParams) (posts []api.Post, nextCursor uuid.UUID, err error)
	GetFollowingPostTimeline(ctx context.Context, params *api.GetFollowingPostTimelineParams) (posts []api.Post, nextCursor uuid.UUID, err error)
	GetUserPostTimeline(ctx context.Context, uID uuid.UUID, params *api.GetUserPostTimelineParams) (posts []api.Post, nextCursor uuid.UUID, err error)
}

type PostTimelineUsecase struct {
	pool *pgxpool.Pool
}

func New(
	pool *pgxpool.Pool,
) *PostTimelineUsecase {
	return &PostTimelineUsecase{
		pool: pool,
	}
}

var (
	defaultLimit = 25
	maxLimit     = 100
)

var _ IPostTimelineUsecase = (*PostTimelineUsecase)(nil)
