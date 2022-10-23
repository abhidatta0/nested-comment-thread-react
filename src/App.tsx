import "./app.css";
import { useState } from 'react';
import { CommentType } from './types';

const App = ()  => {
  const [ comments, setComments] = useState<CommentType[]>([]);

  const [newComment, setNewComment] = useState('');

  console.log(comments);

  const addComment = ()=>{
    setComments([...comments, {id: Date.now(),content: newComment, dateOfEntry: new Date()}]);
    setNewComment('');
  }


  return (
    <div className="app">
      <div>
        <input value={newComment} onChange={(e)=> setNewComment(e.target.value)} className="input__box" 
        placeholder="Enter a comment"
        />
        <button disabled={newComment.length === 0} className="comment__btn" onClick={addComment}>Add new comment</button>
      </div>
    </div>
  )
}

export default App
