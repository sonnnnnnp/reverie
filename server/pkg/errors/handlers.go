package errors

import (
	"github.com/labstack/echo/v4"
	"github.com/sonnnnnnp/reverie/server/pkg/response"
)

type ErrorMessage struct {
	Message interface{} `json:"message"`
}

func ErrorHandler(err error, ctx echo.Context) {
	if he, ok := err.(*echo.HTTPError); ok {
		response.JSON(ctx, he.Code, &ErrorMessage{
			Message: he.Message,
		})
		return
	}

	code := getErrorCode(err)

	response.JSON(ctx, code, &ErrorMessage{
		Message: err.Error(),
	})
}
