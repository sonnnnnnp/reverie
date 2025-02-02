package post

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/sonnnnnnp/reverie/server/adapter/http/api"
	"github.com/sonnnnnnp/reverie/server/infra/db"
	"github.com/sonnnnnnp/reverie/server/pkg/ctxhelper"
	internal_errors "github.com/sonnnnnnp/reverie/server/pkg/errors"
)

func (uc *PostUsecase) GetPostByID(ctx context.Context, pID uuid.UUID) (*api.Post, error) {
	selfUID := ctxhelper.GetUserID(ctx)

	r, err := db.New(uc.pool).GetPostByID(ctx, db.GetPostByIDParams{
		SelfID: selfUID,
		PostID: pID,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, internal_errors.ErrPostNotFound
		}
		return nil, err
	}

	return &api.Post{
		Author: api.User{
			AvatarImageUrl: r.User.AvatarImageUrl,
			BannerImageUrl: r.User.BannerImageUrl,
			Biography:      r.User.Biography,
			CreatedAt:      &r.User.CreatedAt.Time,
			Id:             r.User.ID,
			CustomId:       r.User.CustomID,
			Nickname:       r.User.Nickname,
		},
		Id:             r.Post.ID,
		Text:           r.Post.Text,
		Favorited:      r.Favorited,
		FavoritesCount: int(r.FavoritesCount),
		CreatedAt:      r.Post.CreatedAt.Time,
		UpdatedAt:      r.Post.UpdatedAt.Time,
	}, nil
}
