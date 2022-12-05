import { BaseEntity, PrimaryColumn} from "typeorm";

export default abstract class EntityBase extends BaseEntity {
    @PrimaryColumn({ name: 'id', type:'integer', generated: "identity" })
    public id: number;
}