-- =====================================================
-- SEED DATA FOR INDONESIA MUSIC EVENT APP
-- =====================================================

-- 1. USERS (FR-01)
INSERT INTO users (id, email, password, role) VALUES
  (gen_random_uuid(), 'admin@nusantaratix.com', '$2a$10$dummyHashedPasswordForAdmin123', 'Admin'),
  (gen_random_uuid(), 'budi.wijaya@example.com', '$2a$10$dummyHashedPasswordForUser1', 'User'),
  (gen_random_uuid(), 'sari.rahayu@example.com', '$2a$10$dummyHashedPasswordForUser2', 'User'),
  (gen_random_uuid(), 'dimas.p@example.com', '$2a$10$dummyHashedPasswordForUser3', 'User');

-- 2. VENUES (Jakarta & surroundings)
INSERT INTO venues (name, address, latitude, longitude) VALUES
  ('GBK Main Stadium', 'Jl. Gerbang Pemuda No.1, Gelora, Jakarta Pusat', -6.216667, 106.803889),
  ('Beach City International Stadium', 'Jl. Pantai Indah Utara 2, Kapuk Muara, Jakarta Utara', -6.121667, 106.766944),
  ('Ecovention Hall - Ancol', 'Eco Art Park, Ancol, Pademangan, Jakarta Utara', -6.119444, 106.836111),
  ('Ciputra Artpreneur', 'Jl. Prof. Dr. Satrio Kav. 3-5, Kuningan, Jakarta Selatan', -6.226389, 106.820278);

-- 3. CONCERTS with Indonesian artists
INSERT INTO concerts (venue_id, title, artist_name, event_date, description) VALUES
  (1, 'Pestapora 2025 - Jakarta', 'Hindia, Lomba Sihir, Nadin Amizah', '2025-11-15 14:00:00+07', 'Festival musik alternatif terbesar di GBK'),
  (1, 'Raisa LIVE in Concert', 'Raisa Andriana', '2025-12-01 19:30:00+07', 'Solo konser Raisa untuk album terbaru'),
  (2, 'DWP 2025 - Djakarta Warehouse Project', 'Weird Genius, NIKI, Rich Brian', '2025-12-05 16:00:00+07', 'EDM & hip hop festival di BSD'),
  (3, 'Java Jazz 2025 (Festival Aja)', 'Tulus, Maliq & Dssentials', '2025-09-20 18:00:00+07', 'Suasana jazz by the beach'),
  (4, 'Bernadya Album Launch', 'Bernadya', '2025-10-10 20:00:00+07', 'Intimate showcase di Ciputra Artpreneur');

-- 4. TICKETS (FR-02) - prices in IDR
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
  -- Pestapora
  (1, 'Festival (Early Bird)', 350000, 500),
  (1, 'Festival (Presale)', 450000, 1000),
  (1, 'VIP South', 850000, 200),
  -- Raisa
  (2, 'CAT 3', 400000, 800),
  (2, 'CAT 2', 650000, 500),
  (2, 'VIP (Meet & Greet)', 1500000, 50),
  -- DWP
  (3, 'Single Day', 890000, 3000),
  (3, '2-Day Pass', 1550000, 1200),
  -- Java Jazz
  (4, 'Weekend Pass', 1100000, 400),
  (4, 'VIP Jazz Lounge', 2100000, 80),
  -- Bernadya
  (5, 'Bronze', 250000, 150),
  (5, 'Gold (Early Entry)', 420000, 60);

-- 5. HOTELS (FR-03) - near the venues with bintang & facilities
INSERT INTO hotels (name, address, latitude, longitude, price_est, star_rating, facilities) VALUES
  ('Pullman Jakarta Central Park', 'Podomoro City, Letjen S Parman, Tanjung Duren', -6.1719, 106.7921, 1250000, 5, ARRAY['Pool', 'Spa', 'Fitness Center', 'Family Room', 'Restaurant', 'Free WiFi']),
  ('Ashley Hotel Wahid Hasyim', 'Jl. K.H. Wahid Hasyim No.101, Menteng', -6.1857, 106.8272, 850000, 4, ARRAY['Restaurant', 'Fitness', 'Meeting Room', 'Free WiFi']),
  ('Ibis Styles Jakarta Mangga Dua', 'Jl. Pangeran Jayakarta No.70, Mangga Dua', -6.1445, 106.8237, 490000, 3, ARRAY['Restaurant', 'Free WiFi', '24h Front Desk', 'Parking']),
  ('Mercure Convention Center Ancol', 'Jl. Pantai Indah, Ancol, Pademangan', -6.1240, 106.8365, 675000, 4, ARRAY['Pool', 'Conference Hall', 'Kids Playground', 'Sea View']),
  ('Artotel Thamras', 'Jl. Cilandak KKO No.66, Cilandak Barat', -6.2995, 106.7911, 950000, 4, ARRAY['Rooftop Bar', 'Art Gallery', 'Swimming Pool', 'Free WiFi']);

-- 6. PUBLIC TRANSPORT (MRT, Transjakarta, JakLingko)
INSERT INTO transport_routes (mode, route_name, origin_name, destination_id, est_price, est_duration) VALUES
  ('MRT', 'MRT Red Line (Lebak Bulus - Bundaran HI)', 'Bundaran HI Station', 1, 14000, 35),
  ('MRT', 'MRT Red Line + shuttle', 'Lebak Bulus Grab Dropoff', 2, 18000, 55),
  ('TransJakarta', 'Koridor 1 (Blok M - Kota)', 'Halte Monas', 1, 3500, 25),
  ('TransJakarta', 'Koridor 10 (PGC - Tanjung Priok)', 'Ancol Stasiun', 3, 4500, 18),
  ('JakLingko', 'Mikrotrans JAK-74 (Taman Kota - Ancol)', 'Pademangan', 3, 5000, 22),
  ('TransJakarta', 'Koridor 6 (Ragunan - Galunggung)', 'Kuningan', 4, 4500, 12),
  ('MRT', 'MRT + Feeder (Hotel Indonesia - Kuningan)', 'Dukuh Atas BNI', 4, 10000, 20);

-- Geometry paths (mock GeoJSON for frontend maps)
INSERT INTO transport_geometries (route_id, path_json) VALUES
  (1, '{"type":"LineString","coordinates":[[106.827, -6.194],[106.820, -6.200],[106.812, -6.208],[106.803, -6.218]]}'),
  (3, '{"type":"LineString","coordinates":[[106.822, -6.180],[106.815, -6.190],[106.808, -6.205]]}'),
  (7, '{"type":"LineString","coordinates":[[106.828, -6.202],[106.825, -6.210],[106.822, -6.222]]}');

-- 7. PICKUP POINTS & CROWD TRACKING (FR-06)
INSERT INTO pickup_points (venue_id, name, latitude, longitude, max_capacity) VALUES
  (1, 'GBK East Gate - Sisi Timur', -6.2177, 106.8079, 800),
  (1, 'GBK Bus Terminal', -6.2203, 106.8012, 450),
  (2, 'BCI BSD - Dropoff A', -6.1215, 106.7672, 600),
  (3, 'Ancol Lobby Ecovention', -6.1199, 106.8355, 300),
  (4, 'Ciputra Artpreneur Main Entrance', -6.2269, 106.8206, 120);

-- Sample check-in (crowded during concert night)
INSERT INTO crowd_checkins (user_id, pickup_point_id, check_in_time) VALUES
  ((SELECT id FROM users WHERE email = 'budi.wijaya@example.com'), 1, '2025-11-15 18:30:00+07'),
  ((SELECT id FROM users WHERE email = 'sari.rahayu@example.com'), 3, '2025-12-05 19:00:00+07'),
  ((SELECT id FROM users WHERE email = 'dimas.p@example.com'), 2, '2025-11-15 18:45:00+07');

-- 8. ITINERARIES (FR-07) - one complete example for end-to-end testing
INSERT INTO itineraries (
  id, user_id, ticket_id, hotel_id, hotel_check_in, hotel_check_out,
  transport_to_venue, transport_from_venue, out_of_town_transport
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM users WHERE email = 'budi.wijaya@example.com'),
  (SELECT id FROM tickets WHERE concert_id = 1 AND tier = 'Festival (Presale)' LIMIT 1),
  (SELECT id FROM hotels WHERE name = 'Ashley Hotel Wahid Hasyim'),
  '2025-11-15',
  '2025-11-16',
  (SELECT id FROM transport_routes WHERE route_name = 'MRT Red Line (Lebak Bulus - Bundaran HI)' LIMIT 1),
  (SELECT id FROM transport_routes WHERE route_name = 'TransJakarta' LIMIT 1),
  '{"provider": "Traveloka Pesawat", "flight_number": "QZ-812", "origin": "Surabaya (SUB)", "destination": "Jakarta (CGK)", "departure_date": "2025-11-15", "booking_code": "TLO-123XYZ"}'
);

-- Add a second itinerary for a different user (Sari)
INSERT INTO itineraries (
  id, user_id, ticket_id, hotel_id, hotel_check_in, hotel_check_out,
  transport_to_venue, out_of_town_transport
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM users WHERE email = 'sari.rahayu@example.com'),
  (SELECT id FROM tickets WHERE concert_id = 3 AND tier = '2-Day Pass' LIMIT 1),
  (SELECT id FROM hotels WHERE name = 'Pullman Jakarta Central Park'),
  '2025-12-05',
  '2025-12-07',
  (SELECT id FROM transport_routes WHERE mode = 'MRT' AND origin_name LIKE '%Lebak Bulus%' LIMIT 1),
  '{"provider": "KAI Access", "train": "Argo Bromo", "seat": "9A", "from": "Bandung", "to": "Jakarta Gambir", "date": "2025-12-05"}'
);