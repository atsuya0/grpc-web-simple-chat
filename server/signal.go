package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

func acceptSignals() context.Context {
	ch := make(chan os.Signal, 1)
	signal.Notify(
		ch,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT,
	)
	ctx, cancel := context.WithCancel(context.Background())

	go func() {
		defer close(ch)
		defer signal.Stop(ch)
		<-ch
		cancel()
	}()

	return ctx
}
