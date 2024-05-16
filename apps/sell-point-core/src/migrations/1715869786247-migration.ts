import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715869786247 implements MigrationInterface {
  name = 'Migration1715869786247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`delete_at\` datetime(6) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`delete_at\``);
    await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`update_at\``);
    await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`create_at\``);
  }
}
