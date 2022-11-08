import { MigrationInterface, QueryRunner } from 'typeorm';

export class groups1665144594549 implements MigrationInterface {
  name = 'groups1665144594549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`description\` varchar(1000) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`AssignedGroup\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(20) NOT NULL, \`groupId\` int NOT NULL, \`admin\` tinyint NOT NULL, UNIQUE INDEX \`UQ_assignments\` (\`userId\`, \`groupId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`AssignedGroup\` ADD CONSTRAINT \`FK_46b88d23a723ab20e93e78c2a9a\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`AssignedGroup\` ADD CONSTRAINT \`FK_dd489ee7ebee7b0a5548f5dcc83\` FOREIGN KEY (\`groupId\`) REFERENCES \`Group\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`AssignedGroup\` DROP FOREIGN KEY \`FK_dd489ee7ebee7b0a5548f5dcc83\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`AssignedGroup\` DROP FOREIGN KEY \`FK_46b88d23a723ab20e93e78c2a9a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_assignments\` ON \`AssignedGroup\``,
    );
    await queryRunner.query(`DROP TABLE \`AssignedGroup\``);
    await queryRunner.query(`DROP TABLE \`Group\``);
  }
}
