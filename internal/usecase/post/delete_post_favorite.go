package post

import (
	"context"

	"github.com/google/uuid"
	"github.com/sonnnnnnp/sns-app/internal/tools/ctxhelper"
)

func (pu *PostUsecase) DeletePostFavorite(ctx context.Context, pID uuid.UUID) error {
	return pu.postRepo.DeletePostFavorite(ctx, ctxhelper.GetUserID(ctx), pID)
}