package controller

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/sonnnnnnp/reverie/server/adapter/http/api"
	"github.com/sonnnnnnp/reverie/server/pkg/response"
)

func (c Controller) GetPostTimeline(ctx echo.Context, params api.GetPostTimelineParams) error {
	posts, nextCursor, err := c.postTimelineUsecase.GetPostTimeline(ctx.Request().Context(), &params)
	if err != nil {
		return err
	}

	return response.JSON(ctx, http.StatusOK, &api.PostTimeline{
		Posts:      posts,
		NextCursor: nextCursor,
	})
}

func (c Controller) GetFollowingPostTimeline(ctx echo.Context, params api.GetFollowingPostTimelineParams) error {
	posts, nextCursor, err := c.postTimelineUsecase.GetFollowingPostTimeline(ctx.Request().Context(), &params)
	if err != nil {
		return err
	}

	return response.JSON(ctx, http.StatusOK, &api.PostTimeline{
		Posts:      posts,
		NextCursor: nextCursor,
	})
}

func (c Controller) GetUserPostTimeline(ctx echo.Context, uID uuid.UUID, params api.GetUserPostTimelineParams) error {
	posts, nextCursor, err := c.postTimelineUsecase.GetUserPostTimeline(ctx.Request().Context(), uID, &params)
	if err != nil {
		return err
	}

	return response.JSON(ctx, http.StatusOK, &api.PostTimeline{
		Posts:      posts,
		NextCursor: nextCursor,
	})
}
