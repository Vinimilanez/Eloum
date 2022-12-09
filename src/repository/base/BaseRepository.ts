import { FindManyOptions, FindOptionsWhere, ObjectType, RemoveOptions, Repository } from "typeorm";
import EntityBase from "../../domain/entities/base/BaseEntity";
import DataBase, { AppDataSource } from "../../infra/database";

export default abstract class BaseRepository<T extends EntityBase> {

    private repo: Repository<T>;
    private readonly repositoryType: ObjectType<T>;

    constructor(repoType: ObjectType<T>){
        this.repositoryType = repoType;
        DataBase.getDataBaseConnection().then((result) => {
            this.repo = result.getRepository(repoType);
        }).catch((err) => {
            this.repo = AppDataSource.getRepository(repoType);
        });
        this.repo = AppDataSource.getRepository(repoType);
    }
    
    public getRepositoryType(): ObjectType<T> {
        return this.repositoryType;
    }

    private validateObj(obj: T): void{
        if(!obj)
            throw new Error("Não é possivel realizar a operação em um objeto nulo!");
    }

    public async save(obj: T): Promise<void>{
        this.validateObj(obj);

        if(!obj.id || obj.id === 0 ){
            await this.repo.insert(<any>obj);
            return;
        }

        await this.update(obj);
    }
    
    public async get(options?: FindManyOptions<T>): Promise<T[]>{
        return await this.repo.find(options);
    }

    public async getFirstOrDefault(options?: FindManyOptions<T>): Promise<T>{
        return (await this.repo.find(options))[0] ?? <T>{};
    }

    public async update(obj: T): Promise<void> {
        this.validateObj(obj);

        await this.repo.update(<FindOptionsWhere<T>>{
            id: obj.id
        }, <any>obj);
    }

    public async delete(obj: T): Promise<void> {
        this.validateObj(obj);
        await this.repo.delete(<FindOptionsWhere<T>>{ id: obj.id});
    }

    public async deleteChunck(codes: number[], chunckSize: number): Promise<void> {
        await this.repo.remove(codes.map(x => <T>{id: x}, <RemoveOptions>{
            chunk: chunckSize
        }));
    }


    public async saveChunk(objs: T[], chunckSize: number): Promise<void>{
        //Insert
        await this.repo.save(objs.filter( x => !x.id || x.id === 0 ), {chunk: chunckSize});
        //Update
        await this.repo.save(objs.filter( x => !(!x.id || x.id === 0 )), {chunk: chunckSize});
    }
}