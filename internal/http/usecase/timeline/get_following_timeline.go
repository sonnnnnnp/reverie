package timeline

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/sonnnnnnp/reverie/internal/http/adapter/api"
	internal_errors "github.com/sonnnnnnp/reverie/internal/http/errors"
	"github.com/sonnnnnnp/reverie/internal/pkg/ctxhelper"
	"github.com/sonnnnnnp/reverie/pkg/db"
)

func (uc *TimelineUsecase) GetFollowingTimeline(ctx context.Context, params *api.GetFollowingTimelineParams) (posts []api.Post, nextCursor uuid.UUID, err error) {
	selfUID := ctxhelper.GetUserID(ctx)

	queries := db.New(uc.pool)

	// 指定されたカーソル投稿 ID から検索用日時を取得する
	var fromCursor *time.Time
	if params.Cursor != nil {
		r, err := queries.GetPostByID(ctx, db.GetPostByIDParams{
			SelfID: selfUID,
			PostID: *params.Cursor,
		})
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return nil, uuid.Nil, internal_errors.ErrCursorNotFound
			}
			return nil, uuid.Nil, err
		}
		fromCursor = &r.Post.CreatedAt.Time
	}

	// リミットの初期値と上限値を設定
	if params.Limit == nil {
		params.Limit = &defaultLimit
	}
	if *params.Limit > maxLimit {
		params.Limit = &maxLimit
	}

	// タイムラインを取得
	rows, err := queries.GetFollowingTimeline(ctx, db.GetFollowingTimelineParams{
		SelfID:    selfUID,
		CreatedAt: fromCursor,
		Limit:     int64(*params.Limit),
	})
	if err != nil {
		return nil, uuid.Nil, err
	}

	posts = make([]api.Post, 0)
	for _, r := range rows {
		posts = append(posts, api.Post{
			Author: api.User{
				AvatarImageUrl: r.User.AvatarImageUrl,
				BannerImageUrl: r.User.BannerImageUrl,
				Biography:      r.User.Biography,
				CreatedAt:      r.User.CreatedAt.Time,
				Id:             r.User.ID,
				Name:           r.User.Name,
				Nickname:       r.User.Nickname,
				UpdatedAt:      r.User.UpdatedAt.Time,
			},
			CreatedAt:      r.Post.CreatedAt.Time,
			Favorited:      r.Favorited,
			FavoritesCount: int(r.FavoritesCount),
			Id:             r.Post.ID,
			Text:           r.Post.Text,
			UpdatedAt:      r.Post.UpdatedAt.Time,
		})
	}

	if len(posts) == 0 {
		return posts, uuid.Nil, nil
	}

	// 最後の投稿 ID を次のカーソルとして返却する
	return posts, posts[len(posts)-1].Id, nil
}
