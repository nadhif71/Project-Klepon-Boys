-- 1. Users Table
CREATE TABLE users (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email             VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password          TEXT NOT NULL,
    role              VARCHAR(50) NOT NULL DEFAULT 'User',
    first_name        VARCHAR(255) NOT NULL DEFAULT '',
    last_name         VARCHAR(255) NOT NULL DEFAULT '',
    reset_token       TEXT,
    reset_token_expiry TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Venues Table
CREATE TABLE venues (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     TEXT NOT NULL,
    latitude    DECIMAL(9,6) NOT NULL,
    longitude   DECIMAL(9,6) NOT NULL,
    image_url   VARCHAR(255),
    description TEXT
);

-- 3. Concerts Table
CREATE TABLE concerts (
    id          SERIAL PRIMARY KEY,
    venue_id    INT REFERENCES venues(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    event_date  TIMESTAMPTZ NOT NULL,
    description TEXT,
    image_url   VARCHAR(255)
    -- Removed: ticket_id (circular ref; tickets reference concerts instead)
);

-- 4. Tickets Table
CREATE TABLE tickets (
    id         SERIAL PRIMARY KEY,
    concert_id INT REFERENCES concerts(id) ON DELETE CASCADE,
    tier       VARCHAR(100) NOT NULL,
    price      DECIMAL(12,2) NOT NULL,
    stock      INT NOT NULL CHECK (stock >= 0)
);

-- 5. Hotels Table
CREATE TABLE hotels (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    address        TEXT NOT NULL,
    latitude       DECIMAL(9,6) NOT NULL,
    longitude      DECIMAL(9,6) NOT NULL,
    price_est      DECIMAL(12,2),
    star_rating    INT CHECK (star_rating >= 1 AND star_rating <= 5),
    facilities     TEXT[],
    images         TEXT[],
    description    TEXT,
    is_recommended BOOLEAN NOT NULL DEFAULT FALSE
);

-- 6. Transport Routes
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
    id       SERIAL PRIMARY KEY,
    route_id INT REFERENCES transport_routes(id),
    path_json JSONB
);

-- 7. Pickup Points & Crowd Tracking
CREATE TABLE pickup_points (
    id           SERIAL PRIMARY KEY,
    venue_id     INT REFERENCES venues(id) ON DELETE CASCADE,
    name         VARCHAR(255) NOT NULL,
    latitude     DECIMAL(9,6) NOT NULL,
    longitude    DECIMAL(9,6) NOT NULL,
    max_capacity INT NOT NULL
);

CREATE TABLE crowd_checkins (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    pickup_point_id INT REFERENCES pickup_points(id) ON DELETE CASCADE,
    check_in_time   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Hotel Bookings (New - replaces hotel fields in itineraries)
CREATE TABLE hotel_bookings (
    id             SERIAL PRIMARY KEY,
    user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
    hotel_id       INT REFERENCES hotels(id),
    check_in_date  DATE NOT NULL,
    check_out_date DATE NOT NULL CHECK (check_out_date > check_in_date),
    status         VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Ticket Orders (New - replaces ticket tracking in itineraries)
CREATE TABLE ticket_orders (
    id         SERIAL PRIMARY KEY,
    user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    ticket_id  INT REFERENCES tickets(id),
    quantity   INT NOT NULL CHECK (quantity > 0),
    status     VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Intercity Transports (New - replaces out_of_town_transport JSONB in itineraries)
CREATE TABLE intercity_transports (
    id             SERIAL PRIMARY KEY,
    user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
    origin_city    VARCHAR(255) NOT NULL,
    transport_mode VARCHAR(100) NOT NULL,
    departure_date DATE NOT NULL,
    return_date    DATE,
    status         VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Cities & Transport Hubs (for transport wizard)
CREATE TABLE cities (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE city_hubs (
    id       SERIAL PRIMARY KEY,
    city_id  INT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    hub_name VARCHAR(255) NOT NULL,
    hub_type VARCHAR(10) NOT NULL CHECK (hub_type IN ('plane', 'train'))
);

CREATE TABLE transport_options (
    id                SERIAL PRIMARY KEY,
    origin_hub_id     INT NOT NULL REFERENCES city_hubs(id),
    destination_hub_id INT NOT NULL REFERENCES city_hubs(id),
    provider_name     VARCHAR(255) NOT NULL,
    price             DECIMAL(12,2) NOT NULL,
    departure_time    TIME NOT NULL,
    arrival_time      TIME NOT NULL,
    class             VARCHAR(100),
    travel_date       DATE NOT NULL
);