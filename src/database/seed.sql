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
-- 3) Événements (tous à Lyon, adresses réelles, descriptions enrichies)
-- -----------------------------------------------------
INSERT INTO `events`
  (`title`,                 `description`,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               `start_date`,         `end_date`,           `location`,                                            `city`,    `price`,  `is_premium`, `user_id`, `created_at`,              `image`)
VALUES
  ('Match de football local',
   'Venez assister à une confrontation passionnante entre deux équipes de quartier, composées de joueurs amateurs animés par l\'esprit de camaraderie et de compétition. Le match se déroulera sur le terrain en herbe du Stade de Gerland, qui offre des gradins modernes, un parking gratuit et une buvette proposant des produits locaux. Entre chaque mi-temps, profitez d\'un spectacle de cheerleaders et d\'une tombola dont les bénéfices seront reversés à une association sportive de la région. En fin de journée, une remise de trophées et de médailles récompensera les meilleurs joueurs et offrira un moment convivial pour tous les participants.',
   '2025-06-05 15:00:00','2025-06-05 17:00:00',
   '353 Avenue Pierre de Coubertin',         'Lyon',     0.00,     0,            1,         NOW(), '/assets/default.jpg'),
   
  ('Concert de Jazz',
   'Plongez dans l\'univers feutré du jazz contemporain avec le quartet de renommée régionale, composé de musiciens chevronnés aux influences mêlant standards américains et compositions originales. Le Club Le BlueNote, avec son éclairage tamisé et son acoustique soignée, sera réaménagé pour offrir une proximité rare entre les artistes et le public. Avant le concert, un apéritif accompagné de tapas maison et de cocktails signature vous sera proposé pour entamer la soirée en douceur. Après les solos virtuoses, poursuivez la nuit au bar lounge attenant, où un DJ set jazz-funk prolongera l\'ambiance jusqu\'à minuit.',
   '2025-06-10 20:30:00','2025-06-10 23:00:00',
   '8 Rue Mercière',                       'Lyon',    25.50,    0,            1,         NOW(), '/assets/default.jpg'),
   
  ('Conférence Tech',
   'Rejoignez-nous pour une matinée riche en échanges et en apprentissages, dédiée aux dernières avancées en intelligence artificielle. Au programme : trois keynotes d\'experts reconnus, suivies d\'ateliers pratiques sur le deep learning et les réseaux de neurones appliqués à la santé, la finance et l\'industrie. Chaque session inclut une table ronde interactive, où vous pourrez poser vos questions et débattre des enjeux éthiques et sociétaux. Un buffet déjeunatoire avec options végétariennes et sans gluten permettra de prolonger le réseautage dans une atmosphère conviviale, propice aux rencontres professionnelles.',
   '2025-07-01 09:00:00','2025-07-01 12:00:00',
   '50 Quai Charles de Gaulle',             'Lyon',    0.00,     1,            2,         NOW(), '/assets/default.jpg'),
   
  ('Tournoi de Tennis',
   'Participez à la compétition amicale de tennis en simple et double, ouverte à toutes les catégories d\'âge et niveaux. Organisé au Tennis Club de Lyon, l\'événement propose des tableaux juniors, seniors et vétérans, avec des matchs en deux sets gagnants et un super tie-break en cas d\'égalité. Tout au long de la journée, des arbitres diplômés veilleront au bon déroulement des rencontres, tandis qu\'un village sportif mettra à disposition des kinésithérapeutes et coachs pour conseils et étirements. Pour les débutants, des sessions d\'initiation gratuites seront animées par des entraîneurs, et un food-truck bio proposera salade, wraps et smoothies.',
   '2025-07-15 08:00:00','2025-07-15 18:00:00',
   '23 Avenue Maréchal Foch',               'Lyon',    5.00,     0,            1,         NOW(), '/assets/default.jpg'),
   
  ('Festival Rock',
   'Vivez trois jours de concerts rock en plein air au cœur du Parc de la Tête d\'Or, avec une programmation éclectique mêlant talents locaux et groupes nationaux. Chaque après-midi, des ateliers découverte d\'instruments (guitare, batterie, basse) seront animés par des musiciens professionnels. Le soir, profitez de performances scéniques énergiques sur deux scènes équipées de sonorisation haute définition et de lightshows spectaculaires. Des food trucks variés, un bar à bières artisanales et un espace camping sécurisé sont accessibles aux festivaliers souhaitant prolonger l\'aventure. Animations street art et stands de merchandising complètent l\'expérience.',
   '2025-08-20 14:00:00','2025-08-22 23:00:00',
   'Boulevard des Belges',                  'Lyon',    75.00,    1,            2,         NOW(), '/assets/default.jpg'),
   
  ('Atelier Software',
   'Ce workshop intensif d\'une journée s\'adresse aux développeurs débutants et intermédiaires souhaitant maîtriser les fondamentaux de Node.js et TypeScript. Encadré par des formateurs experts, vous apprendrez à structurer un projet modulaire, gérer les dépendances avec npm, implémenter le typage statique et réaliser des tests unitaires avec Jest. Les sessions alternent exposés théoriques, exercices guidés et travaux pratiques en binôme pour favoriser l\'apprentissage collaboratif. Un support de cours complet, des accès à un dépôt Git privé et un moment networking autour d\'un café et de viennoiseries sont également inclus.',
   '2025-09-05 10:00:00','2025-09-05 17:00:00',
   '47 Quai Rambaud',                       'Lyon',    0.00,     0,            2,         NOW(), '/assets/default.jpg'),
   
  ('Exposition Hardware',
   'Découvrez le salon incontournable des passionnés d\'électronique et de DIY à la Halle Tony Garnier. Plus de cinquante exposants vous présenteront leurs dernières innovations en circuits imprimés, microcontrôleurs et capteurs. Assistez à des démonstrations de montage en direct, participez à des ateliers de soudure pour débutants et suivez des conférences sur l\'Internet des objets et l\'automatisation domestique. Un espace makers collaboratif permettra d\'échanger avec des hobbyistes et experts, tandis qu\'un corner vente proposera composants et kits à emporter. Restauration sur place par food-truck gourmet.',
   '2025-09-12 09:00:00','2025-09-12 18:00:00',
   '20 Place Docteur Charles Riviere',      'Lyon',    10.00,    0,            1,         NOW(), '/assets/default.jpg'),
   
  ('Masterclass Classique',
   'Assistez à un concert-débat exceptionnel à l\'Opéra National de Lyon, animé par le Chef d\'Orchestre Julien Morel et le critique musical Élise Durand. Les artistes vous feront découvrir des extraits de Mozart, Beethoven et Debussy, entrecoupés d\'analyses historiques et techniques. Chaque morceau sera commenté en direct, vous permettant de comprendre les choix d\'interprétation et les subtilités harmoniques. La soirée se conclura par un cocktail VIP dans le foyer, offrant l\'occasion de prolonger les échanges avec les intervenants et les musiciens.',
   '2025-10-01 19:00:00','2025-10-01 21:30:00',
   '1 Place de la Comédie',                 'Lyon',    40.00,    0,            2,         NOW(), '/assets/default.jpg'),
   
  ('Hackathon IA',
   'Relevez le défi du hackathon de 48 heures dédié à l\'intelligence artificielle sur le Campus Région du Numérique. Par équipes pluridisciplinaires, vous développerez des prototypes innovants encadrés par des mentors experts en machine learning, UX design et gestion de projet. Des sessions de brainstorming, des workshops sur l\'accès aux API cloud et des points d\'avancement réguliers rythmeront l\'événement. Les projets seront évalués sur leur originalité, faisabilité et impact social, avec à la clé bourses de formation, crédits serveurs et accompagnement en incubateur. Restauration en continu et zones de repos détente disponibles sur place.',
   '2025-10-15 08:00:00','2025-10-17 08:00:00',
   '35 Rue René Cassin',                    'Lyon',    0.00,     1,            1,         NOW(), '/assets/default.jpg'),
   
  ('Match de Basketball',
   'Ne manquez pas la demi-finale du championnat régional au Palais des Sports de Gerland, opposant les deux meilleures équipes de la saison. Attendez-vous à un spectacle intense, rythmé par des tirs à trois points, des contres spectaculaires et un public en délire. Avant le coup d\'envoi, un groupe local assurera l\'ambiance musicale et un concours de dunk ravira les fans. Des stands de restauration rapide et un shop officiel proposeront snacks, boissons et merchandising toute la soirée. Cérémonie de remise des prix en fin de match.',
   '2025-11-20 18:00:00','2025-11-20 20:00:00',
   '22 Rue Marcel Mérieux',                  'Lyon',    15.00,    0,            2,         NOW(), '/assets/default.jpg');

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
