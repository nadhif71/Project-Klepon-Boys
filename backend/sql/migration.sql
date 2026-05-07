-- =====================================================
-- MIGRATION: Add missing columns and tables
-- Run this against the Supabase production database
-- =====================================================

-- 1. Users: add name fields + password reset fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMPTZ;

-- 2. Venues: add image + description
ALTER TABLE venues ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. Concerts: add poster image
ALTER TABLE concerts ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);

-- 4. Hotels: add gallery images, description, recommended flag
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN NOT NULL DEFAULT FALSE;

-- 5. New tables: cities, hubs, transport options
CREATE TABLE IF NOT EXISTS cities (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS city_hubs (
    id       SERIAL PRIMARY KEY,
    city_id  INT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    hub_name VARCHAR(255) NOT NULL,
    hub_type VARCHAR(10) NOT NULL CHECK (hub_type IN ('plane', 'train'))
);

CREATE TABLE IF NOT EXISTS transport_options (
    id                 SERIAL PRIMARY KEY,
    origin_hub_id      INT NOT NULL REFERENCES city_hubs(id),
    destination_hub_id INT NOT NULL REFERENCES city_hubs(id),
    provider_name      VARCHAR(255) NOT NULL,
    price              DECIMAL(12,2) NOT NULL,
    departure_time     TIME NOT NULL,
    arrival_time       TIME NOT NULL,
    class              VARCHAR(100),
    travel_date        DATE NOT NULL
);
