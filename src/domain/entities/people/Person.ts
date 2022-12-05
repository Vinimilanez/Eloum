import { Column, Entity } from "typeorm";
import EntityBase from "../base/BaseEntity";

@Entity({name:'People'})
export default class Person extends EntityBase {
    @Column({name:'name', type:'varchar', length: '200', nullable: false})
    public name: string;
    @Column({name:'birthDate', type:'datetime', nullable: false})
    public birthDate: Date;
    @Column({name:'professional', type:'integer', nullable: false})
    public professional: boolean;
    @Column({name:'email', type:'varchar', length: '326', nullable: false})
    public email: string;
    @Column({name:'password', type:'varchar', length: '2000', nullable: false})
    public password: string;
    @Column({name:'phoneNumber', type:'varchar', length: '20', nullable: false})
    public phoneNumber: string;
    @Column({name:'active', type:'integer', nullable: false})
    public active: boolean;
}