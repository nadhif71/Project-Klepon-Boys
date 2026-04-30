------------------------------- users

-- name: CreateUser :one
-- Used for the registration endpoint.
INSERT INTO users (
    email, password
) VALUES (
    $1, $2
) RETURNING id, email, created_at;

-- name: GetUserByEmail :one
-- Used to verify credentials during JWT login.
SELECT id, email, password, created_at 
FROM users 
WHERE email = $1 LIMIT 1;


------------------------ concert and venues

-- name: ListUpcomingConcerts :many
-- Fetches the feed of concerts along with their venue details.
SELECT 
    c.id, c.title, c.event_date, c.description, 
    v.id AS venue_id, v.name AS venue_name, v.latitude, v.longitude
FROM concerts c
JOIN venues v ON c.venue_id = v.id
WHERE c.event_date >= NOW()
ORDER BY c.event_date ASC;

-- name: GetConcert :one
SELECT id, venue_id, title, event_date, description 
FROM concerts 
WHERE id = $1 LIMIT 1;

------------------------------------------ hotels

-- name: ListHotels :many
SELECT id, name, address, latitude, longitude, price_est 
FROM hotels;

---------------------------------------------- transport routing
-- name: GetRoutesForVenue :many
-- Fetches the "Golden Routes" to a specific venue, including the GeoJSON 
SELECT 
    tr.id, tr.mode, tr.route_name, tr.origin_name, 
    tr.est_price, tr.est_duration, 
    tg.path_json
FROM transport_routes tr
LEFT JOIN transport_geometries tg ON tr.id = tg.route_id
WHERE tr.destination_id = $1;

-------------------------------------------- itineraries

-- name: CreateItinerary :one
-- Links the user's choices into a single record.
INSERT INTO itineraries (
    user_id, concert_id, hotel_id, transport_to_venue, transport_from_venue
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING id, created_at;

-- name: GetUserItineraries :many
-- The core "All-in-One" query. Joins all related tables to return a complete 
-- dashboard view of the user's plan.
SELECT 
    i.id AS itinerary_id,
    c.title AS concert_title,
    c.event_date,
    v.name AS venue_name,
    h.name AS hotel_name,
    t_to.mode AS transport_to_mode,
    t_to.route_name AS route_to_venue,
    t_from.mode AS transport_from_mode,
    t_from.route_name AS route_from_venue
FROM itineraries i
JOIN concerts c ON i.concert_id = c.id
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