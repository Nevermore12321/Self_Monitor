package user_info

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/tal-tech/go-zero/core/stores/cache"
	"github.com/tal-tech/go-zero/core/stores/sqlc"
	"github.com/tal-tech/go-zero/core/stores/sqlx"
	"github.com/tal-tech/go-zero/core/stringx"
	"github.com/tal-tech/go-zero/tools/goctl/model/sql/builderx"
)

var (
	userInfoFieldNames          = builderx.RawFieldNames(&UserInfo{})
	userInfoRows                = strings.Join(userInfoFieldNames, ",")
	userInfoRowsExpectAutoSet   = strings.Join(stringx.Remove(userInfoFieldNames, "`id`", "`create_time`", "`update_time`"), ",")
	userInfoRowsWithPlaceHolder = strings.Join(stringx.Remove(userInfoFieldNames, "`id`", "`create_time`", "`update_time`"), "=?,") + "=?"

	cacheUserInfoIdPrefix       = "cache#userInfo#id#"
	cacheUserInfoEmailPrefix    = "cache#userInfo#email#"
	cacheUserInfoUseridPrefix   = "cache#userInfo#userid#"
	cacheUserInfoUsernamePrefix = "cache#userInfo#username#"
)

type (
	UserInfoModel interface {
		Insert(data UserInfo) (sql.Result, error)
		FindOne(id int64) (*UserInfo, error)
		FindOneByEmail(email string) (*UserInfo, error)
		FindOneByUserid(userid string) (*UserInfo, error)
		FindOneByUsername(username string) (*UserInfo, error)
		Update(data UserInfo) error
		Delete(id int64) error
	}

	defaultUserInfoModel struct {
		sqlc.CachedConn
		table string
	}

	UserInfo struct {
		Icon       sql.NullString `db:"icon"`   // 图标
		Userid     string         `db:"userid"` // 用户id
		Status     sql.NullInt64  `db:"status"` // 状态(0:禁止,1:正常)
		Gender     string         `db:"gender"` // 男｜女｜未公开
		Job        string         `db:"job"`    // 职业
		CreateTime time.Time      `db:"create_time"`
		Id         int64          `db:"id"`
		Username   string         `db:"username"`  // 用户名称
		Telephone  string         `db:"telephone"` // 手机
		Age        int64          `db:"age"`       // 年龄
		Birth      string         `db:"birth"`     // 生日
		RoleId     int64          `db:"role_id"`   // 角色编号
		UpdateTime time.Time      `db:"update_time"`
		Password   string         `db:"password"` // 用户密码
		Email      string         `db:"email"`    // 邮箱
	}
)

func NewUserInfoModel(conn sqlx.SqlConn, c cache.CacheConf) UserInfoModel {
	return &defaultUserInfoModel{
		CachedConn: sqlc.NewConn(conn, c),
		table:      "`user_info`",
	}
}

func (m *defaultUserInfoModel) Insert(data UserInfo) (sql.Result, error) {
	userInfoEmailKey := fmt.Sprintf("%s%v", cacheUserInfoEmailPrefix, data.Email)
	userInfoUseridKey := fmt.Sprintf("%s%v", cacheUserInfoUseridPrefix, data.Userid)
	userInfoUsernameKey := fmt.Sprintf("%s%v", cacheUserInfoUsernamePrefix, data.Username)
	ret, err := m.Exec(func(conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", m.table, userInfoRowsExpectAutoSet)
		return conn.Exec(query, data.Icon, data.Userid, data.Status, data.Gender, data.Job, data.Username, data.Telephone, data.Age, data.Birth, data.RoleId, data.Password, data.Email)
	}, userInfoEmailKey, userInfoUseridKey, userInfoUsernameKey)
	return ret, err
}

func (m *defaultUserInfoModel) FindOne(id int64) (*UserInfo, error) {
	userInfoIdKey := fmt.Sprintf("%s%v", cacheUserInfoIdPrefix, id)
	var resp UserInfo
	err := m.QueryRow(&resp, userInfoIdKey, func(conn sqlx.SqlConn, v interface{}) error {
		query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", userInfoRows, m.table)
		return conn.QueryRow(v, query, id)
	})
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultUserInfoModel) FindOneByEmail(email string) (*UserInfo, error) {
	userInfoEmailKey := fmt.Sprintf("%s%v", cacheUserInfoEmailPrefix, email)
	var resp UserInfo
	err := m.QueryRowIndex(&resp, userInfoEmailKey, m.formatPrimary, func(conn sqlx.SqlConn, v interface{}) (i interface{}, e error) {
		query := fmt.Sprintf("select %s from %s where `email` = ? limit 1", userInfoRows, m.table)
		if err := conn.QueryRow(&resp, query, email); err != nil {
			return nil, err
		}
		return resp.Id, nil
	}, m.queryPrimary)
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultUserInfoModel) FindOneByUserid(userid string) (*UserInfo, error) {
	userInfoUseridKey := fmt.Sprintf("%s%v", cacheUserInfoUseridPrefix, userid)
	var resp UserInfo
	err := m.QueryRowIndex(&resp, userInfoUseridKey, m.formatPrimary, func(conn sqlx.SqlConn, v interface{}) (i interface{}, e error) {
		query := fmt.Sprintf("select %s from %s where `userid` = ? limit 1", userInfoRows, m.table)
		if err := conn.QueryRow(&resp, query, userid); err != nil {
			return nil, err
		}
		return resp.Id, nil
	}, m.queryPrimary)
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultUserInfoModel) FindOneByUsername(username string) (*UserInfo, error) {
	userInfoUsernameKey := fmt.Sprintf("%s%v", cacheUserInfoUsernamePrefix, username)
	var resp UserInfo
	err := m.QueryRowIndex(&resp, userInfoUsernameKey, m.formatPrimary, func(conn sqlx.SqlConn, v interface{}) (i interface{}, e error) {
		query := fmt.Sprintf("select %s from %s where `username` = ? limit 1", userInfoRows, m.table)
		if err := conn.QueryRow(&resp, query, username); err != nil {
			return nil, err
		}
		return resp.Id, nil
	}, m.queryPrimary)
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultUserInfoModel) Update(data UserInfo) error {
	userInfoIdKey := fmt.Sprintf("%s%v", cacheUserInfoIdPrefix, data.Id)
	userInfoEmailKey := fmt.Sprintf("%s%v", cacheUserInfoEmailPrefix, data.Email)
	userInfoUseridKey := fmt.Sprintf("%s%v", cacheUserInfoUseridPrefix, data.Userid)
	userInfoUsernameKey := fmt.Sprintf("%s%v", cacheUserInfoUsernamePrefix, data.Username)
	_, err := m.Exec(func(conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("update %s set %s where `id` = ?", m.table, userInfoRowsWithPlaceHolder)
		return conn.Exec(query, data.Icon, data.Userid, data.Status, data.Gender, data.Job, data.Username, data.Telephone, data.Age, data.Birth, data.RoleId, data.Password, data.Email, data.Id)
	}, userInfoIdKey, userInfoEmailKey, userInfoUseridKey, userInfoUsernameKey)
	return err
}

func (m *defaultUserInfoModel) Delete(id int64) error {
	data, err := m.FindOne(id)
	if err != nil {
		return err
	}

	userInfoIdKey := fmt.Sprintf("%s%v", cacheUserInfoIdPrefix, id)
	userInfoEmailKey := fmt.Sprintf("%s%v", cacheUserInfoEmailPrefix, data.Email)
	userInfoUseridKey := fmt.Sprintf("%s%v", cacheUserInfoUseridPrefix, data.Userid)
	userInfoUsernameKey := fmt.Sprintf("%s%v", cacheUserInfoUsernamePrefix, data.Username)
	_, err = m.Exec(func(conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("delete from %s where `id` = ?", m.table)
		return conn.Exec(query, id)
	}, userInfoIdKey, userInfoEmailKey, userInfoUseridKey, userInfoUsernameKey)
	return err
}

func (m *defaultUserInfoModel) formatPrimary(primary interface{}) string {
	return fmt.Sprintf("%s%v", cacheUserInfoIdPrefix, primary)
}

func (m *defaultUserInfoModel) queryPrimary(conn sqlx.SqlConn, v, primary interface{}) error {
	query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", userInfoRows, m.table)
	return conn.QueryRow(v, query, primary)
}
