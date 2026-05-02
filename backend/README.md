# Project Klepon Boys - Backend

The backend service for Project Klepon Boys, built with Go and Gin. This service handles authentication, itinerary management, and provides data for concerts, hotels, and routes.

## Tech Stack

- **Language:** Go (1.26+)
- **Web Framework:** [Gin](https://github.com/gin-gonic/gin)
- **Database:** PostgreSQL
- **SQL Tool:** [sqlc](https://sqlc.dev/) (Type-safe SQL generator)
- **Auth:** JWT (JSON Web Tokens)
- **Environment:** godotenv

## Getting Started

### Prerequisites

- Go 1.26 or later
- PostgreSQL
- [sqlc](https://sqlc.dev/docs/install/) (optional, for regenerating DB code)

### Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Set up your environment variables:
   Create a `.env` file in the `backend` directory:
   ```env
   JWT_SECRET=your_super_secret_key
   ```

4. Database Setup:
   - Ensure PostgreSQL is running.
   - The connection string is currently hardcoded in `main.go` as: `postgresql://admin:admin@localhost:5432/otintern?sslmode=disable`. Adjust if necessary.
   - Run migrations/schema found in `sql/schema.sql`.

### Running the App

```bash
go run main.go
```
The server will start on `http://localhost:8080`.

## Project Structure

- `/db`: Generated sqlc code for database operations.
- `/handler`: Gin request handlers and routing logic.
- `/service`: Business logic and service layer.
- `/sql`: SQL schemas and queries.
- `main.go`: Application entry point and dependency injection.

## API Endpoints

### Public Endpoints
- `POST /register` - User registration
- `POST /login` - User login (returns JWT)
- `GET /hotels` - List available hotels
- `GET /concerts` - List upcoming concerts
- `GET /concerts/:id` - Get concert details
- `GET /route/:id` - Get route information for a venue

### Protected Endpoints (Requires JWT in `Authorization` header)
- `POST /itinerary` - Create a new itinerary
- `GET /itinerary` - Get user-specific itineraries

## Note
This is a work in progress for the OT Intern project. Juggling between projects? Check `notes.md` for specific implementation details or pending tasks.

## Todo
- Tabel concerts, kasih row nama artist sama tiket, reference ke id di tabel tiket 
- Tabel tiket, isinya id, tier, harga
- Reference tiket id ke tabel itineraries
- Tabel hotels, kasih row harga, bintang, fasilitas(?)
- Tabel itineraries, kasih tanggal check in dan check out
- whatever else omg 
