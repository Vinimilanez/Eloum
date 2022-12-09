import Person from "../../domain/entities/people/Person";
import IBaseRepository from "../base/IBaseRepository";

export default interface IPersonRepository extends IBaseRepository<Person>{
    
}