import {DataSource} from "typeorm";
import Person from "../../domain/entities/people/Person";
import Post from "../../domain/entities/posts/Post";
import Share from "../../domain/entities/share/Share";
import { SetupMigration1670199933379 } from "./migrations/1670199933379-SetupMigration";

export const AppDataSource = new DataSource({
    type: 'react-native',
    database: 'eloum.db3',
    location: 'default',
    logging:['error', 'info', 'migration', 'query', 'schema', 'warn', 'log'],
    synchronize: true,
    entities: [Person, Post, Share],
    migrations: [SetupMigration1670199933379],
    migrationsRun: true
});

export default class DataBase {
    private static ds: DataSource;

    public static async getDataBaseConnection(): Promise<DataSource>{
        if(DataBase.ds?.isInitialized)
           return DataBase.ds;

        DataBase.ds = AppDataSource;
        return await DataBase.ds.initialize();
    }
}

