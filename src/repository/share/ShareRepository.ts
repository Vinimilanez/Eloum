import Share from "../../domain/entities/share/Share";
import BaseRepository from "../base/BaseRepository";

export default class ShareRepository extends BaseRepository<Share>{
    constructor(){
        super(Share);
    }
}