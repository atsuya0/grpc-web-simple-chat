FROM golang:latest

WORKDIR /server
COPY . .
RUN go mod download
RUN go build -o app
CMD ./app
