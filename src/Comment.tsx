import {useState} from 'react';
import { CommentType } from './types';

type Props = {
    mode: 'comment'|'reply';
    addComment:(comment: CommentType)=> void;
    onCancel?:()=> void;
}

const Comment = ({mode, addComment, onCancel}:Props) => {
  const [newComment, setNewComment] = useState('');

  const onClick= ()=>{
    const comment = {id: Date.now(),content: newComment, dateOfEntry: new Date(), isEdited: false};
    addComment(comment);
    setNewComment('');
  }

  const handleCancel = ()=>{
    onCancel?.();
  }


  return (
    <div>
        <input value={newComment} onChange={(e)=> setNewComment(e.target.value)} className="input__box" 
        placeholder="Enter a comment"
        />
        <button disabled={newComment.length === 0} className="comment__btn" onClick={onClick}>Add { mode==='comment' ? 'new comment':'reply' }</button>
        {mode === 'reply' && <button disabled={newComment.length === 0} className="comment__btn comment__btn__cancel" onClick={handleCancel}>Cancel</button>}
    </div>
  )
}

export default Comment