import "./app.css";
import { useState } from 'react';
import { CommentType } from './types';
import CommentBox from "./CommentBox";
import Comment from "./Comment";

const App = ()  => {
  const [ comments, setComments] = useState<CommentType[]>([]);

  console.log(comments);

  const addComment = (newComment: CommentType)=>{
    setComments([newComment,...comments]);
  }


  return (
    <div className="app">
      <div>
        <Comment mode="comment" addComment={addComment}/>
        {
          comments.filter(comment => !comment.parentCommentId).map((comment)=> <CommentBox key={comment.id} comment={comment} comments={comments} setComments={setComments}/>)
        }
      </div>
    </div>
  )
}

export default App
