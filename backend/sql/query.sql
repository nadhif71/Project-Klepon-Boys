-- ======================== FR-01: AUTH ========================

-- name: CreateUser :one
INSERT INTO users (email, password, role)
VALUES ($1, $2, $3)
RETURNING id, email, role, created_at;

-- name: GetUserByEmail :one
SELECT id, email, password, role, created_at
FROM users
WHERE email = $1
LIMIT 1;


-- =================== FR-02: CONCERTS & TICKETS ===================

-- name: ListUpcomingConcerts :many
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
WHERE id = $1
LIMIT 1;

-- name: GetTicketsForConcert :many
SELECT id, concert_id, tier, price, stock
FROM tickets
WHERE concert_id = $1
ORDER BY price ASC;

-- name: UpdateTicketStock :one
-- Safely decrements stock; only runs if stock is sufficient (handles Sold Out).
UPDATE tickets
SET stock = stock - $2
WHERE id = $1 AND stock >= $2
RETURNING id, stock;

-- name: CreateTicketOrder :one     
INSERT INTO ticket_orders (user_id, ticket_id, quantity, status)
VALUES ($1, $2, $3, $4)
RETURNING id, created_at;

-- name: GetTicketOrdersByUser :many
SELECT
    o.id, o.quantity, o.status, o.created_at,
    t.tier, t.price,
    c.title AS concert_title, c.artist_name, c.event_date,
    v.name AS venue_name
FROM ticket_orders o
JOIN tickets t ON o.ticket_id = t.id
JOIN concerts c ON t.concert_id = c.id
JOIN venues v ON c.venue_id = v.id
WHERE o.user_id = $1
ORDER BY c.event_date ASC;


-- =================== FR-03: HOTELS & BOOKINGS ===================

-- name: ListHotels :many
SELECT id, name, address, latitude, longitude, price_est, star_rating, facilities
FROM hotels;

-- name: GetHotel :one
SELECT id, name, address, latitude, longitude, price_est, star_rating, facilities
FROM hotels
WHERE id = $1
LIMIT 1;

-- name: CreateHotelBooking :one
INSERT INTO hotel_bookings (user_id, hotel_id, check_in_date, check_out_date, status)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, created_at;

-- name: GetHotelBookingsByUser :many
SELECT
    b.id, b.check_in_date, b.check_out_date, b.status, b.created_at,
    h.name AS hotel_name, h.address, h.price_est, h.star_rating
FROM hotel_bookings b
JOIN hotels h ON b.hotel_id = h.id
WHERE b.user_id = $1
ORDER BY b.check_in_date ASC;


-- ================ FR-04: INTERCITY TRANSPORT ================

-- name: CreateIntercityTransport :one
INSERT INTO intercity_transports (user_id, origin_city, transport_mode, departure_date, return_date, status)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, created_at;

-- name: GetIntercityTransportsByUser :many
SELECT id, origin_city, transport_mode, departure_date, return_date, status, created_at
FROM intercity_transports
WHERE user_id = $1
ORDER BY departure_date ASC;


-- =========== FR-05: IN-CITY PUBLIC TRANSPORT ROUTING ===========

-- name: GetRoutesForVenue :many
SELECT
    tr.id, tr.mode, tr.route_name, tr.origin_name,
    tr.est_price, tr.est_duration,
    tg.path_json
FROM transport_routes tr
LEFT JOIN transport_geometries tg ON tr.id = tg.route_id
WHERE tr.destination_id = $1;


-- =========== FR-06: PICKUP POINTS & CROWD TRACKING ===========

-- name: ListPickupPointsForVenue :many
SELECT
    p.id, p.name, p.latitude, p.longitude, p.max_capacity,
    (SELECT COUNT(id) FROM crowd_checkins WHERE pickup_point_id = p.id) AS current_count
FROM pickup_points p
WHERE p.venue_id = $1;

-- name: CreateCrowdCheckin :one
INSERT INTO crowd_checkins (user_id, pickup_point_id)
VALUES ($1, $2)
RETURNING id, check_in_time;


-- =================== FR-07: DASHBOARD ===================

-- name: GetUserDashboard :many
-- Fetches all active bookings for a user, ordered by concert date.
-- Used to power the unified dashboard view.
SELECT
    o.id AS ticket_order_id,
    c.title AS concert_title,
    c.artist_name,
    c.event_date,
    v.name AS venue_name,
    t.tier AS ticket_tier,
    o.status AS ticket_status,
    h.name AS hotel_name,
    b.check_in_date,
    b.check_out_date,
    it.transport_mode AS intercity_mode,
    it.departure_date,
    it.return_date
FROM ticket_orders o
JOIN tickets t ON o.ticket_id = t.id
JOIN concerts c ON t.concert_id = c.id
JOIN venues v ON c.venue_id = v.id
LEFT JOIN hotel_bookings b ON b.user_id = o.user_id
LEFT JOIN hotels h ON b.hotel_id = h.id
LEFT JOIN intercity_transports it ON it.user_id = o.user_id
WHERE o.user_id = $1
ORDER BY c.event_date ASC;