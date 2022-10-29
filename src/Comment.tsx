import {useState} from 'react';
import { CommentType } from './types';

type Props = {
    mode: 'comment'|'reply';
    addComment:(comment: CommentType)=> void;
}

const Comment = ({mode, addComment}:Props) => {
  const [newComment, setNewComment] = useState('');

  const onClick= ()=>{
    const comment = {id: Date.now(),content: newComment, dateOfEntry: new Date()};
    addComment(comment);
    setNewComment('');
  }


  return (
    <div>
        <input value={newComment} onChange={(e)=> setNewComment(e.target.value)} className="input__box" 
        placeholder="Enter a comment"
        />
        <button disabled={newComment.length === 0} className="comment__btn" onClick={onClick}>Add { mode==='comment' ? 'new comment':'reply' }</button>
    </div>
  )
}

export default Comment