# セットアップ
$ sudo paman -S protobuf grpc-cli
$ go get -u github.com/golang/protobuf/protoc-gen-go
$ npm install -g protoc-gen-grpc-web

# 検証
$ grpc_cli call localhost:50051 ChatService.Login 'name: "John"'

# 参考URL
https://github.com/grpc/grpc-web
https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/echo
https://godoc.org/google.golang.org/grpc
https://godoc.org/google.golang.org/grpc/status
