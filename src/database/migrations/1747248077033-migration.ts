import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747248077033 implements MigrationInterface {
    name = 'Migration1747248077033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`calendar_events\` DROP FOREIGN KEY \`FK_f2ba4685cba6df66bdc080c98ba\``);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` DROP FOREIGN KEY \`FK_c9b3c0f40c5ec8e94585c96977d\``);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`added_at\` \`added_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`reminder_7d_sent_at\` \`reminder_7d_sent_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`reminder_1d_sent_at\` \`reminder_1d_sent_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`calendar_id\` \`calendar_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`event_id\` \`event_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP FOREIGN KEY \`FK_baf8690eea3928bf4fe59c21414\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_de08738901be6b34d2824a1e243\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`parent_category_id\` \`parent_category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_09f256fb7f9a05f0ed9927f406b\``);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`city\` \`city\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`paid_amount\` \`paid_amount\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`payment_date\` \`payment_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` ADD CONSTRAINT \`FK_f2ba4685cba6df66bdc080c98ba\` FOREIGN KEY (\`calendar_id\`) REFERENCES \`calendars\`(\`calendar_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` ADD CONSTRAINT \`FK_c9b3c0f40c5ec8e94585c96977d\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD CONSTRAINT \`FK_baf8690eea3928bf4fe59c21414\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_de08738901be6b34d2824a1e243\` FOREIGN KEY (\`parent_category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`events\` ADD CONSTRAINT \`FK_09f256fb7f9a05f0ed9927f406b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_09f256fb7f9a05f0ed9927f406b\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_de08738901be6b34d2824a1e243\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP FOREIGN KEY \`FK_baf8690eea3928bf4fe59c21414\``);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` DROP FOREIGN KEY \`FK_c9b3c0f40c5ec8e94585c96977d\``);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` DROP FOREIGN KEY \`FK_f2ba4685cba6df66bdc080c98ba\``);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`payment_date\` \`payment_date\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`paid_amount\` \`paid_amount\` decimal(10,2) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`city\` \`city\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` ADD CONSTRAINT \`FK_09f256fb7f9a05f0ed9927f406b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`parent_category_id\` \`parent_category_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_de08738901be6b34d2824a1e243\` FOREIGN KEY (\`parent_category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`calendars\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD CONSTRAINT \`FK_baf8690eea3928bf4fe59c21414\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`event_id\` \`event_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`calendar_id\` \`calendar_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`reminder_1d_sent_at\` \`reminder_1d_sent_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`reminder_7d_sent_at\` \`reminder_7d_sent_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` CHANGE \`added_at\` \`added_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` ADD CONSTRAINT \`FK_c9b3c0f40c5ec8e94585c96977d\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calendar_events\` ADD CONSTRAINT \`FK_f2ba4685cba6df66bdc080c98ba\` FOREIGN KEY (\`calendar_id\`) REFERENCES \`calendars\`(\`calendar_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
