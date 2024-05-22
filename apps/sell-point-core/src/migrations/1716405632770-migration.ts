import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716405632770 implements MigrationInterface {
  name = 'Migration1716405632770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`balance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`amount\` int NOT NULL, \`last_transaction_uuid\` varchar(255) NOT NULL, \`accountId\` int NULL, UNIQUE INDEX \`IDX_351bcc4b83b35901cd23ce3d07\` (\`uuid\`), UNIQUE INDEX \`REL_7ee384741a490213486471471d\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction_type_entity\` ADD UNIQUE INDEX \`IDX_4c3751cb3d7886289854f288fc\` (\`uuid\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD UNIQUE INDEX \`IDX_45705ce5c594e0b9f6158a4337\` (\`uuid\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD UNIQUE INDEX \`IDX_fcce0ce5cc7762e90d2cc7e230\` (\`uuid\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`balance\` ADD CONSTRAINT \`FK_7ee384741a490213486471471d4\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`balance\` DROP FOREIGN KEY \`FK_7ee384741a490213486471471d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP INDEX \`IDX_fcce0ce5cc7762e90d2cc7e230\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` DROP INDEX \`IDX_45705ce5c594e0b9f6158a4337\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction_type_entity\` DROP INDEX \`IDX_4c3751cb3d7886289854f288fc\``,
    );
    await queryRunner.query(`DROP INDEX \`REL_7ee384741a490213486471471d\` ON \`balance\``);
    await queryRunner.query(`DROP INDEX \`IDX_351bcc4b83b35901cd23ce3d07\` ON \`balance\``);
    await queryRunner.query(`DROP TABLE \`balance\``);
  }
}
