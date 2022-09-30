import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1664190863271 implements MigrationInterface {
  name = 'users1664190863271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`id\` varchar(20) NOT NULL,  \`password\` varchar(60) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`User\``);
  }
}
