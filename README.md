# 概要
名前を入力したらメッセージのやりとりができるようになる。  
メッセージはサーバーに保存していないので、過去のメッセージは見えない。  

# 起動
$ git clone https://github.com/tayusa/grpc-web-simple-chat.git  
$ cd grpc-web-simple-chat  
$ docker-compose up -d --build  
$ chromium http://localhost:8080  

# protocをコンパイル
$ sudo paman -S protobuf  
$ go get -u github.com/golang/protobuf/protoc-gen-go  
$ npm install -g protoc-gen-grpc-web  
$ make build

# 検証
curlの代わりgrpc-cli  
$ sudo paman -S grpc-cli  
$ grpc_cli ls localhost:50051 chat.ChatService -l  
$ grpc_cli call localhost:50051 ChatService.Login 'name: "John"'  

# 参考URL
https://grpc.io/docs/languages/go/quickstart  
https://developers.google.com/protocol-buffers/docs/reference/go-generated  
https://github.com/grpc/grpc-go  
https://github.com/grpc/grpc-web  
https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/echo  
https://godoc.org/google.golang.org/grpc  
https://cloud.google.com/endpoints/docs/grpc/grpc-service-config?hl=ja  
