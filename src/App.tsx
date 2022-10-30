import "./app.css";
import { useState } from 'react';
import { CommentType } from './types';
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { setStorageValue, getStorageValue } from './utils/localStorage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LOCALSTORAGE } from "./constants/localStorage";
import { useEffect } from "react";

const App = ()  => {
  const [ comments, setComments] = useState<CommentType[]>(()=>{
    const saved = getStorageValue(LOCALSTORAGE.nested_comments_thread, '[]');
    return saved;
  });

  console.log(comments);

  const addComment = (newComment: CommentType)=>{
    const updatedComments = [newComment,...comments];
    setComments(updatedComments);
  }

  useEffect(()=>{
    setStorageValue(LOCALSTORAGE.nested_comments_thread, comments);
  },[comments]);


  return (
    <div className="app">
      <HelmetProvider>
      <Helmet>
        <title>Nested comment thread</title>
      </Helmet>
      <div>
        <Comment mode="comment" addComment={addComment}/>
        {
          comments.filter(comment => !comment.parentCommentId).map((comment)=> <CommentBox key={comment.id} comment={comment} comments={comments} setComments={setComments}/>)
        }
      </div>
      </HelmetProvider>
    </div>
  )
}

export default App
