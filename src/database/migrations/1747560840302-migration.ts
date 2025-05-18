import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747560840302 implements MigrationInterface {
    name = 'Migration1747560840302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`category_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`parent_category_id\` int NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`calendars\` (\`calendar_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, UNIQUE INDEX \`REL_baf8690eea3928bf4fe59c2141\` (\`user_id\`), PRIMARY KEY (\`calendar_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`calendar_events\` (\`calendar_event_id\` int NOT NULL AUTO_INCREMENT, \`added_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`wants_reminder\` tinyint NOT NULL DEFAULT 0, \`reminder_7d_sent\` tinyint NOT NULL DEFAULT 0, \`reminder_7d_sent_at\` datetime NULL, \`reminder_1d_sent\` tinyint NOT NULL DEFAULT 0, \`reminder_1d_sent_at\` datetime NULL, \`calendar_id\` int NULL, \`event_id\` int NULL, PRIMARY KEY (\`calendar_event_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`events\` (\`event_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`description\` text NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`location\` varchar(255) NOT NULL, \`city\` varchar(100) NULL, \`price\` decimal(8,2) NOT NULL DEFAULT '0.00', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`is_premium\` tinyint NOT NULL DEFAULT '0', \`user_id\` int NULL, PRIMARY KEY (\`event_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(25) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user', 'guest') NOT NULL DEFAULT 'user', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_categories\` (\`event_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_c78c7b670b392b79ee76f01b67\` (\`event_id\`), INDEX \`IDX_372a350b878524310e04d0ddec\` (\`category_id\`), PRIMARY KEY (\`event_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_de08738901be6b34d2824a1e243\` FOREIGN KEY (\`parent_category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD CONSTRAINT \`FK_baf8690eea3928bf4fe59c21414\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` ADD CONSTRAINT \`FK_f2ba4685cba6df66bdc080c98ba\` FOREIGN KEY (\`calendar_id\`) REFERENCES \`calendars\`(\`calendar_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` ADD CONSTRAINT \`FK_c9b3c0f40c5ec8e94585c96977d\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`events\` ADD CONSTRAINT \`FK_09f256fb7f9a05f0ed9927f406b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_categories\` ADD CONSTRAINT \`FK_c78c7b670b392b79ee76f01b675\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`event_categories\` ADD CONSTRAINT \`FK_372a350b878524310e04d0ddec2\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_categories\` DROP FOREIGN KEY \`FK_372a350b878524310e04d0ddec2\``);
        await queryRunner.query(`ALTER TABLE \`event_categories\` DROP FOREIGN KEY \`FK_c78c7b670b392b79ee76f01b675\``);
        await queryRunner.query(`ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_09f256fb7f9a05f0ed9927f406b\``);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` DROP FOREIGN KEY \`FK_c9b3c0f40c5ec8e94585c96977d\``);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` DROP FOREIGN KEY \`FK_f2ba4685cba6df66bdc080c98ba\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP FOREIGN KEY \`FK_baf8690eea3928bf4fe59c21414\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_de08738901be6b34d2824a1e243\``);
        await queryRunner.query(`DROP INDEX \`IDX_372a350b878524310e04d0ddec\` ON \`event_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_c78c7b670b392b79ee76f01b67\` ON \`event_categories\``);
        await queryRunner.query(`DROP TABLE \`event_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`events\``);
        await queryRunner.query(`DROP TABLE \`calendar_events\``);
        await queryRunner.query(`DROP INDEX \`REL_baf8690eea3928bf4fe59c2141\` ON \`calendars\``);
        await queryRunner.query(`DROP TABLE \`calendars\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
