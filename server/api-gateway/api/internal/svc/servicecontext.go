package svc

import (
	"api/internal/config"
	userModel "github.com/Nevermore12321/Self_Monitor/server/api-gateway/model"
)

type ServiceContext struct {
	Config config.Config
	UserModel userModel.UserModel

}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
	}
}
