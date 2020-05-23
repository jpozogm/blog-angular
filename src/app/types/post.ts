export interface Post{
    // posttitle: string;
    _id: string;
    postTittle: string;
    postAuthorName: string;
    postAuthorNickName: string;
    postContent: string;
    user: string;
    postDate: Date;
    postComments: string[];
}
