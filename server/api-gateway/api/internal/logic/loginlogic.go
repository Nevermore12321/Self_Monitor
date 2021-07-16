package logic

import (
	"context"
	"errors"
	"strings"

	"api/internal/svc"
	"api/internal/types"

	"github.com/tal-tech/go-zero/core/logx"
)

type LoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) LoginLogic {
	return LoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *LoginLogic) Login(req types.LoginReq) (*types.LoginReply, error) {
	if len(strings.TrimSpace(req.Username)) == 0  || len(strings.TrimSpace(req.Password)) == 0 {
		return nil, errors.New("参数错误")
	}



	return &types.LoginReply{}, nil
}
