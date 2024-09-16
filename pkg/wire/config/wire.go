package wire_config

import (
	"github.com/google/wire"
	"github.com/sonnnnnnp/sns-app/internal/adapter/controller"
	"github.com/sonnnnnnp/sns-app/internal/domain/ent"
	repository "github.com/sonnnnnnp/sns-app/internal/domain/repository/user"
	usecase "github.com/sonnnnnnp/sns-app/internal/usecase/user"
)

func Init(db *ent.Client) *controller.Controller {
	wire.Build(
		repository.NewUserRepository,
		usecase.NewUserUsecase,
		controller.New,
	)

	return &controller.Controller{}
}
