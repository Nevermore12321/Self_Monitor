package logic

import (
	"context"
	"errors"
	"github.com/dgrijalva/jwt-go"
	userModel "guoshaohe.com/api_gateway_model/user_info"
	"strconv"
	"strings"
	"time"

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

	// 根据用户名，查询数据库或者 redis 缓存
	userInfo, err := l.svcCtx.UserModel.FindOneByUsername(req.Username)
	switch err {
	case nil:
	case userModel.ErrNotFound:
		return nil, errors.New("用户名不存在")
	default:
		return nil, err
	}

	// 判断密码
	if userInfo.Password != req.Password {
		return nil, errors.New("用户密码不正确")
	}

	// 生成 jwt token
	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.Auth.AccessExpire
	accessSecret := l.svcCtx.Config.Auth.AccessSecret
	userId_int64, err := strconv.ParseInt(userInfo.Userid, 10, 64)
	if err != nil {
		return nil, err
	}
	jwtToken, err := l.getJwtToken(accessSecret, now, accessExpire, userId_int64)
	if err != nil {
		return nil, err
	}

	return &types.LoginReply{
		Id:           userInfo.Id,
		UserName:         userInfo.Username,
		UserId:       userInfo.Userid,
		AccessToken:  jwtToken,
		AccessExpire: now + accessExpire,
		RefreshAfter: now + accessExpire/2,
	}, nil
}

/*
 * secretkey : 密钥
 * iat : (issued at) 签发时间
 * seconds : 多久后过期
 * userId : 载荷payload中的自定义字段
 */
func (l *LoginLogic) getJwtToken(secretKey string, iat, seconds, userId int64) (string, error) {
	claims := make(jwt.MapClaims)
	claims["exp"] = iat + seconds
	claims["iat"] = iat
	claims["userId"] = userId
	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(secretKey))
}