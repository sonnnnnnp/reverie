package response

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Response struct {
	OK   bool        `json:"ok"`
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

func JSON(ctx echo.Context, code int, data interface{}) error {
	httpStatus := http.StatusOK
	if code != http.StatusOK {
		httpStatus = http.StatusBadRequest
	}

	return ctx.JSON(httpStatus, &Response{
		Code: code,
		OK:   code == http.StatusOK,
		Data: data,
	})
}
