import Post from "../../domain/entities/posts/Post";
import BaseRepository from "../base/BaseRepository";

export default class PostRepository extends BaseRepository<Post>{
    constructor(){
        super(Post);
    }
}