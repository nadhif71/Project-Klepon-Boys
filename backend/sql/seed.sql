-- =====================================================
-- SEED DATA FOR DATABASE TESTING (Indonesia Edition)
-- =====================================================

-- 1. Users (3 rows)
INSERT INTO users (id, email, password, role, first_name, last_name, created_at) VALUES
    (gen_random_uuid(), 'budi.wijaya@email.com', '$2a$10$encrypted_password_hash_here', 'User', 'Budi', 'Wijaya', NOW()),
    (gen_random_uuid(), 'sari.dewi@email.com', '$2a$10$encrypted_password_hash_here', 'Admin', 'Sari', 'Dewi', NOW()),
    (gen_random_uuid(), 'agus.santoso@email.com', '$2a$10$encrypted_password_hash_here', 'User', 'Agus', 'Santoso', NOW());

-- 2. Venues (3 rows - Indonesian concert venues)
INSERT INTO venues (name, address, latitude, longitude, image_url, description) VALUES
    ('GBK Stadium', 'Jl. Pintu Satu Senayan, Jakarta Pusat, DKI Jakarta 10270', -6.218620, 106.802620, 'https://images.unsplash.com/photo-1576485290814-1c72a34c2bb2?w=800', 'Stadion utama Gelora Bung Karno, venue olahraga dan konser terbesar di Indonesia'),
    ('Eco Park Hall', 'Pantai Indah Kapuk, Jakarta Utara, DKI Jakarta 14460', -6.116420, 106.721540, 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800', 'Hall modern di kawasan Pantai Indah Kapuk dengan kapasitas 5000 orang'),
    ('Civic Center Hall', 'Jl. Raya Juanda No.12, Bandung, Jawa Barat 40116', -6.906070, 107.619120, 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', 'Gedung serbaguna di pusat kota Bandung');

-- 3. Concerts (3 rows - Indonesian artists)
INSERT INTO concerts (venue_id, title, artist_name, event_date, description, image_url) VALUES
    (1, 'Dangdut Nasional 2025', 'Via Vallen', '2025-07-15 19:00:00+07', 'Konser akbar dangdut Indonesia dengan bintang tamu spesial', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'),
    (2, 'Jazz PIK Festival', 'Andmesh Kamaleng', '2025-08-20 20:00:00+07', 'Malam jazz romantis dengan artist terkenal Indonesia', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'),
    (3, 'Pop Sunda Live', 'Mawar de Jongh', '2025-09-10 18:30:00+07', 'Konser musik pop Sunda di kota kembang Bandung', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800');

-- 4. Tickets (3 rows per concert - tiered pricing)
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
    (1, 'VIP (Tribune Barat)', 1250000.00, 500),
    (1, 'Festival (Tribune Timur)', 750000.00, 2000),
    (1, 'Economy (Gate C)', 350000.00, 5000);
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
    (2, 'VIP Indoor', 1500000.00, 100),
    (2, 'Outdoor Festival', 850000.00, 800),
    (2, 'Early Bird', 450000.00, 1500);
INSERT INTO tickets (concert_id, tier, price, stock) VALUES
    (3, 'Platinum', 950000.00, 150),
    (3, 'Gold', 550000.00, 400),
    (3, 'Silver', 250000.00, 1000);

-- 5. Hotels (3 rows - near concert venues)
INSERT INTO hotels (name, address, latitude, longitude, price_est, star_rating, facilities, images, description, is_recommended) VALUES
    ('Hotel Mulia Senayan', 'Jl. Asia Afrika No.8, Senayan, Jakarta Pusat', -6.222370, 106.803920, 1800000.00, 5, ARRAY[''Swimming Pool'', ''Spa'', ''Restaurant'', ''Free WiFi'', ''Parking''], ARRAY[''https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'', ''https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800''], ''Hotel bintang 5 mewah di kawasan Senayan, dekat dengan GBK Stadium'', TRUE),
    ('Fairmont Jakarta', 'Jl. Asia Afrika No.8, Gelora, Jakarta Pusat', -6.220010, 106.803630, 2200000.00, 5, ARRAY[''Sky Pool'', ''Gym'', ''Fine Dining'', ''Ballroom''], ARRAY[''https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800''], ''Hotel internasional dengan pemandangan kota Jakarta yang spektakuler'', TRUE),
    ('Padma Hotel Bandung', 'Jl. Ranca Bentang No.56, Ciumbuleuit, Bandung', -6.873010, 107.601200, 1200000.00, 4, ARRAY[''Infinity Pool'', ''Spa'', ''Kids Club'', ''Restaurant''], ARRAY[''https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800''], ''Hotel resort di dataran tinggi Bandung dengan pemandangan gunung'', FALSE);

-- 6. Transport Routes (3 rows - MRT, TransJakarta, JakLingko)
INSERT INTO transport_routes (mode, route_name, origin_name, destination_id, est_price, est_duration) VALUES
    (''MRT'', ''MRT Jakarta Lebak Bulus - Bundaran HI'', ''Lebak Bulus Station'', 1, 14000.00, 35),
    (''TransJakarta'', ''Koridor 1 (Blok M - Kota)'', ''Blok M Shelter'', 1, 3500.00, 45),
    (''JakLingko'', ''Mikrotrans Jak Lingko JAK-13'', ''Tanah Abang Station'', 2, 5000.00, 25);

INSERT INTO transport_geometries (route_id, path_json) VALUES
    (1, ''{"type": "LineString", "coordinates": [[106.802620, -6.218620], [106.810000, -6.200000], [106.820000, -6.190000]]}''),
    (2, ''{"type": "LineString", "coordinates": [[106.802620, -6.218620], [106.800000, -6.210000], [106.795000, -6.195000]]}''),
    (3, ''{"type": "LineString", "coordinates": [[106.721540, -6.116420], [106.730000, -6.110000], [106.740000, -6.100000]]}'');

-- 7. Pickup Points (3 rows - near venues)
INSERT INTO pickup_points (venue_id, name, latitude, longitude, max_capacity) VALUES
    (1, ''GBK Main Gate Shuttle'', -6.218600, 106.802700, 200),
    (1, ''Plaza Senayan Pickup Point'', -6.223500, 106.800500, 150),
    (2, ''PIK Avenue Meeting Point'', -6.119500, 106.725500, 100);

INSERT INTO crowd_checkins (id, user_id, pickup_point_id, check_in_time) VALUES
    (gen_random_uuid(), (SELECT id FROM users LIMIT 1), 1, NOW()),
    (gen_random_uuid(), (SELECT id FROM users LIMIT 1 OFFSET 1), 2, NOW()),
    (gen_random_uuid(), (SELECT id FROM users LIMIT 1 OFFSET 2), 1, NOW());

-- 8. Hotel Bookings (3 rows)
INSERT INTO hotel_bookings (user_id, hotel_id, check_in_date, check_out_date, status, created_at) VALUES
    ((SELECT id FROM users LIMIT 1), 1, ''2025-07-14'', ''2025-07-16'', ''confirmed'', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 1), 2, ''2025-08-19'', ''2025-08-21'', ''pending'', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 2), 3, ''2025-09-09'', ''2025-09-11'', ''confirmed'', NOW());

-- 9. Ticket Orders (3 rows)
INSERT INTO ticket_orders (user_id, ticket_id, quantity, status, created_at) VALUES
    ((SELECT id FROM users LIMIT 1), 1, 2, ''confirmed'', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 1), 4, 1, ''pending'', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 2), 7, 3, ''confirmed'', NOW());

-- 10. Intercity Transports (3 rows)
INSERT INTO intercity_transports (user_id, origin_city, transport_mode, departure_date, return_date, status, created_at) VALUES
    ((SELECT id FROM users LIMIT 1), ''Surabaya'', ''Kereta Api Argo Semeru'', ''2025-07-15'', ''2025-07-16'', ''confirmed'', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 1), ''Bali'', ''Garuda Indonesia Flight'', ''2025-08-20'', ''2025-08-22'', ''pending'', NOW()),
    ((SELECT id FROM users LIMIT 1 OFFSET 2), ''Yogyakarta'', ''Bus DAMRI'', ''2025-09-10'', ''2025-09-12'', ''confirmed'', NOW());

-- 11. Cities
INSERT INTO cities (name) VALUES
    (''Jakarta''),
    (''Yogyakarta''),
    (''Surabaya'');

-- 12. City Hubs
INSERT INTO city_hubs (city_id, hub_name, hub_type) VALUES
    (1, ''Soekarno-Hatta International Airport'', ''plane''),
    (1, ''Gambir Station'', ''train''),
    (2, ''Adisutjipto International Airport'', ''plane''),
    (2, ''Tugu Station'', ''train''),
    (3, ''Juanda International Airport'', ''plane''),
    (3, ''Gubeng Station'', ''train'');

-- 13. Transport Options
INSERT INTO transport_options (origin_hub_id, destination_hub_id, provider_name, price, departure_time, arrival_time, class, travel_date) VALUES
    (1, 3, ''Garuda Indonesia'', 850000.00, ''06:00:00'', ''07:30:00'', ''Economy'', ''2025-07-15''),
    (1, 3, ''Lion Air'', 450000.00, ''08:00:00'', ''09:15:00'', ''Economy'', ''2025-07-15''),
    (1, 3, ''Batik Air'', 650000.00, ''14:00:00'', ''15:30:00'', ''Economy'', ''2025-07-15''),
    (2, 4, ''Kereta Api Argo Semeru'', 350000.00, ''07:00:00'', ''13:00:00'', ''Executive'', ''2025-07-15''),
    (2, 4, ''Kereta Api Taksaka'', 280000.00, ''20:00:00'', ''02:00:00'', ''Business'', ''2025-07-15''),
    (5, 1, ''Citilink'', 550000.00, ''09:00:00'', ''10:30:00'', ''Economy'', ''2025-08-20'');
