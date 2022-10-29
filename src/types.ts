export type CommentType = {
   id: number;
   content: string;
   dateOfEntry: Date;
   parentCommentId?: number;
}