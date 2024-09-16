package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	authorize_usecase "github.com/sonnnnnnp/sns-app/internal/usecase/authorize"
	user_usecase "github.com/sonnnnnnp/sns-app/internal/usecase/user"
	"github.com/sonnnnnnp/sns-app/pkg/oapi"
)

type Response struct {
	OK   bool        `json:"ok"`
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

type Controller struct {
	authUsecase *authorize_usecase.AuthorizeUsecase
	userUsecase *user_usecase.UserUsecase
}

func New(
	authUsecase *authorize_usecase.AuthorizeUsecase,
	userUsecase *user_usecase.UserUsecase,
) *Controller {
	return &Controller{
		authUsecase: authUsecase,
		userUsecase: userUsecase,
	}
}

func (c *Controller) json(ctx echo.Context, code int, data interface{}) error {
	return ctx.JSON(http.StatusOK, &Response{
		Code: code,
		OK:   code == http.StatusOK,
		Data: data,
	})
}

var _ oapi.ServerInterface = (*Controller)(nil)
