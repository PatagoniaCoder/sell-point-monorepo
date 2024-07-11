import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1719512555148 implements MigrationInterface {
  name = 'Migration1719512555148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD \`status\` enum ('PENDING', 'CREATED', 'CANCELED') NOT NULL, ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_45705ce5c594e0b9f6158a4337\` ON \`accounts\``);
    await queryRunner.query(`DROP TABLE \`accounts\``);
  }
}
