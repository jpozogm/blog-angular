import { Comment } from '../../comments/type/comment';

export interface PostDTO{
    postTittle: string;
    postComments: Comment[];
    _id: string;
    postAuthorName: string;
    postAuthorNickName: string;
    postContent: string;
    user: string;
    postDate: Date;
}
