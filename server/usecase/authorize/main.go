package authorize

import (
	"context"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/sonnnnnnp/reverie/server/adapter/http/api"
	"github.com/sonnnnnnp/reverie/server/pkg/line"
)

type IAuthorizeUsecase interface {
	AuthorizeWithCustomID(ctx context.Context, customID string) (*api.Authorization, error)
	AuthorizeWithLine(ctx context.Context, code string) (*api.Authorization, error)
	RefreshAuthorization(ctx context.Context, body *api.RefreshAuthorizationJSONBody) (*api.Authorization, error)
}

type AuthorizeUsecase struct {
	pool *pgxpool.Pool
	line *line.Client
}

func New(
	pool *pgxpool.Pool,
	line *line.Client,
) *AuthorizeUsecase {
	return &AuthorizeUsecase{
		pool: pool,
		line: line,
	}
}

var _ IAuthorizeUsecase = (*AuthorizeUsecase)(nil)

func (uc *AuthorizeUsecase) generateToken(jwtSecret []byte, claims jwt.Claims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func (uc *AuthorizeUsecase) generateAuthorization(jwtSecret []byte, uid uuid.UUID, IsNew bool) (*api.Authorization, error) {
	atoken, err := uc.generateToken(
		jwtSecret,
		jwt.MapClaims{
			"sub":   uid.String(),
			"exp":   jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
			"scope": "access",
		},
	)
	if err != nil {
		return nil, err
	}

	rtoken, err := uc.generateToken(
		jwtSecret,
		jwt.MapClaims{
			"sub":   uid.String(),
			"exp":   jwt.NewNumericDate(time.Now().Add(30 * 24 * time.Hour)),
			"scope": "refresh",
		},
	)
	if err != nil {
		return nil, err
	}

	return &api.Authorization{
		AccessToken:  atoken,
		RefreshToken: rtoken,
		UserId:       uid.String(),
		IsNew:        IsNew,
	}, nil
}
