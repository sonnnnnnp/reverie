package user

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/sonnnnnnp/reverie/server/adapter/http/api"
	"github.com/sonnnnnnp/reverie/server/infra/db"
	"github.com/sonnnnnnp/reverie/server/pkg/ctxhelper"
	internal_errors "github.com/sonnnnnnp/reverie/server/pkg/errors"
)

func (uc *UserUsecase) GetUserByCustomID(ctx context.Context, customID string) (*api.User, error) {
	selfUID := ctxhelper.GetUserID(ctx)

	queries := db.New(uc.pool)

	row, err := queries.GetUserByCustomID(ctx, customID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, internal_errors.ErrUserNotFound
		}
		return nil, err
	}

	var scRow db.GetSocialConnectionRow
	var bsRow db.GetBlockStatusRow
	if row.User.ID != selfUID {
		scRow, err = queries.GetSocialConnection(ctx, db.GetSocialConnectionParams{
			SelfID:   selfUID,
			TargetID: row.User.ID,
		})
		if err != nil {
			return nil, err
		}

		bsRow, err = queries.GetBlockStatus(ctx, db.GetBlockStatusParams{
			SelfID:   selfUID,
			TargetID: row.User.ID,
		})
		if err != nil {
			return nil, err
		}
	}

	return &api.User{
		Id:             row.User.ID,
		CustomId:       row.User.CustomID,
		Nickname:       row.User.Nickname,
		AvatarImageUrl: row.User.AvatarImageUrl,
		BannerImageUrl: row.User.BannerImageUrl,
		Biography:      row.User.Biography,
		BlockStatus: &api.BlockStatus{
			BlockedBy: bsRow.BlockedBy,
			Blocking:  bsRow.Blocking,
		},
		SocialConnection: &api.SocialConnection{
			Following:  scRow.Following,
			FollowedBy: scRow.FollowedBy,
		},
		SocialEngagement: &api.SocialEngagement{
			FollowingCount: int(row.FollowingCount),
			FollowersCount: int(row.FollowersCount),
			PostsCount:     int(row.PostsCount),
			MediaCount:     int(row.MediaCount),
			FavoritesCount: int(row.FavoritesCount),
		},
		CreatedAt: &row.User.CreatedAt.Time,
	}, nil
}
