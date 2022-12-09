import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataSource } from ".."
import Person from "../../../domain/entities/people/Person"

export class SetupMigration1670199933379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await AppDataSource.getRepository(Person).insert({
            active:true,
            birthDate: new Date(),
            email:'Vinicius@a.com',
            id: 0,
            name: 'Vinicius',
            password: '1',
            phoneNumber:'aaaa',
            professional: false,
        });
        await AppDataSource.getRepository(Person).insert({
            active:true,
            birthDate: new Date(),
            email:'Vinicius@b.com',
            id: 1,
            name: 'Vinicius',
            password: '1',
            phoneNumber:'aaaa',
            professional: true,
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
