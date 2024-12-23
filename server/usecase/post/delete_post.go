package post

import (
	"context"

	"github.com/google/uuid"
	"github.com/sonnnnnnp/reverie/server/infra/db"
)

func (uc *PostUsecase) DeletePost(ctx context.Context, pID uuid.UUID) error {
	return db.New(uc.pool).DeletePost(ctx, pID)
}
