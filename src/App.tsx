import "./app.css";
import { useState } from 'react';
import { CommentType } from './types';
import CommentBox from "./CommentBox";

const App = ()  => {
  const [ comments, setComments] = useState<CommentType[]>([
{id: 1666574016881, content: 'sdd', dateOfEntry: new Date(),children: [
  {id: 1666574016882, content: 'child comment', dateOfEntry: new Date(), parentCommentId: 1666574016881, children:[
    {id: 1666574016883, content: 'child comment', dateOfEntry: new Date(), parentCommentId: 1666574016882},
  ]}
]}
  ]);

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
        {
          comments.map((comment)=> <CommentBox key={comment.id} comment={comment}/>)
        }
      </div>
    </div>
  )
}

export default App
