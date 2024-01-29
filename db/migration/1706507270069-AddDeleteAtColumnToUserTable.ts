import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteAtColumnToUserTable1706507270069
  implements MigrationInterface
{
  name = 'AddDeleteAtColumnToUserTable1706507270069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`deletedAt\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
  }
}
