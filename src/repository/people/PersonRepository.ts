import Person from "../../domain/entities/people/Person";
import BaseRepository from "../base/BaseRepository";
import IPersonRepository from "./IPersonRepository";

export default class PersonRepository extends BaseRepository<Person> implements IPersonRepository{
    constructor(){
        super(Person);
    }
}