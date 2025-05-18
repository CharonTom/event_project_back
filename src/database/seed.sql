-- -----------------------------------------------------
-- 1) Utilisateurs
-- -----------------------------------------------------
INSERT INTO `users`
  (`first_name`, `last_name`, `email`,           `phone`,         `password`, `role`,    `created_at`)
VALUES
  ('Alice',       'Martin',    'user1@test.com', '+33123456789', 'password', 'User',    NOW()),
  ('Bob',         'Dupont',    'user2@test.com', '+33987654321', 'password', 'Admin',   NOW());

-- -----------------------------------------------------
-- 2) Catégories
-- -----------------------------------------------------
-- 2.1 – Catégories parentes
INSERT INTO `categories`
  (`name`,        `parent_category_id`)
VALUES
  ('Sports',      NULL),
  ('Musique',     NULL),
  ('Technologie', NULL);

-- 2.2 – Sous-catégories (3 enfants par parent)
INSERT INTO `categories`
  (`name`,                 `parent_category_id`)
VALUES
  -- Sports
  ('Football',             1),
  ('Basketball',           1),
  ('Tennis',               1),
  -- Musique
  ('Rock',                 2),
  ('Jazz',                 2),
  ('Classique',            2),
  -- Technologie
  ('Software',             3),
  ('Hardware',             3),
  ('Intelligence artificielle', 3);

-- -----------------------------------------------------
-- 3) Événements (avec image par défaut)
-- -----------------------------------------------------
INSERT INTO `events`
  (`title`,                 `description`,                                        `start_date`,         `end_date`,           `location`,        `city`,    `price`,  `is_premium`, `user_id`, `created_at`, `image`)
VALUES
  ('Match de football local',   'Rencontre amicale entre équipes de quartier.',       '2025-06-05 15:00:00','2025-06-05 17:00:00','Stade Municipal','Paris',     0.00,     0,            1,         NOW(), '/assets/default.jpg'),
  ('Concert de Jazz',           'Soirée Jazz avec le quartet de renommée régionale.', '2025-06-10 20:30:00','2025-06-10 23:00:00','Club Le BlueNote','Lyon',     25.50,    0,            1,         NOW(), '/assets/default.jpg'),
  ('Conférence Tech',           'Présentation des dernières avancées en IA.',         '2025-07-01 09:00:00','2025-07-01 12:00:00','Centre des Congrès','Marseille',0.00,     1,            2,         NOW(), '/assets/default.jpg'),
  ('Tournoi de Tennis',         'Compétition amateur en simple et double.',           '2025-07-15 08:00:00','2025-07-15 18:00:00','Club de Tennis','Nice',       5.00,     0,            1,         NOW(), '/assets/default.jpg'),
  ('Festival Rock',             '3 jours de concerts rock en plein air.',             '2025-08-20 14:00:00','2025-08-22 23:00:00','Parc des Expos','Bordeaux',   75.00,    1,            2,         NOW(), '/assets/default.jpg'),
  ('Atelier Software',          'Workshop Node.js & TypeScript pour débutants.',      '2025-09-05 10:00:00','2025-09-05 17:00:00','Espace Dev','Toulouse',        0.00,     0,            2,         NOW(), '/assets/default.jpg'),
  ('Exposition Hardware',       'Salon des composants et du DIY électronique.',       '2025-09-12 09:00:00','2025-09-12 18:00:00','Hall 3','Strasbourg',          10.00,    0,            1,         NOW(), '/assets/default.jpg'),
  ('Masterclass Classique',     'Concert-débat autour de la musique classique.',      '2025-10-01 19:00:00','2025-10-01 21:30:00','Opéra Royal','Lille',          40.00,    0,            2,         NOW(), '/assets/default.jpg'),
  ('Hackathon IA',              '48h pour créer une appli IA innovante.',             '2025-10-15 08:00:00','2025-10-17 08:00:00','Campus Tech','Grenoble',       0.00,     1,            1,         NOW(), '/assets/default.jpg'),
  ('Match de Basketball',       'Demi-finale du championnat régional.',               '2025-11-20 18:00:00','2025-11-20 20:00:00','Palais des Sports','Nantes',    15.00,    0,            2,         NOW(), '/assets/default.jpg');

-- -----------------------------------------------------
-- 4) Liaisons événements ↔ catégories
-- -----------------------------------------------------
INSERT INTO `event_categories`
  (`event_id`, `category_id`)
VALUES
  (1, 4), (1,5),
  (2, 8),
  (3, 12), (3,10),
  (4, 6),
  (5, 7), (5,8),
  (6, 10),
  (7, 11),
  (8, 9),
  (9, 12),
  (10,5);
