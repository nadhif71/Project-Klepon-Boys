-- =====================================================
-- SEED DATA FOR DATABASE TESTING (Indonesia Edition)
-- =====================================================

-- 1. Users (3 rows)
INSERT INTO users (id, email, password, role, created_at) VALUES
    (gen_random_uuid(), 'budi.wijaya@email.com', '$2a$10$encrypted_password_hash_here', 'User', NOW()),
    (gen_random_uuid(), 'sari.dewi@email.com', '$2a$10$encrypted_password_hash_here', 'Admin', NOW()),
    (gen_random_uuid(), 'agus.santoso@email.com', '$2a$10$encrypted_password_hash_here', 'User', NOW());

-- 2. Venues (3 rows - Indonesian concert venues)
INSERT INTO venues (name, address, latitude, longitude) VALUES
    ('GBK Stadium', 'Jl. Pintu Satu Senayan, Jakarta Pusat, DKI Jakarta 10270', -6.218620, 106.802620),
    ('Eco Park Hall', 'Pantai Indah Kapuk, Jakarta Utara, DKI Jakarta 14460', -6.116420, 106.721540),
    ('Civic Center Hall', 'Jl. Raya Juanda No.12, Bandung, Jawa Barat 40116', -6.906070, 107.619120);

-- 3. Concerts (3 rows - Indonesian artists)
INSERT INTO concerts (venue_id, title, artist_name, event_date, description) VALUES
    (1, 'Dangdut Nasional 2025', 'Via Vallen', '2025-07-15 19:00:00+07', 'Konser akbar dangdut Indonesia dengan bintang tamu spesial'),
    (2, 'Jazz PIK Festival', 'Andmesh Kamaleng', '2025-08-20 20:00:00+07', 'Malam jazz romantis dengan artist terkenal Indonesia'),
    (3, 'Pop Sunda Live', 'Mawar de Jongh', '2025-09-10 18:30:00+07', 'Konser musik pop Sunda di kota kembang Bandung');

-- 4. Tickets (3 rows per concert - tiered pricing)
-- Untuk Concert 1: GBK Stadium (concert_id = 1)
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
    (1, 'VIP (Tribune Barat)', 1250000.00, 500),
    (1, 'Festival (Tribune Timur)', 750000.00, 2000),
    (1, 'Economy (Gate C)', 350000.00, 5000);
-- Untuk Concert 2: Jazz PIK (concert_id = 2)
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
    (2, 'VIP Indoor', 1500000.00, 100),
    (2, 'Outdoor Festival', 850000.00, 800),
    (2, 'Early Bird', 450000.00, 1500);
-- Untuk Concert 3: Pop Sunda (concert_id = 3)
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
    (3, 'Platinum', 950000.00, 150),
    (3, 'Gold', 550000.00, 400),
    (3, 'Silver', 250000.00, 1000);

-- 5. Hotels (3 rows - near concert venues)
INSERT INTO hotels (name, address, latitude, longitude, price_est, star_rating, facilities) VALUES
    ('Hotel Mulia Senayan', 'Jl. Asia Afrika No.8, Senayan, Jakarta Pusat', -6.222370, 106.803920, 1800000.00, 5, ARRAY['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Parking']),
    ('Fairmont Jakarta', 'Jl. Asia Afrika No.8, Gelora, Jakarta Pusat', -6.220010, 106.803630, 2200000.00, 5, ARRAY['Sky Pool', 'Gym', 'Fine Dining', 'Ballroom']),
    ('Padma Hotel Bandung', 'Jl. Ranca Bentang No.56, Ciumbuleuit, Bandung', -6.873010, 107.601200, 1200000.00, 4, ARRAY['Infinity Pool', 'Spa', 'Kids Club', 'Restaurant']);

-- 6. Transport Routes (3 rows - MRT, TransJakarta, JakLingko)
INSERT INTO transport_routes (mode, route_name, origin_name, destination_id, est_price, est_duration) VALUES
    ('MRT', 'MRT Jakarta Lebak Bulus - Bundaran HI', 'Lebak Bulus Station', 1, 14000.00, 35),
    ('TransJakarta', 'Koridor 1 (Blok M - Kota)', 'Blok M Shelter', 1, 3500.00, 45),
    ('JakLingko', 'Mikrotrans Jak Lingko JAK-13', 'Tanah Abang Station', 2, 5000.00, 25);

-- Transport Geometries (matching route_ids above)
INSERT INTO transport_geometries (route_id, path_json) VALUES
    (1, '{"type": "LineString", "coordinates": [[106.802620, -6.218620], [106.810000, -6.200000], [106.820000, -6.190000]]}'),
    (2, '{"type": "LineString", "coordinates": [[106.802620, -6.218620], [106.800000, -6.210000], [106.795000, -6.195000]]}'),
    (3, '{"type": "LineString", "coordinates": [[106.721540, -6.116420], [106.730000, -6.110000], [106.740000, -6.100000]]}');

-- 7. Pickup Points (3 rows - near venues)
INSERT INTO pickup_points (venue_id, name, latitude, longitude, max_capacity) VALUES
    (1, 'GBK Main Gate Shuttle', -6.218600, 106.802700, 200),
    (1, 'Plaza Senayan Pickup Point', -6.223500, 106.800500, 150),
    (2, 'PIK Avenue Meeting Point', -6.119500, 106.725500, 100);

-- Crowd Checkins (3 sample check-ins)
INSERT INTO crowd_checkins (id, user_id, pickup_point_id, check_in_time) VALUES
    (gen_random_uuid(), (SELECT id FROM users LIMIT 1), 1, NOW()),
    (gen_random_uuid(), (SELECT id FROM users LIMIT 1 OFFSET 1), 2, NOW()),
    (gen_random_uuid(), (SELECT id FROM users LIMIT 1 OFFSET 2), 1, NOW());

-- 8. Hotel Bookings (3 rows)
INSERT INTO hotel_bookings (user_id, hotel_id, check_in_date, check_out_date, status, created_at) VALUES
    ((SELECT id FROM users LIMIT 1), 1, '2025-07-14', '2025-07-16', 'confirmed', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 1), 2, '2025-08-19', '2025-08-21', 'pending', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 2), 3, '2025-09-09', '2025-09-11', 'confirmed', NOW());

-- 9. Ticket Orders (3 rows)
INSERT INTO ticket_orders (user_id, ticket_id, quantity, status, created_at) VALUES
    ((SELECT id FROM users LIMIT 1), 1, 2, 'confirmed', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 1), 4, 1, 'pending', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 2), 7, 3, 'confirmed', NOW());

-- 10. Intercity Transports (3 rows - arrivals from various Indonesian cities)
INSERT INTO intercity_transports (user_id, origin_city, transport_mode, departure_date, return_date, status, created_at) VALUES
    ((SELECT id FROM users LIMIT 1), 'Surabaya', 'Kereta Api Argo Semeru', '2025-07-15', '2025-07-16', 'confirmed', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 1), 'Bali', 'Garuda Indonesia Flight', '2025-08-20', '2025-08-22', 'pending', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 2), 'Yogyakarta', 'Bus DAMRI', '2025-09-10', '2025-09-12', 'confirmed', NOW());

-- =====================================================
-- VERIFICATION QUERIES (Optional - uncomment to test)
-- =====================================================
-- SELECT 'Users:' as Table, COUNT(*) as Rows FROM users UNION ALL
-- SELECT 'Venues:', COUNT(*) FROM venues UNION ALL
-- SELECT 'Concerts:', COUNT(*) FROM concerts UNION ALL
-- SELECT 'Tickets:', COUNT(*) FROM tickets UNION ALL
-- SELECT 'Hotels:', COUNT(*) FROM hotels UNION ALL
-- SELECT 'Transport Routes:', COUNT(*) FROM transport_routes UNION ALL
-- SELECT 'Pickup Points:', COUNT(*) FROM pickup_points UNION ALL
-- SELECT 'Hotel Bookings:', COUNT(*) FROM hotel_bookings UNION ALL
-- SELECT 'Ticket Orders:', COUNT(*) FROM ticket_orders UNION ALL
-- SELECT 'Intercity Transports:', COUNT(*) FROM intercity_transports;