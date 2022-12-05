import { Column, Entity } from "typeorm";
import EntityBase from "../base/BaseEntity";
export enum Feeling{
    indifference = 0,
    sad = 1,
    confused = 2,
    happy = 3,
    angry = 4
}

export const FeelingDescription = new Map<Feeling, String>([
    [Feeling.indifference,'Indiferente'],
    [Feeling.sad,'Triste'],
    [Feeling.confused,'Confuso'],
    [Feeling.happy,'Feliz'],
    [Feeling.angry,'Irritado']
]);

@Entity('Posts')
export default class Post extends EntityBase {
    @Column({name:'feeling', type: 'integer', nullable: false})
    public feeling: Feeling;
    @Column({name:'description', type: 'text', nullable: false})
    public description: string;
    @Column({name:'title', type: 'varchar', length:'30', nullable: true})
    public title?: string;
    @Column({name:'idPerson', type: 'integer', nullable: false})
    public idPerson: number;
    @Column({name:'date', type: 'datetime', nullable: false})
    public date: Date;
    @Column({name:'personName', type: 'varchar', length: 200, nullable: false})
    public personName: string;
}