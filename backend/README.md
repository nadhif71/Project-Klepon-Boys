# Project Klepon Boys - Backend API

Welcome to the backend documentation for **Project Klepon Boys**! This is a Go-based REST API designed to power our uni project, handling everything from concert ticketing and hotel bookings to intercity transport and crowd check-ins.

Base URL: `otintern.vercel.app`

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
- PostgreSQL running locally or Supabase connection string.

### 2. Setup
```bash
cd backend
go mod tidy
```

### 3. Environment Variables
Create a `.env` file in the `backend` folder:
```env
JWT_SECRET=your_secret_key_here
DB_CONNECTION_STRING=postgresql://admin:admin@localhost:5432/otinternn?sslmode=disable
```

### 4. Run Migrations
If setting up fresh or updating, run `sql/migration.sql` against your database to add new columns and tables.

### 5. Run the Server
```bash
go run main.go
```
The API will be available at `http://localhost:8080`.

### 6. Regenerate sqlc (if you change queries)
```bash
sqlc generate
```

---

## Authentication

Most itinerary-related endpoints are protected. To access them:
1. **Register/Login** to get a token.
2. Include the token in the `Authorization` header:
   `Authorization: Bearer <your_token_here>`

---

## API Reference

### 1. Authentication
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | No | Create a new account |
| `POST` | `/login` | No | Sign in and receive a JWT |
| `POST` | `/forgot-password` | No | Get a password reset token |
| `POST` | `/reset-password` | No | Set new password with token |

#### POST /register
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user",
  "first_name": "Budi",
  "last_name": "Wijaya"
}
```
**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "user",
    "first_name": "Budi",
    "last_name": "Wijaya"
  }
}
```

#### POST /login
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
    "role": "user",
    "first_name": "Budi",
    "last_name": "Wijaya"
  }
}
```

#### POST /forgot-password
**Request Body:**
```json
{
  "email": "user@example.com"
}
```
**Response (200 OK):**
```json
{
  "message": "reset token generated",
  "reset_token": "a1b2c3d4e5f6..."
}
```
> **Note:** For hackathon purposes the token is returned directly. In production, this would be emailed.

#### POST /reset-password
**Request Body:**
```json
{
  "token": "a1b2c3d4e5f6...",
  "new_password": "newpassword456"
}
```
**Response (200 OK):**
```json
{
  "message": "password has been reset"
}
```

---

### 2. Concerts & Tickets
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/concerts` | No | List all upcoming concerts |
| `GET` | `/concerts/:id` | No | Get details for a concert |
| `GET` | `/concert/:id/tickets` | No | List ticket tiers for a concert |
| `POST` | `/ticketorders` | Yes | Buy tickets |
| `GET` | `/ticketorders` | Yes | View your ticket orders |
| `GET` | `/ticketorders/:id` | Yes | Get single ticket order detail |
| `PATCH` | `/tickets/:id` | No | Update ticket stock (Admin) |

#### GET /concerts
**Response (200 OK):**
```json
[
  {
    "ID": 5,
    "Title": "Coldplay Music of the Spheres",
    "ArtistName": "Coldplay",
    "EventDate": "2023-11-15T20:00:00Z",
    "Description": "World Tour 2023",
    "ImageUrl": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    "VenueID": 1,
    "VenueName": "Gelora Bung Karno",
    "VenueAddress": "Jl. Pintu Satu Senayan, Jakarta",
    "Latitude": "-6.2183",
    "Longitude": "106.8022",
    "VenueImageUrl": "https://images.unsplash.com/photo-1576485290814-1c72a34c2bb2?w=800"
  }
]
```

#### GET /concert/:id/tickets
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

#### POST /ticketorders
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

#### GET /ticketorders
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

#### GET /ticketorders/:id
**Response (200 OK):**
```json
{
  "ID": 100,
  "Quantity": 2,
  "Status": "paid",
  "CreatedAt": "2023-11-01T12:00:00Z",
  "TicketID": 10,
  "Tier": "CAT 1",
  "Price": "5000000",
  "ConcertID": 5,
  "ConcertTitle": "Coldplay Music of the Spheres",
  "ArtistName": "Coldplay",
  "EventDate": "2023-11-15T20:00:00Z",
  "ConcertImageUrl": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
  "VenueID": 1,
  "VenueName": "Gelora Bung Karno"
}
```

#### PATCH /tickets/:id
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

### 3. Hotels
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/hotels` | No | List all available hotels |
| `GET` | `/hotels/:id` | No | Get details for a specific hotel |
| `POST` | `/hotelbookings` | Yes | Book a hotel |
| `GET` | `/hotelbookings` | Yes | View your bookings |
| `GET` | `/hotelbookings/:id` | Yes | Get single booking detail |

#### GET /hotels
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
    "Facilities": ["WiFi", "Pool", "Gym"],
    "Images": ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
    "Description": "Hotel bintang 5 mewah di kawasan Senayan",
    "IsRecommended": true
  }
]
```

#### POST /hotelbookings
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

#### GET /hotelbookings
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

#### GET /hotelbookings/:id
**Response (200 OK):**
```json
{
  "ID": 10,
  "CheckInDate": "2023-12-01T14:00:00Z",
  "CheckOutDate": "2023-12-05T12:00:00Z",
  "Status": "confirmed",
  "CreatedAt": "2023-11-01T10:00:00Z",
  "HotelID": 1,
  "HotelName": "Grand Hyatt Jakarta",
  "Address": "Jl. M.H. Thamrin No.30",
  "PriceEst": "2500000",
  "StarRating": 5,
  "Images": ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
  "Description": "Hotel bintang 5 mewah di kawasan Senayan"
}
```

---

### 4. Venues
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/venues` | No | List all venues |
| `GET` | `/venues/:id` | No | Get venue details |

#### GET /venues
**Response (200 OK):**
```json
[
  {
    "ID": 1,
    "Name": "Gelora Bung Karno",
    "Address": "Jl. Pintu Satu Senayan, Jakarta",
    "Latitude": "-6.2183",
    "Longitude": "106.8022",
    "ImageUrl": "https://images.unsplash.com/photo-1576485290814-1c72a34c2bb2?w=800",
    "Description": "Stadion utama Gelora Bung Karno"
  }
]
```

---

### 5. Intercity Transport & Cities
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cities` | No | List all cities |
| `GET` | `/cities/:id/hubs` | No | List transport hubs for a city |
| `GET` | `/transport-options` | No | Browse available tickets |
| `POST` | `/intercities` | Yes | Create transport plan |
| `GET` | `/intercities` | Yes | View your transport plans |
| `GET` | `/intercities/:id` | Yes | Get single transport plan detail |

#### GET /cities
**Response (200 OK):**
```json
[
  { "ID": 1, "Name": "Jakarta" },
  { "ID": 2, "Name": "Yogyakarta" }
]
```

#### GET /cities/:id/hubs
**Response (200 OK):**
```json
[
  { "ID": 1, "CityID": 1, "HubName": "Soekarno-Hatta International Airport", "HubType": "plane" },
  { "ID": 2, "CityID": 1, "HubName": "Gambir Station", "HubType": "train" }
]
```

#### GET /transport-options?origin_hub=1&destination_hub=3
> Omit query params to get all options. `origin_hub` and `destination_hub` are optional filters.

**Response (200 OK):**
```json
[
  {
    "ID": 1,
    "ProviderName": "Garuda Indonesia",
    "Price": "850000.00",
    "DepartureTime": "06:00:00",
    "ArrivalTime": "07:30:00",
    "Class": "Economy",
    "TravelDate": "2025-07-15T00:00:00Z",
    "OriginHubID": 1,
    "OriginHubName": "Soekarno-Hatta International Airport",
    "OriginHubType": "plane",
    "OriginCityID": 1,
    "OriginCityName": "Jakarta",
    "DestHubID": 3,
    "DestHubName": "Adisutjipto International Airport",
    "DestHubType": "plane",
    "DestCityID": 2,
    "DestCityName": "Yogyakarta"
  }
]
```

#### POST /intercities
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

#### GET /intercities
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

### 5. Public Transport Routing
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/route/:id` | No | Get in-city transport routes to a venue |

#### GET /route/:id
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

### 6. Pickups & Crowd Check-in
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/venue/:id/pickups` | No | List pickup points for a venue |
| `POST` | `/crowdcheckins` | Yes | Check-in at a pickup point |
| `GET` | `/crowdcheckins` | Yes | View your check-in history |
| `GET` | `/crowdcheckins/:id` | Yes | Get single check-in detail |

#### GET /venue/:id/pickups
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

#### POST /crowdcheckins
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

#### GET /crowdcheckins
**Response (200 OK):**
```json
[
  {
    "ID": "550e8400-e29b-41d4-a716-446655440001",
    "CheckInTime": "2023-11-15T19:00:00Z",
    "PickupPointID": 5,
    "PickupPointName": "North Gate Pickup",
    "VenueID": 1,
    "VenueName": "Gelora Bung Karno"
  }
]
```

---

### 7. Dashboard
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/dashboard` | Yes | Get a summary of all user activities |

#### GET /dashboard
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
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Database or server-side issues.

---

## Note for Frontend
- Dates should be sent in **RFC3339** format (e.g., `2023-12-01T14:00:00Z`).
- The `user_id` is automatically extracted from the JWT; you don't need to send it in request bodies for protected routes.
- If you see `login dulu` as an error, it means your token is missing or expired.
