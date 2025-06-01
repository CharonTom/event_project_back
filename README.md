# EVENTLY

EVENTLY est une application web de gestion d’événements développée dans le cadre d’un projet de fin d’année. Cette README décrit toutes les étapes nécessaires pour cloner, configurer et démarrer l’application en local.

---

## Prérequis

Avant de démarrer, assurez-vous d’avoir installé sur votre machine :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)
- Une base de données MariaDB / MySQL

## Installation

- Cloner le repo ou télécharger le via le zip
- Faites "npm install" à la racine du projet pour installer les dépendances
- Créer un fichier .env à la racine du projet et renseignez les variables nécessaires:

- DB_HOST : hôte de la base de données (ex. localhost)
- DB_PORT : port (ex. 5432)
- DB_USER : nom d’utilisateur MariaDB / MySQL
- DB_PASSWORD : mot de passe MariaDB / MySQL
- DB_NAME : nom de la base de données (ex. evently_db)

## Configurer la base de données

Assurez-vous que votre serveur de base de données est en cours d'exécution.
Puis exécutez la migration avec :

- npm run migration:run
- npm run seed

## Lancer l'application

npm run start:dev

## Technologies utilisées

- NestJS (Framework Node.js en ts)
- TypeORM (ORM pour la base de données)
- MariaDB

Auteur : Tom Charon
