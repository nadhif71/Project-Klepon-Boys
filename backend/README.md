# Project Klepon Boys - Backend API 

Welcome to the backend documentation for **Project Klepon Boys**! This is a Go-based REST API designed to power our uni project, handling everything from concert ticketing and hotel bookings to intercity transport and crowd check-ins.

## Tech Stack

- **Language:** Go (1.21+)
- **Framework:** [Gin Gonic](https://github.com/gin-gonic/gin)
- **Database:** PostgreSQL
- **SQL Tool:** [sqlc](https://sqlc.dev/)
- **Authentication:** JWT (JSON Web Tokens)

---

## Getting Started

### 1. Prerequisites
- Go installed on your machine.
- PostgreSQL running locally.
- A tool like Postman or Insomnia for testing.

### 2. Setup
Clone the repo and install dependencies:
```bash
cd backend
go mod tidy
```

### 3. Environment Variables
Create a `.env` file in the `backend` folder:
```env
JWT_SECRET=your_secret_key_here
```

### 4. Database Connection
Currently, the connection string is hardcoded in `main.go`. Ensure your local Postgres matches:
- **URL:** `postgresql://admin:admin@localhost:5432/otinternn?sslmode=disable`
- **Database Name:** `otinternn`

### 5. Run the Server
```bash
go run main.go
```
The API will be available at `http://localhost:8080`.

---

## Authentication

Most of the itinerary-related endpoints are protected. To access them:
1.  **Register/Login** to get a token.
2.  Include the token in the `Authorization` header of your requests:
    `Authorization: Bearer <your_token_here>`

---

## API Reference

### 1. Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Create a new account |
| `POST` | `/login` | Sign in and receive a JWT |

#### **POST /register**
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```
**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### **POST /login**
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

### 2. Hotels
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/hotels` | List all available hotels |
| `GET` | `/hotels/:id` | Get details for a specific hotel |
| `POST` | `/hotelbookings` | **(Protected)** Book a hotel |
| `GET` | `/hotelbookings` | **(Protected)** View your bookings |

#### **GET /hotels**
**Response (200 OK):**
```json
[
  {
    "ID": 1,
    "Name": "Grand Hyatt Jakarta",
    "Address": "Jl. M.H. Thamrin No.30",
    "Latitude": "-6.1919",
    "Longitude": "106.8227",
    "PriceEst": "2500000",
    "StarRating": 5,
    "Facilities": ["WiFi", "Pool", "Gym"]
  }
]
```

#### **POST /hotelbookings**
**Request Body:**
```json
{
  "hotel_id": 1,
  "check_in_date": "2023-12-01T14:00:00Z",
  "check_out_date": "2023-12-05T12:00:00Z",
  "status": "confirmed"
}
```
**Response (200 OK):**
```json
{
  "ID": 10,
  "CreatedAt": "2023-11-01T10:00:00Z"
}
```

#### **GET /hotelbookings**
**Response (200 OK):**
```json
[
  {
    "ID": 10,
    "CheckInDate": "2023-12-01T14:00:00Z",
    "CheckOutDate": "2023-12-05T12:00:00Z",
    "Status": "confirmed",
    "CreatedAt": "2023-11-01T10:00:00Z",
    "HotelName": "Grand Hyatt Jakarta",
    "Address": "Jl. M.H. Thamrin No.30",
    "PriceEst": "2500000",
    "StarRating": 5
  }
]
```

---

### 3. Concerts & Tickets
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/concerts` | List all upcoming concerts |
| `GET` | `/concerts/:id` | Get details for a concert |
| `GET` | `/concert/:id/tickets` | List ticket tiers for a concert |
| `POST` | `/ticketorders` | **(Protected)** Buy tickets |
| `GET` | `/ticketorders` | **(Protected)** View your ticket orders |
| `PATCH` | `/tickets/:id` | Update ticket stock (Admin use) |

#### **GET /concerts**
**Response (200 OK):**
```json
[
  {
    "ID": 5,
    "Title": "Coldplay Music of the Spheres",
    "ArtistName": "Coldplay",
    "EventDate": "2023-11-15T20:00:00Z",
    "Description": "World Tour 2023",
    "VenueID": 1,
    "VenueName": "Gelora Bung Karno",
    "Latitude": "-6.2183",
    "Longitude": "106.8022"
  }
]
```

#### **GET /concert/:id/tickets**
**Response (200 OK):**
```json
[
  {
    "ID": 10,
    "ConcertID": 5,
    "Tier": "CAT 1",
    "Price": "5000000",
    "Stock": 150
  }
]
```

#### **POST /ticketorders**
**Request Body:**
```json
{
  "ticket_id": 10,
  "quantity": 2,
  "status": "paid"
}
```
**Response (200 OK):**
```json
{
  "ID": 100,
  "CreatedAt": "2023-11-01T12:00:00Z"
}
```

#### **GET /ticketorders**
**Response (200 OK):**
```json
[
  {
    "ID": 100,
    "Quantity": 2,
    "Status": "paid",
    "CreatedAt": "2023-11-01T12:00:00Z",
    "Tier": "CAT 1",
    "Price": "5000000",
    "ConcertTitle": "Coldplay Music of the Spheres",
    "ArtistName": "Coldplay",
    "EventDate": "2023-11-15T20:00:00Z",
    "VenueName": "Gelora Bung Karno"
  }
]
```

#### **PATCH /tickets/:id**
**Request Body:**
```json
{
  "stock": 200
}
```
**Response (200 OK):**
```json
{
  "ID": 10,
  "Stock": 200
}
```

---

### 4. Public Transport Routing
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/route/:id` | Get in-city transport routes to a venue |

#### **GET /route/:id**
**Response (200 OK):**
```json
[
  {
    "ID": 1,
    "Mode": "MRT",
    "RouteName": "North-South Line",
    "OriginName": "Lebak Bulus",
    "EstPrice": "14000",
    "EstDuration": 30,
    "PathJson": { "type": "LineString", "coordinates": [...] }
  }
]
```

---

### 5. Intercity Transport
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/intercities` | **(Protected)** Create transport plan |
| `GET` | `/intercities` | **(Protected)** View your transport plans |

#### **POST /intercities**
**Request Body:**
```json
{
  "origin_city": "Bandung",
  "transport_mode": "Train",
  "departure_date": "2023-11-14T08:00:00Z",
  "return_date": "2023-11-16T18:00:00Z",
  "status": "booked"
}
```
**Response (200 OK):**
```json
{
  "ID": 50,
  "CreatedAt": "2023-11-01T15:00:00Z"
}
```

#### **GET /intercities**
**Response (200 OK):**
```json
[
  {
    "ID": 50,
    "OriginCity": "Bandung",
    "TransportMode": "Train",
    "DepartureDate": "2023-11-14T08:00:00Z",
    "ReturnDate": "2023-11-16T18:00:00Z",
    "Status": "booked",
    "CreatedAt": "2023-11-01T15:00:00Z"
  }
]
```

---

### 6. Pickups & Crowd Check-in
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/venue/:id/pickups` | List pickup points for a venue |
| `POST` | `/crowdcheckins` | **(Protected)** Check-in at a pickup point |

#### **GET /venue/:id/pickups**
**Response (200 OK):**
```json
[
  {
    "ID": 5,
    "Name": "North Gate Pickup",
    "Latitude": "-6.2170",
    "Longitude": "106.8010",
    "MaxCapacity": 500,
    "CurrentCount": 120
  }
]
```

#### **POST /crowdcheckins**
**Request Body:**
```json
{
  "pickup_point_id": 5
}
```
**Response (200 OK):**
```json
{
  "ID": "550e8400-e29b-41d4-a716-446655440001",
  "CheckInTime": "2023-11-15T19:00:00Z"
}
```

---

### 7. Dashboard
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/dashboard` | **(Protected)** Get a summary of all user activities |

#### **GET /dashboard**
**Response (200 OK):**
```json
[
  {
    "TicketOrderID": 100,
    "ConcertTitle": "Coldplay Music of the Spheres",
    "ArtistName": "Coldplay",
    "EventDate": "2023-11-15T20:00:00Z",
    "VenueName": "Gelora Bung Karno",
    "TicketTier": "CAT 1",
    "TicketStatus": "paid",
    "HotelName": "Grand Hyatt Jakarta",
    "CheckInDate": "2023-12-01T14:00:00Z",
    "CheckOutDate": "2023-12-05T12:00:00Z",
    "IntercityMode": "Train",
    "DepartureDate": "2023-11-14T08:00:00Z",
    "ReturnDate": "2023-11-16T18:00:00Z"
  }
]
```

---

## Error Responses

All error responses follow this format:
```json
{
  "error": "Detailed error message here"
}
```

Common status codes:
- `400 Bad Request`: Validation errors or invalid IDs.
- `401 Unauthorized`: Missing or invalid Bearer token.
- `500 Internal Server Error`: Database or server-side issues.

---

## Note for Frontend
- Dates should be sent in **RFC3339** format (e.g., `2023-12-01T14:00:00Z`).
- The `user_id` is automatically extracted from the JWT; you don't need to send it in request bodies for protected routes.
- If you see `login dulu` as an error, it means your token is missing or expired.

