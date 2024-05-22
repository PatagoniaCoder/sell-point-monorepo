import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716095203375 implements MigrationInterface {
  name = 'Migration1716095203375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`uuid\` varchar(255) NOT NULL, \`transaction_date\` timestamp NOT NULL, \`transaction_amount\` int NOT NULL, \`transaction_amount_before\` int NOT NULL, \`transaction_amount_after\` int NOT NULL, \`transaction_type_uuid\` int NULL, \`transaction_account_from_uuid\` int NULL, \`transaction_account_to_uuid\` int NULL, UNIQUE INDEX \`REL_18bc7b1236415470fcb20f3b9e\` (\`transaction_type_uuid\`), UNIQUE INDEX \`REL_2b6b2890df2e64275816eaf779\` (\`transaction_account_from_uuid\`), UNIQUE INDEX \`REL_1b497b075ced58a99921f377ee\` (\`transaction_account_to_uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_18bc7b1236415470fcb20f3b9ee\` FOREIGN KEY (\`transaction_type_uuid\`) REFERENCES \`transaction_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_2b6b2890df2e64275816eaf779f\` FOREIGN KEY (\`transaction_account_from_uuid\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_1b497b075ced58a99921f377ee6\` FOREIGN KEY (\`transaction_account_to_uuid\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_1b497b075ced58a99921f377ee6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_2b6b2890df2e64275816eaf779f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_18bc7b1236415470fcb20f3b9ee\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1b497b075ced58a99921f377ee\` ON \`transaction\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_2b6b2890df2e64275816eaf779\` ON \`transaction\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_18bc7b1236415470fcb20f3b9e\` ON \`transaction\``,
    );
    await queryRunner.query(`DROP TABLE \`transaction\``);
  }
}
