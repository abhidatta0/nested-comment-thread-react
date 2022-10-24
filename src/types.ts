export type CommentType = {
   id: number;
   content: string;
   dateOfEntry: Date;
   children?: CommentType[];
   parentCommentId?: number;
}