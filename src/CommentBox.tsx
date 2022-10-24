import {useState, Dispatch, SetStateAction} from 'react';
import { CommentType } from "./types";

type CommentBoxType = {
  comment: CommentType;
  comments?: CommentType[];
  setComments:Dispatch<SetStateAction<CommentType[]>>;
  parentCommentId?: number;
  updateComments?: (comments: CommentType[])=> void;
}

const CommentBox = ({comment, comments, setComments, parentCommentId, updateComments}: CommentBoxType)=>{
  const [replyMode, setReplyMode] = useState(false);
  const [newComment, setNewComment] = useState('');

  const replyToComment = ()=>{
    const newComments = comments ? [...comments] : [];
    const newCommentObj:CommentType = {
       content: newComment,
       dateOfEntry: new Date(),
       id: Date.now(),
       children: [],
       parentCommentId: comment.id,
    };
    newComments.push(newCommentObj);
    updateComments?.(newComments);
  }

  const _updateComments = (newCommentsArray: CommentType[])=>{
    console.log(comment);
    const contentsCopy = [...comments || []];
    const currentCommentIndex = contentsCopy.findIndex(c=> c.id === newCommentsArray[0].parentCommentId);
    

    if(currentCommentIndex !== -1 && contentsCopy){
       const currentComment = contentsCopy[currentCommentIndex];
       currentComment.children = newCommentsArray;
       contentsCopy?.splice(currentCommentIndex, 1, currentComment);
      setComments(contentsCopy||[]);
    }

  }

  return (
    <div className="comment_box">
        <p className="comment_box__date">{getFormattedDate(comment.dateOfEntry)}</p>
        <p className="comment_box__content">{comment.content}</p>
        <div className="comment_box__button_container">
            <button className="comment_box__buttons">Edit</button>
            <button className="comment_box__buttons">Delete</button>
            {!replyMode && <button className="comment_box__buttons" onClick={()=> setReplyMode(true)}>Reply</button>}
        </div>
        {replyMode && <>
            <input value={newComment} onChange={(e)=> setNewComment(e.target.value)} className="input__box" 
            placeholder="Enter a comment"
            />
            <button disabled={newComment.length === 0} className="comment__btn" onClick={replyToComment}>Add new comment</button>
        </>
        }
        {
            comment.children?.map((comment)=> <CommentBox key={comment.id} comment={comment} comments={comment.children} setComments={setComments} updateComments={_updateComments}/>)
        }
    </div>
  )
}

export default CommentBox;

const getFormattedDate = (date: Date): string=>{
  return `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`
}