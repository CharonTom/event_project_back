-- -----------------------------------------------------
-- 1) Utilisateurs
-- -----------------------------------------------------
INSERT INTO `users`
  (`first_name`, `last_name`, `email`,           `phone`,         `password`, `role`,    `created_at`)
VALUES
  ('Alice',       'Martin',    'alice@alice.com', '+33123456789', 'password', 'User',    NOW()),
  ('Bob',         'Dupont',    'bob@bob.com',     '+33987654321', 'password', 'User',    NOW());

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
  (`title`,                 `description`,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       `start_date`,         `end_date`,           `location`,        `city`,    `price`,  `is_premium`, `user_id`, `created_at`,              `image`)
VALUES
  ('Match de football local',   'Venez assister à une confrontation passionnante entre deux équipes de quartier, composées de joueurs amateurs animés par l''esprit de camaraderie et de compétition. Le match se déroulera sur le terrain en herbe du Stade Municipal, où les supporters retrouveront l''ambiance conviviale des jours de grand rendez-vous, avec buvette et animation musicale. C''est l''occasion idéale pour nouer des liens, encourager la relève locale et profiter d''un après-midi sportif en plein air.',       '2025-06-05 15:00:00','2025-06-05 17:00:00','Stade Municipal','Paris',     0.00,     0,            1,         NOW(), '/assets/default.jpg'),
  ('Concert de Jazz',           'Plongez dans l''univers feutré du jazz contemporain avec le quartet de renommée régionale, composé de musiciens chevronnés aux influences variées. Au programme, arrangements inédits de standards américains, improvisations collectives et solos virtuoses qui dévoilent la richesse et la subtilité de chaque instrument. La soirée se poursuivra dans une atmosphère intimiste au Club Le BlueNote, où un éclairage tamisé et une sélection de cocktails maison ajouteront une touche de charme à votre expérience musicale.', '2025-06-10 20:30:00','2025-06-10 23:00:00','Club Le BlueNote','Lyon',     25.50,    0,            1,         NOW(), '/assets/default.jpg'),
  ('Conférence Tech',           'Rejoignez-nous pour une matinée de conférences et d''ateliers dédiée aux dernières avancées en intelligence artificielle. Des experts du secteur présenteront leurs travaux autour du deep learning, des réseaux de neurones et des applications concrètes en santé, finance et industrie. Vous pourrez participer à des séances de questions-réponses, des démonstrations en direct de prototypes innovants et réseauter avec des entrepreneurs et chercheurs venus de toute la région. Un buffet déjeunatoire sera offert pour prolonger les discussions.',         '2025-07-01 09:00:00','2025-07-01 12:00:00','Centre des Congrès','Marseille',0.00,     1,            2,         NOW(), '/assets/default.jpg'),
  ('Tournoi de Tennis',         'Participez à la compétition amateur de tennis en simple et double organisée dans les installations du Club de Tennis, avec des tableaux séparés pour les différentes catégories d’âge. Chaque rencontre se jouera en deux sets gagnants, encadrée par des arbitres officiels. En marge du tournoi, des stands de restauration rapide et des zones de détente seront installés pour les joueurs et spectateurs. Des trophées et médailles récompenseront les vainqueurs, tandis que des sessions d''initiation gratuites seront proposées aux débutants.',           '2025-07-15 08:00:00','2025-07-15 18:00:00','Club de Tennis','Nice',       5.00,     0,            1,         NOW(), '/assets/default.jpg'),
  ('Festival Rock',             'Vivez trois jours de concerts rock en plein air au Parc des Expos, avec une programmation éclectique mêlant groupes locaux et têtes d''affiche nationales. Au menu : guitares saturées, performances scéniques énergiques et ateliers de découverte d''instruments pour les jeunes amateurs. Des food trucks et stands de merchandising seront disponibles tout au long du festival, et un espace camping sera aménagé pour les festivaliers souhaitant prolonger l''aventure. Ambiance garantie, de 14h à 23h chaque jour.',    '2025-08-20 14:00:00','2025-08-22 23:00:00','Parc des Expos','Bordeaux',   75.00,    1,            2,         NOW(), '/assets/default.jpg'),
  ('Atelier Software',          'Ce workshop d''une journée est conçu pour les débutants souhaitant découvrir les fondamentaux de Node.js et TypeScript. À travers des sessions interactives, vous apprendrez à structurer un projet, gérer les dépendances, écrire des types robustes et tester votre code. Encadré par des développeurs expérimentés, cet atelier inclut des exercices pratiques, un support de cours détaillé et des conseils pour monter en compétences rapidement. L''événement se conclura par une séance de questions-réponses ouverte autour d''un café.',      '2025-09-05 10:00:00','2025-09-05 17:00:00','Espace Dev','Toulouse',        0.00,     0,            2,         NOW(), '/assets/default.jpg'),
  ('Exposition Hardware',       'Découvrez le salon dédié aux composants et au DIY électronique au Hall 3, où plus de cinquante exposants présenteront leurs dernières innovations en matière de circuits imprimés, microcontrôleurs et capteurs. Des démonstrations de montage en direct, des ateliers de soudure pour débutants et des conférences sur l''Internet des objets seront organisés tout au long de la journée. Un village makers offrira un espace collaboratif pour tester des prototypes, échanger avec des passionnés et repartir avec des idées pour vos futurs projets.',       '2025-09-12 09:00:00','2025-09-12 18:00:00','Hall 3','Strasbourg',          10.00,    0,            1,         NOW(), '/assets/default.jpg'),
  ('Masterclass Classique',     'Assistez à un concert-débat autour de la musique classique à l''Opéra Royal, animé par un chef d''orchestre et un critique musical renommé. Les artistes interpréteront des extraits de grands compositeurs (Mozart, Beethoven, Debussy), entrecoupés de discussions sur le contexte historique, les techniques d''interprétation et l''influence de ces œuvres sur la musique contemporaine. Les participants pourront poser leurs questions et participer à un cocktail de clôture dans le foyer de l''opéra.',      '2025-10-01 19:00:00','2025-10-01 21:30:00','Opéra Royal','Lille',          40.00,    0,            2,         NOW(), '/assets/default.jpg'),
  ('Hackathon IA',              'Relevez le défi du hackathon de 48 heures dédié à l''intelligence artificielle sur le Campus Tech, où des équipes pluridisciplinaires travailleront sans relâche pour créer une application IA innovante. Mentorats avec des experts, sessions de brainstorming et accès à des ressources cloud seront mis à votre disposition. Les projets seront évalués selon leur originalité, leur faisabilité technique et leur impact potentiel. De nombreux prix seront décernés, dont des bourses de formation, des crédits serveurs et un accompagnement pour un éventuel incubateur.',             '2025-10-15 08:00:00','2025-10-17 08:00:00','Campus Tech','Grenoble',       0.00,     1,            1,         NOW(), '/assets/default.jpg'),
  ('Match de Basketball',       'Ne manquez pas la demi-finale du championnat régional au Palais des Sports, opposant les deux meilleures équipes de la saison. Attendez-vous à une rencontre intense rythmée par des tirs à trois points, des contres spectaculaires et un public en délire. Avant le coup d''envoi, profitez d''une animation musicale et d''une démonstration de dunk. Des stands de restauration rapide et une boutique officielle seront ouverts toute la soirée.',               '2025-11-20 18:00:00','2025-11-20 20:00:00','Palais des Sports','Nantes',    15.00,    0,            2,         NOW(), '/assets/default.jpg');

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
