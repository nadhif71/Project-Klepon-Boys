# Build stage
FROM golang:1.26.2-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
# Use -ldflags="-w -s" to reduce binary size
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main .

# Final stage
FROM alpine:latest

# Set working directory
WORKDIR /app

# Install ca-certificates for secure connections (HTTPS)
RUN apk --no-cache add ca-certificates

# Copy the binary from the build stage
COPY --from=builder /app/main .

# Expose the port (Cloud Run will override this with PORT env var)
EXPOSE 8080

# Run the application
CMD ["./main"]
