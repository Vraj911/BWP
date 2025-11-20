import React from 'react'
import { useState, useEffect } from 'react';
import Comments from './Comments';
import { auth } from '../Firebase/firebase';
import { addComment, getPaginatedComments } from '../Firebase/comments';
function CommentSection({ PostId }) {
  const [comment, setComment] = useState('');
  const [comments, setcomments] = useState();
  useEffect(() => {
    const fetchComments = async () => {
      const tempComments = await getPaginatedComments(PostId);
      tempComments.reverse();
      setcomments(tempComments);
    };

    fetchComments();
  }, [PostId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log('Submitted Comment:', comment);
      let obj = {
        author: auth.currentUser.displayName,
        body: comment
      }
      await addComment(PostId, obj)
      setComment('');
      // Optionally refresh comments after adding
      const updatedComments = await getPaginatedComments(PostId);
      updatedComments.reverse();
      setcomments(updatedComments);
    }
  };
  return (
    <div className='flex-col'>
      <form onSubmit={handleSubmit} className=" w-full border mt-2 shadow-md">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 placeholder:text-text-secondary font-secondary text-text-primary border  resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
        <button
          type="submit"
          className="mt-3 px-2 font-primary bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    {comments&& comments.map((res,index) => {
      return <Comments obj={res} key={index} />;
    })}

    </div>
  )
}

export default CommentSection