import { Column, Entity } from "typeorm";
import EntityBase from "../base/BaseEntity";

@Entity('Share')
export default class Share extends EntityBase{
    @Column({name: 'idPost', type: 'integer', nullable: false})
    public idPost: number;
    @Column({name: 'idPerson', type: 'integer', nullable: false})
    public idPerson: number;
}