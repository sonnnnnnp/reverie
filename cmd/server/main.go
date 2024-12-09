package main

import (
	"log"

	"github.com/sonnnnnnp/reverie/pkg/config"
	"github.com/sonnnnnnp/reverie/pkg/server"
)

func main() {
	cfg, err := config.New()
	if err != nil {
		log.Fatalf("failed initializing config: %v", err)
	}

	server.Run(cfg)
}
