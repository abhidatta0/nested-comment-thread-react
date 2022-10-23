export type CommentType = {
   id: number;
   content: string;
   dateOfEntry: Date;
   children?: Comment[];
}