package svc

import (
	"api/internal/config"
	"github.com/tal-tech/go-zero/core/stores/sqlx"
	userModel "guoshaohe.com/api_gateway_model/user_info"
)

type ServiceContext struct {
	Config config.Config
	UserModel userModel.UserModel

}

func NewServiceContext(c config.Config) *ServiceContext {
	conn := sqlx.NewMysql(c.Mysql.DataSource)
	return &ServiceContext{
		Config: c,
		UserModel: userModel.NewUserModel(conn, c.CacheRedis),
	}
}
