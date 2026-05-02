
-- 1. Users Table (Updated for FR-01)
CREATE TABLE users (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email      VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password   TEXT NOT NULL,
    role       VARCHAR(50) NOT NULL DEFAULT 'User', 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Venues Table (Unchanged)
CREATE TABLE venues (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     TEXT NOT NULL,
    latitude    DECIMAL(9,6) NOT NULL,
    longitude   DECIMAL(9,6) NOT NULL
);

-- 3. Concerts Table (Updated with Artist)
CREATE TABLE concerts (
    id          SERIAL PRIMARY KEY,
    venue_id    INT REFERENCES venues(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL, -- Added: Artist name from your Todo
    event_date  TIMESTAMPTZ NOT NULL,
    description TEXT
);

-- 4. Tickets Table (New - FR-02)
CREATE TABLE tickets (
    id          SERIAL PRIMARY KEY,
    concert_id  INT REFERENCES concerts(id) ON DELETE CASCADE,
    tier        VARCHAR(100) NOT NULL, -- e.g., 'VIP', 'Festival'
    price       DECIMAL(12,2) NOT NULL,
    stock       INT NOT NULL CHECK (stock >= 0) -- Crucial for 'Sold Out' validation
);

-- 5. Hotels Table (Updated - FR-03)
CREATE TABLE hotels (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     TEXT NOT NULL,
    latitude    DECIMAL(9,6) NOT NULL, -- Enforced NOT NULL for distance sorting
    longitude   DECIMAL(9,6) NOT NULL, -- Enforced NOT NULL for distance sorting
    price_est   DECIMAL(12,2),
    star_rating INT CHECK (star_rating >= 1 AND star_rating <= 5), -- Added: Bintang
    facilities  TEXT[] -- Added: Fasilitas (Stored as an array of strings)
);

-- 6. Public Transport (Unchanged)
CREATE TYPE transport_type AS ENUM ('MRT', 'TransJakarta', 'JakLingko');

CREATE TABLE transport_routes (
    id             SERIAL PRIMARY KEY,
    mode           transport_type NOT NULL,
    route_name     VARCHAR(100) NOT NULL,
    origin_name    VARCHAR(255),
    destination_id INT REFERENCES venues(id),
    est_price      DECIMAL(10,2),
    est_duration   INT 
);

CREATE TABLE transport_geometries (
    id         SERIAL PRIMARY KEY,
    route_id   INT REFERENCES transport_routes(id),
    path_json  JSONB 
);

-- 7. Pick-up Points & Crowd Tracking (New - FR-06)
CREATE TABLE pickup_points (
    id           SERIAL PRIMARY KEY,
    venue_id     INT REFERENCES venues(id) ON DELETE CASCADE,
    name         VARCHAR(255) NOT NULL,
    latitude     DECIMAL(9,6) NOT NULL,
    longitude    DECIMAL(9,6) NOT NULL,
    max_capacity INT NOT NULL -- Configured by Admin for tracking limits
);

CREATE TABLE crowd_checkins (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID REFERENCES users(id) ON DELETE CASCADE,
    pickup_point_id  INT REFERENCES pickup_points(id) ON DELETE CASCADE,
    check_in_time    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Itineraries / Dashboard (Updated - FR-07)
CREATE TABLE itineraries (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id               UUID REFERENCES users(id) ON DELETE CASCADE,
    ticket_id             INT REFERENCES tickets(id), -- Changed from concert_id to track specific tier
    hotel_id              INT REFERENCES hotels(id),
    hotel_check_in        DATE, -- Added: Tanggal check-in
    hotel_check_out       DATE CHECK (hotel_check_out > hotel_check_in), -- Added: Tanggal check-out with validation
    transport_to_venue    INT REFERENCES transport_routes(id),
    transport_from_venue  INT REFERENCES transport_routes(id),
    out_of_town_transport JSONB, -- Added: To store mock Traveloka/KAI booking data (FR-04)
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);