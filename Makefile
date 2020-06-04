.PHONY: compile

compile:
	@protoc chat.proto \
		--go_out=plugins="grpc:." \
		--js_out=import_style=commonjs:client/src/proto \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:client/src/proto
