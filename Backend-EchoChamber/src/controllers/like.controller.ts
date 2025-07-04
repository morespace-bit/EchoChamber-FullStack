import { Response } from "express";
import { ExtendedRequest } from "../global/type";
import Post from "../database/models/post.model";
import Like from "../database/models/like.model";




class Like{

static async LikePost(req: ExtendedRequest, res: Response){

if (!req.user?.id){
    res.status(401).json({message: "unauthorized"});
    return;
}

const userId = req.user.id;
const {postId } = req.params;


try{

    const post = await Post.findByPk(postId);
    if(!Post){
        res.status(404).json({message: "Post not found"});
        return;
    
    
    }



    const [like, created] = await Like
}










}



}