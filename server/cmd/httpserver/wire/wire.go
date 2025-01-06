package commands

import (
	"github.com/google/wire"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/sonnnnnnp/reverie/server/adapter/http/controller"
	"github.com/sonnnnnnp/reverie/server/pkg/line"
	"github.com/sonnnnnnp/reverie/server/usecase/authorize"
	"github.com/sonnnnnnp/reverie/server/usecase/call"
	"github.com/sonnnnnnp/reverie/server/usecase/call_timeline"
	"github.com/sonnnnnnp/reverie/server/usecase/gateway"
	"github.com/sonnnnnnp/reverie/server/usecase/post"
	"github.com/sonnnnnnp/reverie/server/usecase/post_timeline"
	"github.com/sonnnnnnp/reverie/server/usecase/user"
)

func Wire(pool *pgxpool.Pool) *controller.Controller {
	wire.Build(
		line.New,

		authorize.New,
		call.New,
		call_timeline.New,
		post.New,
		post_timeline.New,
		gateway.New,
		user.New,

		controller.New,
	)

	return &controller.Controller{}
}
