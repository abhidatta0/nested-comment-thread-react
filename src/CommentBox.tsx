import {useState, Dispatch, SetStateAction} from 'react';
import { CommentType } from "./types";

type CommentBoxType = {
  comment: CommentType;
  comments?: CommentType[];
  setComments:Dispatch<SetStateAction<CommentType[]>>;
  parentCommentId?: number;
  updateComments?: (comments: CommentType[])=> void;
}

const CommentBox = ({comment, comments, setComments}: CommentBoxType)=>{
  

  return (
    <div className="comment_box">
        <p className="comment_box__date">{getFormattedDate(comment.dateOfEntry)}</p>
        <p className="comment_box__content">{comment.content}</p>
        <div className="comment_box__button_container">
            <button className="comment_box__buttons">Edit</button>
            <button className="comment_box__buttons">Delete</button>
        </div>
    </div>
  )
}

export default CommentBox;

const getFormattedDate = (date: Date): string=>{
  return `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`
}