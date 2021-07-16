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
	userFieldNames          = builderx.RawFieldNames(&User{})
	userRows                = strings.Join(userFieldNames, ",")
	userRowsExpectAutoSet   = strings.Join(stringx.Remove(userFieldNames, "`id`", "`create_time`", "`update_time`"), ",")
	userRowsWithPlaceHolder = strings.Join(stringx.Remove(userFieldNames, "`id`", "`create_time`", "`update_time`"), "=?,") + "=?"

	cacheUserIdPrefix     = "cache#user#id#"
	cacheUserUseridPrefix = "cache#user#userid#"
)

type (
	UserModel interface {
		Insert(data User) (sql.Result, error)
		FindOne(id int64) (*User, error)
		FindOneByUserid(userid string) (*User, error)
		Update(data User) error
		Delete(id int64) error
	}

	defaultUserModel struct {
		sqlc.CachedConn
		table string
	}

	User struct {
		Status     sql.NullInt64  `db:"status"`  // 状态(0:禁止,1:正常)
		RoleId     int64          `db:"role_id"` // 角色编号
		CreateTime time.Time      `db:"create_time"`
		Username   string         `db:"username"` // 用户名称
		Job        string         `db:"job"`      // 职业
		Icon       sql.NullString `db:"icon"`     // 图标
		Id         int64          `db:"id"`
		Gender     string         `db:"gender"`    // 男｜女｜未公开
		Email      string         `db:"email"`     // 邮箱
		Age        int64          `db:"age"`       // 年龄
		Telephone  string         `db:"telephone"` // 手机
		Birth      string         `db:"birth"`     // 生日
		UpdateTime time.Time      `db:"update_time"`
		Userid     string         `db:"userid"`   // 用户id
		Password   string         `db:"password"` // 用户密码
	}
)

func NewUserModel(conn sqlx.SqlConn, c cache.CacheConf) UserModel {
	return &defaultUserModel{
		CachedConn: sqlc.NewConn(conn, c),
		table:      "`user`",
	}
}

func (m *defaultUserModel) Insert(data User) (sql.Result, error) {
	userUseridKey := fmt.Sprintf("%s%v", cacheUserUseridPrefix, data.Userid)
	ret, err := m.Exec(func(conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", m.table, userRowsExpectAutoSet)
		return conn.Exec(query, data.Status, data.RoleId, data.Username, data.Job, data.Icon, data.Gender, data.Email, data.Age, data.Telephone, data.Birth, data.Userid, data.Password)
	}, userUseridKey)
	return ret, err
}

func (m *defaultUserModel) FindOne(id int64) (*User, error) {
	userIdKey := fmt.Sprintf("%s%v", cacheUserIdPrefix, id)
	var resp User
	err := m.QueryRow(&resp, userIdKey, func(conn sqlx.SqlConn, v interface{}) error {
		query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", userRows, m.table)
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

func (m *defaultUserModel) FindOneByUserid(userid string) (*User, error) {
	userUseridKey := fmt.Sprintf("%s%v", cacheUserUseridPrefix, userid)
	var resp User
	err := m.QueryRowIndex(&resp, userUseridKey, m.formatPrimary, func(conn sqlx.SqlConn, v interface{}) (i interface{}, e error) {
		query := fmt.Sprintf("select %s from %s where `userid` = ? limit 1", userRows, m.table)
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

func (m *defaultUserModel) Update(data User) error {
	userIdKey := fmt.Sprintf("%s%v", cacheUserIdPrefix, data.Id)
	userUseridKey := fmt.Sprintf("%s%v", cacheUserUseridPrefix, data.Userid)
	_, err := m.Exec(func(conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("update %s set %s where `id` = ?", m.table, userRowsWithPlaceHolder)
		return conn.Exec(query, data.Status, data.RoleId, data.Username, data.Job, data.Icon, data.Gender, data.Email, data.Age, data.Telephone, data.Birth, data.Userid, data.Password, data.Id)
	}, userIdKey, userUseridKey)
	return err
}

func (m *defaultUserModel) Delete(id int64) error {
	data, err := m.FindOne(id)
	if err != nil {
		return err
	}

	userUseridKey := fmt.Sprintf("%s%v", cacheUserUseridPrefix, data.Userid)
	userIdKey := fmt.Sprintf("%s%v", cacheUserIdPrefix, id)
	_, err = m.Exec(func(conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("delete from %s where `id` = ?", m.table)
		return conn.Exec(query, id)
	}, userIdKey, userUseridKey)
	return err
}

func (m *defaultUserModel) formatPrimary(primary interface{}) string {
	return fmt.Sprintf("%s%v", cacheUserIdPrefix, primary)
}

func (m *defaultUserModel) queryPrimary(conn sqlx.SqlConn, v, primary interface{}) error {
	query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", userRows, m.table)
	return conn.QueryRow(v, query, primary)
}
