# Variables
CLIENT_DIR = client
SERVER_DIR = ./

# Install dependencies
install:
	@echo "Installing dependencies..."
	@cd $(CLIENT_DIR) && npm install
	@cd $(SERVER_DIR) && go mod download

# Run client
run-client:
	@echo "Running client..."
	@cd $(CLIENT_DIR) && npm run dev

# Run server
run-server:
	@echo "Running server..."
	@cd $(SERVER_DIR) && go run main.go

# Run both client and server
run:
	@echo "Running both client and server..."
	@make run-client &
	@make run-server

# Build server
build-server:
	@echo "Building server..."
	@cd $(SERVER_DIR) && go build -o server main.go