-- ======================== FR-01: AUTH ========================

-- name: CreateUser :one
INSERT INTO users (email, password, role, first_name, last_name)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, email, role, created_at, first_name, last_name;

-- name: GetUserByEmail :one
SELECT id, email, password, role, created_at, first_name, last_name
FROM users
WHERE email = $1
LIMIT 1;


-- =================== FR-02: CONCERTS & TICKETS ===================

-- name: ListUpcomingConcerts :many
SELECT
    c.id, c.title, c.artist_name, c.event_date, c.description, c.image_url,
    v.id AS venue_id, v.name AS venue_name, v.address AS venue_address, v.latitude, v.longitude, v.image_url AS venue_image_url
FROM concerts c
JOIN venues v ON c.venue_id = v.id
WHERE c.event_date >= NOW()
ORDER BY c.event_date ASC;

-- name: CreateConcert :one
INSERT INTO concerts (venue_id, title, artist_name, event_date, description, image_url)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, venue_id, title, artist_name, event_date, description, image_url;

-- name: GetConcert :one
SELECT id, venue_id, title, artist_name, event_date, description, image_url
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
SELECT id, name, address, latitude, longitude, price_est, star_rating, facilities, images, description, is_recommended
FROM hotels;

-- name: GetHotel :one
SELECT id, name, address, latitude, longitude, price_est, star_rating, facilities, images, description, is_recommended
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


-- ================ FR-08: VENUES ================

-- name: ListVenues :many
SELECT id, name, address, latitude, longitude, image_url, description
FROM venues;

-- name: GetVenue :one
SELECT id, name, address, latitude, longitude, image_url, description
FROM venues
WHERE id = $1
LIMIT 1;

-- ============== FR-09: CITIES & TRANSPORT HUBS ==============

-- name: ListCities :many
SELECT id, name
FROM cities;

-- name: GetCity :one
SELECT id, name
FROM cities
WHERE id = $1
LIMIT 1;

-- name: GetCityHubs :many
SELECT id, city_id, hub_name, hub_type
FROM city_hubs
WHERE city_id = $1;

-- name: ListTransportOptions :many
SELECT
    topt.id, topt.provider_name, topt.price, topt.departure_time, topt.arrival_time, topt.class, topt.travel_date,
    oh.id AS origin_hub_id, oh.hub_name AS origin_hub_name, oh.hub_type AS origin_hub_type,
    oc.id AS origin_city_id, oc.name AS origin_city_name,
    dh.id AS dest_hub_id, dh.hub_name AS dest_hub_name, dh.hub_type AS dest_hub_type,
    dc.id AS dest_city_id, dc.name AS dest_city_name
FROM transport_options topt
JOIN city_hubs oh ON topt.origin_hub_id = oh.id
JOIN cities oc ON oh.city_id = oc.id
JOIN city_hubs dh ON topt.destination_hub_id = dh.id
JOIN cities dc ON dh.city_id = dc.id
WHERE ($1::int = 0 OR oh.id = $1::int)
  AND ($2::int = 0 OR dh.id = $2::int)
ORDER BY topt.departure_time ASC;

-- ========== FR-10: INDIVIDUAL BOOKING DETAILS ==========

-- name: GetHotelBookingByID :one
SELECT
    b.id, b.check_in_date, b.check_out_date, b.status, b.created_at,
    h.id AS hotel_id, h.name AS hotel_name, h.address, h.price_est, h.star_rating, h.images, h.description
FROM hotel_bookings b
JOIN hotels h ON b.hotel_id = h.id
WHERE b.id = $1
LIMIT 1;

-- name: GetTicketOrderByID :one
SELECT
    o.id, o.quantity, o.status, o.created_at,
    t.id AS ticket_id, t.tier, t.price,
    c.id AS concert_id, c.title AS concert_title, c.artist_name, c.event_date, c.image_url AS concert_image_url,
    v.id AS venue_id, v.name AS venue_name
FROM ticket_orders o
JOIN tickets t ON o.ticket_id = t.id
JOIN concerts c ON t.concert_id = c.id
JOIN venues v ON c.venue_id = v.id
WHERE o.id = $1
LIMIT 1;

-- name: GetIntercityByID :one
SELECT id, user_id, origin_city, transport_mode, departure_date, return_date, status, created_at
FROM intercity_transports
WHERE id = $1
LIMIT 1;

-- ============== FR-11: CROWD CHECK-INS ==============

-- name: ListCrowdCheckins :many
SELECT
    cc.id, cc.check_in_time,
    pp.id AS pickup_point_id, pp.name AS pickup_point_name,
    v.id AS venue_id, v.name AS venue_name
FROM crowd_checkins cc
JOIN pickup_points pp ON cc.pickup_point_id = pp.id
JOIN venues v ON pp.venue_id = v.id
WHERE cc.user_id = $1
ORDER BY cc.check_in_time DESC;

-- name: GetCrowdCheckin :one
SELECT
    cc.id, cc.check_in_time,
    pp.id AS pickup_point_id, pp.name AS pickup_point_name,
    v.id AS venue_id, v.name AS venue_name
FROM crowd_checkins cc
JOIN pickup_points pp ON cc.pickup_point_id = pp.id
JOIN venues v ON pp.venue_id = v.id
WHERE cc.id = $1
LIMIT 1;

-- ============== FR-12: PASSWORD RESET ==============

-- name: UpdateUserResetToken :exec
UPDATE users
SET reset_token = $2, reset_token_expiry = $3
WHERE email = $1;

-- name: GetUserByResetToken :one
SELECT id, email, password, role, created_at, first_name, last_name, reset_token, reset_token_expiry
FROM users
WHERE reset_token = $1
LIMIT 1;

-- name: UpdateUserPassword :exec
UPDATE users
SET password = $2, reset_token = NULL, reset_token_expiry = NULL
WHERE id = $1;

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