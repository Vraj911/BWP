import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentSection from './CommentSection'
import { UserRound } from 'lucide-react'
import { getColorFromString } from '../utils/ProfileColors';
function PostCard() {
  const location = useLocation();
  const Obj = location.state?.data;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [reported, setReported] = useState(false);
  const [likeCount, setLikeCount] = useState(Obj?.likes || 0);
if (!Obj) {
  return (
    <div className="p-4 text-center text-gray-500">
      Post data not found.
    </div>
  );
}
  const bgcolor=getColorFromString(Obj.author);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false); 
    }
    if (liked) {
      setLikeCount(likeCount - 1); 
    } else {
      setLikeCount(likeCount + 1);
    }

    setLiked(!liked); 
  };
  const handleDislike = () => {
    if (liked) {
      setLikeCount(likeCount - 1); 
      setLiked(false);
    }

    setDisliked(!disliked); 
  };
  const handleReport = () => {
    setReported(true);
    alert("Reported! Our team will review this post.");
  };
  return (
    <div className='flex-col px-2  my-1'>
      <div className="w-1/1 bg-surface px-2 rounded-xl">
        <h1 className="text-[30px] font-semibold font-primary text-text-primary mb-2">{Obj.title}</h1>
        <p className="text-text-primary text-[25px] font-secondary mb-4">{Obj.body}</p>
        <div className="flex items-center justify-between text-sm text-text-primary border-t pt-3">
          <span>  <span className="font-medium text-text-secondary flex flex-row "><UserRound className='mr-2' style={{ color: bgcolor }}/> {Obj.author}</span></span>
          <span>{new Date(Obj.timestamp * -1).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-start gap-4 mt-4 text-sm text-text-primary items-center">
        </div>
      </div>
      <CommentSection PostId={Obj.id} />
    </div>
  )
}
export default PostCard;
