module api

go 1.16

require github.com/tal-tech/go-zero v1.1.8
require github.com/Nevermore12321/Self_Monitor/server/api-gateway/model latest

replace (
	github.com/Nevermore12321/Self_Monitor/server/api-gateway/model latest => ../model latest
)