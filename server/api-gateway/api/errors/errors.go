package errors

import (
	"errors"
	"fmt"
)

const (
	// UnknownCode 服务器 500 错误
	UnknownCode = 500
	// UnknownReason 500 错误原因
	UnknownReason = ""
)

// http 请求的常见错误封装
type HTTPError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

//  错误的打印格式
func (e *HTTPError) Error() string {
	return fmt.Sprintf("HTTPError code: %d message: %s", e.Code, e.Message)
}

//  New 函数创建一个错误，需要传入三个参数：错误码，错误原因，和 message
func New(code int, reason, message string) *HTTPError {
	return &HTTPError{
		Code: int(code),
		Message: message,
	}

}

// 自定义 message 的 Newf 函数
func Newf(code int, reason, format string, params ...interface{}) *HTTPError {
	return New(code, reason, fmt.Sprintf(format, params...))
}


// 将普通的 error 转成 HTTPError 结构体
func FromError(err error) *HTTPError {
	if err == nil {
		return nil
	}
	if se := new(HTTPError); errors.As(err, &se) {
		return se
	}
	return &HTTPError{Code: 500}
}

// Code 函数会将 err 对象转成 HTTPError ，然后返回其中的 Code, 如果为nil返回200，如果不能转成 HTTPError，返回 500
func Code(err error) int {
	if err == nil {
		return 200
	}
	if se := FromError(err); err != nil {
		return int(se.Code)
	}
	return UnknownCode
}

// 返回错误原因
func Reason(err error) string {
	if se := FromError(err); err != nil {
		return se.Message
	}
	return UnknownReason
}