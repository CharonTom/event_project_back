// src/scripts/seed.ts
import 'reflect-metadata';
import AppDataSource from '../config/typeorm.config';
import { readFileSync } from 'fs';
import { join } from 'path';

async function runSeed() {
  // 1) Init DataSource
  await AppDataSource.initialize();
  console.log('DB connectée');

  // 2) Lire le fichier seed SQL
  const sqlPath = join(__dirname, '..', 'database', 'seed.sql');
  const seedSql = readFileSync(sqlPath, 'utf-8');

  // 3) Exécuter chaque statement
  // On split sur les points-virgules, en filtrant les lignes vides
  const statements = seedSql
    .split(/;\s*(?=\n|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    try {
      await AppDataSource.query(stmt);
    } catch (err) {
      console.error('Erreur sur statement:', stmt);
      throw err;
    }
  }

  console.log(`${statements.length} statements exécutés avec succès`);

  // 4) Détruire la connexion
  await AppDataSource.destroy();
  console.log('👋 DB déconnectée');
}

runSeed().catch((err) => {
  console.error('Seed échoué :', err);
  process.exit(1);
});
