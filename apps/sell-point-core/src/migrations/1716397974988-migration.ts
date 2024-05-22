import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716397974988 implements MigrationInterface {
  name = 'Migration1716397974988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`balance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`amount\` int NOT NULL, \`last_transaction_uuid\` varchar(255) NOT NULL, \`account_uuid\` int NULL, UNIQUE INDEX \`REL_f31abe582e7040bb27507a9ec9\` (\`account_uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`balance\` ADD CONSTRAINT \`FK_f31abe582e7040bb27507a9ec96\` FOREIGN KEY (\`account_uuid\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`balance\` DROP FOREIGN KEY \`FK_f31abe582e7040bb27507a9ec96\``,
    );
    await queryRunner.query(`DROP INDEX \`REL_f31abe582e7040bb27507a9ec9\` ON \`balance\``);
    await queryRunner.query(`DROP TABLE \`balance\``);
  }
}
