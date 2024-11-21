package server

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"

	"github.com/sonnnnnnp/reverie/internal"
	"github.com/sonnnnnnp/reverie/internal/adapter/api"
	"github.com/sonnnnnnp/reverie/internal/adapter/gateway/db"
	"github.com/sonnnnnnp/reverie/internal/adapter/middleware"
	"github.com/sonnnnnnp/reverie/internal/errors"
	"github.com/sonnnnnnp/reverie/pkg/config"
	"github.com/sonnnnnnp/reverie/pkg/ws"

	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func Run(cfg *config.Config) {
	pool, err := db.Open(&db.ConnectionOptions{
		ConnString:      cfg.DBDSN,
		MaxConnLifetime: cfg.DBMaxConnLifetime,
		MaxConnIdleTime: cfg.DBMaxConnIdleTime,
		MaxConns:        cfg.DBMaxConns,
		MinConns:        cfg.DBMinConns,
	})
	if err != nil {
		log.Fatalf("failed opening connection to database: %v", err)
	}
	defer pool.Close()

	e := echo.New()

	e.HTTPErrorHandler = errors.ErrorHandler

	middlewarecfg := echomiddleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}

	jwtExcludePaths := []string{
		"/authorize/username",
		"/authorize/line",
		"/authorize/refresh",
	}

	websocket := ws.NewHub()
	go websocket.Listen()

	swagger, err := api.GetSwagger()
	if err != nil {
		panic(err)
	}

	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.CORSWithConfig(middlewarecfg))
	e.Use(middleware.Config(cfg))
	e.Use(middleware.JWT(jwtExcludePaths))
	e.Use(middleware.WebSocket(websocket))
	e.Use(middleware.RequestValidator(swagger))

	api.RegisterHandlers(e, internal.Wire(pool))

	e.Logger.Fatal(e.Start(":1323"))
}
