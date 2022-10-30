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
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');


  const replyToComment = (newComment: CommentType)=>{
    setComments([{...newComment, parentCommentId: comment.id},...comments]);
    setReplyMode(false);
  }

  const cancelReply= ()=>{
    setReplyMode(false);
  }

  const deleteComment = (id: number)=>{
    setComments(comments.filter(c => c.id !== id));
  }

  const handleEdit = ()=>{
    setEditMode(true);
    setReplyMode(false);
    setEditText(comment.content);
  }

  const handleEditCancel = ()=>{
    setEditMode(false);
  }

  const handleEditSave = ()=>{
    const idx = comments.findIndex(c => c.id === comment.id);
    const newComments = [...comments];
    newComments.splice(idx, 1, {...comment, dateOfEntry: new Date(), content: editText, isEdited: true});
    setComments(newComments);
    setEditMode(false);
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
        { editMode ? (
        <>
          <input value={editText} onChange={(e)=> setEditText(e.target.value)} className="input__box" />
          <div className="comment_box__button_container">
            <button className="comment_box__buttons" onClick={handleEditCancel}>Cancel</button>
            <button className="comment_box__buttons" onClick={handleEditSave}>Save</button>
          </div>
        </>
        )
        : (
          <>
        <p className="comment_box__date">
          {getFormattedDate(comment.dateOfEntry)}         {comment.isEdited && <span className='edit__text'>(edited)</span>}
        </p>
        <p className="comment_box__content">{comment.content}</p>
        <div className="comment_box__button_container">
            <button className="comment_box__buttons" onClick={handleEdit}>Edit</button>
            <button className="comment_box__buttons" onClick={()=> deleteComment(comment.id)}>Delete</button>
            <button className="comment_box__buttons" onClick={()=> setReplyMode(true)}>Reply</button>
        </div>
        </>
        )}
        {
              replyMode && (
                <Comment mode='reply' addComment={replyToComment} onCancel={cancelReply}/>
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