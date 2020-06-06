package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	pb "chat-server/proto"
)

func genToken() string {
	tkn := make([]byte, 6)
	rand.Read(tkn)
	return fmt.Sprintf("%x", tkn)
}

type server struct {
	clients   sync.Map // [string] = string
	streamChs sync.Map // [string] = chan *pb.Message
	exitCh    chan struct{}
	wg        *sync.WaitGroup
}

func (s *server) run(ctx context.Context) error {
	log.Println("Server run.")
	defer func() {
		close(s.exitCh)
		s.wg.Wait()
	}()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return fmt.Errorf("Failed to listen: %w", err)
	}

	grpcServer := grpc.NewServer()
	defer func() {
		grpcServer.GracefulStop()
		log.Println("Server shutdown.")
	}()

	pb.RegisterChatServiceServer(grpcServer, s)
	reflection.Register(grpcServer)

	go func() {
		grpcServer.Serve(lis)
	}()

	<-ctx.Done()

	return nil
}

func (s *server) Login(ctx context.Context, user *pb.User) (*pb.User, error) {
	log.Println("Try to logged in.")

	clientExists := false
	s.clients.Range(func(_, client interface{}) bool {
		if value, ok := client.(string); ok && value == user.GetName() {
			clientExists = true
			return false
		}
		return true
	})
	if clientExists {
		return &pb.User{}, fmt.Errorf("\"%s\" is already in use.", user.GetName())
	}

	user.Token = genToken()
	s.clients.Store(user.GetToken(), user.GetName())

	log.Printf("%s logged in.\n", user.GetName())
	return user, nil
}

func (s *server) Logout(ctx context.Context, user *pb.User) (*empty.Empty, error) {
	log.Println("Try to logged out.")

	s.clients.Delete(user.GetToken())
	s.deleteStreamCh(user.GetToken())
	log.Printf("%s logged out.\n", user.GetName())
	return &empty.Empty{}, nil
}

func (s *server) createStreamCh(token string) chan *pb.Message {
	log.Println("Try to create stream.")
	ch := make(chan *pb.Message, 1)
	s.streamChs.Store(token, ch)
	return ch
}

func (s *server) deleteStreamCh(token string) {
	log.Println("Try to delete stream.")
	if msg, ok := s.streamChs.Load(token); ok {
		if value, ok := msg.(chan *pb.Message); ok {
			close(value)
		}
		s.streamChs.Delete(token)
	}
}
func (s *server) broadcast(msg *pb.Message) {
	wg := new(sync.WaitGroup)
	s.streamChs.Range(func(_, ch interface{}) bool {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if value, ok := ch.(chan *pb.Message); ok {
				value <- msg
			}
		}()
		return true
	})
	wg.Wait()
}

func (s *server) SendMessage(ctx context.Context, msg *pb.Message) (*pb.Message, error) {
	log.Println("Try to broadcast message.")
	s.broadcast(msg)
	log.Printf("Sent %s.\n", msg.GetContent())
	return msg, nil
}

func (s *server) GetMessage(user *pb.User, stream pb.ChatService_GetMessageServer) error {
	s.wg.Add(1)
	defer s.wg.Done()
	streamCh := s.createStreamCh(user.GetToken())
	defer s.deleteStreamCh(user.GetToken())

	for {
		select {
		case msg, ok := <-streamCh:
			if !ok {
				return nil
			}
			if err := stream.Send(msg); err != nil {
				log.Println("Sending error.")
				return err
			}
		case <-s.exitCh:
			log.Printf("%s exit.\n", user.GetName())
			return nil
		}
	}
}
