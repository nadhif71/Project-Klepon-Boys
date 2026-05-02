------------------------------- USERS (FR-01) -------------------------------

-- name: CreateUser :one
-- Used for the registration endpoint. Now returns the 'role'.
INSERT INTO users (
    email, password, role
) VALUES (
    $1, $2, $3
) RETURNING id, email, role, created_at;

-- name: GetUserByEmail :one
-- Used to verify credentials during JWT login. Now fetches 'role' for the payload.
SELECT id, email, password, role, created_at 
FROM users 
WHERE email = $1 LIMIT 1;


------------------------ CONCERTS & TICKETS (FR-02) ------------------------

-- name: ListUpcomingConcerts :many
-- Fetches the feed of concerts. Updated to include artist_name.
SELECT 
    c.id, c.title, c.artist_name, c.event_date, c.description, 
    v.id AS venue_id, v.name AS venue_name, v.latitude, v.longitude
FROM concerts c
JOIN venues v ON c.venue_id = v.id
WHERE c.event_date >= NOW()
ORDER BY c.event_date ASC;

-- name: GetConcert :one
SELECT id, venue_id, title, artist_name, event_date, description 
FROM concerts 
WHERE id = $1 LIMIT 1;

-- name: GetTicketsForConcert :many
-- NEW: Fetches available ticket tiers and stock for a specific concert.
SELECT id, concert_id, tier, price, stock 
FROM tickets 
WHERE concert_id = $1 
ORDER BY price ASC;

-- name: UpdateTicketStock :one
-- NEW: Safely decrements stock during booking to handle the 'Sold Out' requirement.
UPDATE tickets 
SET stock = stock - $2 
WHERE id = $1 AND stock >= $2 
RETURNING id, stock;


-------------------------------- HOTELS (FR-03) --------------------------------

-- name: ListHotels :many
-- Updated to pull the new star_rating and facilities fields.
SELECT id, name, address, latitude, longitude, price_est, star_rating, facilities 
FROM hotels;


------------------------ TRANSPORT ROUTING (FR-05) ------------------------

-- name: GetRoutesForVenue :many
-- Fetches the "Golden Routes" to a specific venue, including the GeoJSON.
SELECT 
    tr.id, tr.mode, tr.route_name, tr.origin_name, 
    tr.est_price, tr.est_duration, 
    tg.path_json
FROM transport_routes tr
LEFT JOIN transport_geometries tg ON tr.id = tg.route_id
WHERE tr.destination_id = $1;


---------------- CROWD TRACKING & PICKUP POINTS (FR-06) ----------------

-- name: ListPickupPointsForVenue :many
-- NEW: Lists pickup points and calculates their current check-in count dynamically.
SELECT 
    p.id, p.name, p.latitude, p.longitude, p.max_capacity,
    (SELECT COUNT(id) FROM crowd_checkins WHERE pickup_point_id = p.id) AS current_count
FROM pickup_points p
WHERE p.venue_id = $1;

-- name: CreateCrowdCheckin :one
-- NEW: Logs a user checking into a pickup point.
INSERT INTO crowd_checkins (
    user_id, pickup_point_id
) VALUES (
    $1, $2
) RETURNING id, check_in_time;


----------------------- ITINERARIES & DASHBOARD (FR-07) -----------------------

-- name: CreateItinerary :one
-- Updated to accept ticket_id, check-in/out dates, and out_of_town JSON transport data.
INSERT INTO itineraries (
    user_id, ticket_id, hotel_id, hotel_check_in, hotel_check_out, 
    transport_to_venue, transport_from_venue, out_of_town_transport
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING id, created_at;

-- name: GetUserItineraries :many
-- The core "All-in-One" query. Completely overhauled to link tickets, dates, and JSON data.
SELECT 
    i.id AS itinerary_id,
    c.title AS concert_title,
    c.artist_name,
    c.event_date,
    v.name AS venue_name,
    t.tier AS ticket_tier,
    h.name AS hotel_name,
    i.hotel_check_in,
    i.hotel_check_out,
    t_to.mode AS transport_to_mode,
    t_to.route_name AS route_to_venue,
    t_from.mode AS transport_from_mode,
    t_from.route_name AS route_from_venue,
    i.out_of_town_transport
FROM itineraries i
JOIN tickets t ON i.ticket_id = t.id
JOIN concerts c ON t.concert_id = c.id
JOIN venues v ON c.venue_id = v.id
LEFT JOIN hotels h ON i.hotel_id = h.id
LEFT JOIN transport_routes t_to ON i.transport_to_venue = t_to.id
LEFT JOIN transport_routes t_from ON i.transport_from_venue = t_from.id
WHERE i.user_id = $1
ORDER BY c.event_date ASC;

-- name: DeleteItinerary :exec
-- Allows users to cancel their plan.
DELETE FROM itineraries
WHERE id = $1 AND user_id = $2;