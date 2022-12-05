import { FindManyOptions, ObjectType } from "typeorm";
import EntityBase from "../../domain/entities/base/BaseEntity";

export default interface IBaseRepository<T extends EntityBase> {
    getRepositoryType(): ObjectType<T>;
    save(obj: T): Promise<void>;
    get(options?: FindManyOptions<T>): Promise<T[]>;
    getFirstOrDefault(options?: FindManyOptions<T>): Promise<T>;
    update(obj: T): Promise<void>;
    delete(obj: T): Promise<void>;
    deleteChunck(codes: number[], chunckSize: number): Promise<void>;
    saveChunk(objs: T[], chunckSize: number): Promise<void>;
}