CREATE TABLE users (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email      VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password   TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE venues (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     TEXT NOT NULL,
    latitude    DECIMAL(9,6) NOT NULL,
    longitude   DECIMAL(9,6) NOT NULL
);

-- todo: nama artis
CREATE TABLE concerts (
    id          SERIAL PRIMARY KEY,
    venue_id    INT REFERENCES venues(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    event_date  TIMESTAMPTZ NOT NULL,
    description TEXT
);

CREATE TABLE hotels (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     TEXT NOT NULL,
    latitude    DECIMAL(9,6),
    longitude   DECIMAL(9,6),
    price_est   DECIMAL(12,2) -- Mocked for MVP 
);

CREATE TYPE transport_type AS ENUM ('MRT', 'TransJakarta', 'JakLingko');

CREATE TABLE transport_routes (
    id             SERIAL PRIMARY KEY,
    mode           transport_type NOT NULL,
    route_name     VARCHAR(100) NOT NULL,
    origin_name    VARCHAR(255),
    destination_id INT REFERENCES venues(id), -- Route heading to/from venue
    est_price      DECIMAL(10,2),
    est_duration   INT -- in minutes
);

CREATE TABLE transport_geometries (
    id SERIAL PRIMARY KEY,
    route_id INT REFERENCES transport_routes(id),
    path_json JSONB -- Stores the GeoJSON linestring
);

-- connecting ticket, transport, and hotel
CREATE TABLE itineraries (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id               UUID REFERENCES users(id) ON DELETE CASCADE,
    concert_id            INT REFERENCES concerts(id),
    hotel_id              INT REFERENCES hotels(id),
    transport_to_venue    INT REFERENCES transport_routes(id),
    transport_from_venue  INT REFERENCES transport_routes(id),
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
)