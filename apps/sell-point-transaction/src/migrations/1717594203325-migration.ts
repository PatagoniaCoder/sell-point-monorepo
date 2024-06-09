import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717594203325 implements MigrationInterface {
  name = 'Migration1717594203325';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`transaction_date\` timestamp NOT NULL, \`transaction_amount\` int NOT NULL, \`transaction_account_uuid\` varchar(255) NOT NULL, \`transaction_type_id\` int NULL, UNIQUE INDEX \`IDX_fcce0ce5cc7762e90d2cc7e230\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`transaction_type_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`description\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4c3751cb3d7886289854f288fc\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_98271e4a83052aeca9aa11fd3ca\` FOREIGN KEY (\`transaction_type_id\`) REFERENCES \`transaction_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_98271e4a83052aeca9aa11fd3ca\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4c3751cb3d7886289854f288fc\` ON \`transaction_type_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`transaction_type_entity\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fcce0ce5cc7762e90d2cc7e230\` ON \`transaction\``,
    );
    await queryRunner.query(`DROP TABLE \`transaction\``);
  }
}
