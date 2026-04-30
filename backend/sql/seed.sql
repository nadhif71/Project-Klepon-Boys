-- seed.sql
-- untuk ngisi db
TRUNCATE users, venues, concerts, hotels, transport_routes, transport_geometries, itineraries RESTART IDENTITY CASCADE;

INSERT INTO venues (name, address, latitude, longitude) VALUES
('GBK (Gelora Bung Karno)', 'Jl. Jend. Sudirman No.1, Senayan, Jakarta Pusat', -6.218111, 106.802222),
('JIS (Jakarta International Stadium)', 'Jl. Tanjung Priok, Papanggo, Jakarta Utara', -6.123456, 106.891234),
('The Pallas SCBD', 'Jl. Jend. Sudirman No.27, Senayan, Jakarta Selatan', -6.226111, 106.808333);

INSERT INTO concerts (venue_id, title, event_date, description) VALUES
(1, 'Noah - 30th Anniversary Tour', '2025-05-15 19:00:00+07', 'Band Noah merayakan 30 tahun berkarya dengan konser spesial di GBK'),
(1, 'Dewa 19 - 30 Tahun Berkarya', '2025-06-20 20:00:00+07', 'Konser akbar Dewa 19 dengan bintang tamu spesial'),
(2, 'Blackpink - Born Pink World Tour', '2025-07-10 18:30:00+07', 'Konser Blackpink di Jakarta International Stadium'),
(2, 'Sheila on 7 - Tunggu Aku di Jakarta', '2025-08-05 19:30:00+07', 'Sheila on 7 konser spesial merayakan album terbaru'),
(3, 'Pamungkas - Solo Acoustic', '2025-09-12 20:00:00+07', 'Pamungkas membawakan lagu-lagu hits secara akustik');

INSERT INTO hotels (name, address, latitude, longitude, price_est) VALUES
('Fairmont Jakarta', 'Jl. Asia Afrika No.8, Senayan', -6.226250, 106.801936, 2500000),
('Pullman Jakarta', 'Jl. M.H. Thamrin No.59', -6.193889, 106.822500, 1800000),
('Hotel Santika Premiere', 'Jl. Danau Sunter Utara, Sunter', -6.136667, 106.862778, 850000),
('Mercure Jakarta Pantai Indah Kapuk', 'Jl. Pantai Indah Kapuk', -6.120556, 106.749167, 950000),
('The Ritz-Carlton', 'Jl. Jend. Sudirman No.Kav 52-53', -6.227500, 106.808056, 3500000),
('Alila SCBD', 'Jl. Jend. Sudirman No.Kav 52', -6.226944, 106.807778, 2200000);

INSERT INTO transport_routes (mode, route_name, origin_name, destination_id, est_price, est_duration) VALUES
('MRT', 'MRT Red Line - Lebak Bulus to GBK', 'Lebak Bulus', 1, 14000, 25),
('MRT', 'MRT Red Line - Bundaran HI to GBK', 'Bundaran HI', 1, 5000, 8),
('MRT', 'MRT Red Line - Istora Mandiri to GBK', 'Istora Mandiri', 1, 3000, 5),
('MRT', 'Transit: Senayan to JIS', 'MRT Senayan', 2, 21000, 55);

INSERT INTO transport_routes (mode, route_name, origin_name, destination_id, est_price, est_duration) VALUES
('TransJakarta', 'Koridor 1: Blok M to GBK', 'Blok M', 1, 3500, 15),
('TransJakarta', 'Koridor 9: Pinang Ranti to GBK', 'Pinang Ranti', 1, 4500, 40),
('TransJakarta', 'Koridor 1: Kota to GBK', 'Kota', 1, 3500, 35),
('TransJakarta', 'Koridor 10: Tanjung Priok to JIS', 'Tanjung Priok', 2, 3500, 20),
('TransJakarta', 'Koridor 12: Sunter to JIS', 'Sunter', 2, 3500, 10),
('TransJakarta', 'Koridor 6: Ragunan to SCBD', 'Ragunan', 3, 3500, 30),
('TransJakarta', 'Koridor 1: Blok M to SCBD', 'Blok M', 3, 3500, 12);

INSERT INTO transport_routes (mode, route_name, origin_name, destination_id, est_price, est_duration) VALUES
('JakLingko', 'Feeder GBK - Senayan City Route', 'Senayan City', 1, 5000, 10),
('JakLingko', 'Feeder JIS - Sunter Route', 'Sunter Mall', 2, 5000, 15),
('JakLingko', 'Feeder SCBD - Pacific Place', 'Pacific Place', 3, 5000, 7);

INSERT INTO transport_geometries (route_id, path_json) VALUES
(1, '{"type":"LineString","coordinates":[[106.775833,-6.289167],[106.785000,-6.255000],[106.792222,-6.230000],[106.802222,-6.218111]]}'),
(3, '{"type":"LineString","coordinates":[[106.801111,-6.202500],[106.801944,-6.210000],[106.802222,-6.218111]]}'),
-- TransJakarta GBK route
(5, '{"type":"LineString","coordinates":[[106.804444,-6.243333],[106.803889,-6.227778],[106.802222,-6.218111]]}'),
-- JakLingko GBK
(11, '{"type":"LineString","coordinates":[[106.806389,-6.224167],[106.804167,-6.221111],[106.802222,-6.218111]]}');

INSERT INTO users (email, password, created_at) VALUES
('test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrAJqRqV6VrE.PqJXJoZJj7P5zXQwIu', NOW());

INSERT INTO itineraries (user_id, concert_id, hotel_id, transport_to_venue, transport_from_venue, created_at) VALUES
((SELECT id FROM users WHERE email = 'test@example.com'), 1, 1, 1, 2, NOW()),
((SELECT id FROM users WHERE email = 'test@example.com'), 2, 2, 5, 5, NOW()),
((SELECT id FROM users WHERE email = 'test@example.com'), 3, 3, 8, 9, NOW());

