import {useState, Dispatch, SetStateAction} from 'react';
import Comment from './Comment';
import { CommentType } from "./types";

type CommentBoxType = {
  comment: CommentType;
  comments: CommentType[];
  setComments:Dispatch<SetStateAction<CommentType[]>>;
}

const CommentBox = ({comment, comments, setComments}: CommentBoxType)=>{
  const [replyMode, setReplyMode] = useState(false);

  const replyToComment = (newComment: CommentType)=>{
    setComments([{...newComment, parentCommentId: comment.id},...comments]);
    setReplyMode(false);
  }

  const renderReplies = (allComments: CommentType[])=>{
    return (
      allComments.filter((c) => c.parentCommentId === comment.id).map((c)=> <CommentBox key={c.id} comment={c} 
      setComments={setComments}
      comments={comments}
      />)
    )
  }

  return (
    <div className="comment_box">
        <p className="comment_box__date">{getFormattedDate(comment.dateOfEntry)}</p>
        <p className="comment_box__content">{comment.content}</p>
        <div className="comment_box__button_container">
            <button className="comment_box__buttons">Edit</button>
            <button className="comment_box__buttons">Delete</button>
            <button className="comment_box__buttons" onClick={()=> setReplyMode(true)}>Reply</button>
        </div>
        {
              replyMode && (
                <Comment mode='reply' addComment={replyToComment}/>
              )
        }

        {renderReplies(comments)}
    </div>
  )
}

export default CommentBox;

const getFormattedDate = (date: Date): string=>{
  return `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`
}