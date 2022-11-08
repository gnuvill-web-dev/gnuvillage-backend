import { MigrationInterface, QueryRunner } from "typeorm";

export class replies1667839678560 implements MigrationInterface {
    name = 'replies1667839678560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Reply\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(20) NOT NULL, \`postId\` int NOT NULL, \`groupId\` int NULL, \`content\` text NOT NULL, \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Reply\` ADD CONSTRAINT \`FK_620f6bb5fb7fa72342c955e9aaf\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reply\` ADD CONSTRAINT \`FK_356ad23708d7f46f7ab37339705\` FOREIGN KEY (\`postId\`) REFERENCES \`Post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reply\` ADD CONSTRAINT \`FK_6f144db62162886d41165094925\` FOREIGN KEY (\`groupId\`) REFERENCES \`Group\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Reply\` DROP FOREIGN KEY \`FK_6f144db62162886d41165094925\``);
        await queryRunner.query(`ALTER TABLE \`Reply\` DROP FOREIGN KEY \`FK_356ad23708d7f46f7ab37339705\``);
        await queryRunner.query(`ALTER TABLE \`Reply\` DROP FOREIGN KEY \`FK_620f6bb5fb7fa72342c955e9aaf\``);
        await queryRunner.query(`DROP TABLE \`Reply\``);
    }

}
