// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	CreatePost(ctx context.Context, arg CreatePostParams) (Post, error)
	CreatePostFavorite(ctx context.Context, arg CreatePostFavoriteParams) error
	CreateUser(ctx context.Context, lineID *string) (User, error)
	DeletePostFavorite(ctx context.Context, arg DeletePostFavoriteParams) error
	GetPostByID(ctx context.Context, id uuid.UUID) (Post, error)
	GetPostFavorite(ctx context.Context, arg GetPostFavoriteParams) (GetPostFavoriteRow, error)
	GetPostFavorites(ctx context.Context, postID uuid.UUID) ([]GetPostFavoritesRow, error)
	GetPosts(ctx context.Context, arg GetPostsParams) ([]GetPostsRow, error)
	GetUserByID(ctx context.Context, id uuid.UUID) (User, error)
	GetUserByLineID(ctx context.Context, lineID *string) (User, error)
	GetUserByName(ctx context.Context, name string) (User, error)
}

var _ Querier = (*Queries)(nil)
