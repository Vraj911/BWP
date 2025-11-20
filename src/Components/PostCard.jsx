import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentSection from './CommentSection'
import { UserRound } from 'lucide-react'
import { getColorFromString } from '../utils/ProfileColors';
function PostCard() {
  const location = useLocation();
  const Obj = location.state?.data;
  const bgcolor=getColorFromString(Obj.author);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [reported, setReported] = useState(false);
  const [likeCount, setLikeCount] = useState(Obj?.likes || 0);

  if (!Obj) return <div className="p-4 text-center text-gray-500">Post data not found.</div>;

  const handleLike = () => {
    if (disliked) {
      setDisliked(false); // If disliked, remove the dislike first
    }

    if (liked) {
      setLikeCount(likeCount - 1); // If already liked, decrease the like count
    } else {
      setLikeCount(likeCount + 1); // If not liked, increase the like count
    }

    setLiked(!liked); // Toggle the liked state
  };

  const handleDislike = () => {
    if (liked) {
      setLikeCount(likeCount - 1); // If liked, remove the like
      setLiked(false);
    }

    setDisliked(!disliked); // Toggle the disliked state
  };

  const handleReport = () => {
    setReported(true);
    // Optionally, trigger a backend report API call here
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
          {/* <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
            liked ? 'bg-blue-100 text-accent-green border-blue-300' : 'hover:bg-accent-green'
          }`}
        >
          👍 Like
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
            disliked ? 'bg-red-100 text-accent-red border-red-300' : 'hover:bg-accent-red'
          }`}
        >
          👎 Dislike
        </button>

        <button
          onClick={handleReport}
          disabled={reported}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
            reported
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'hover:bg-red-50 text-red-500 border-red-300'
          }`}
        >
          🚩 {reported ? 'Reported' : 'Report'}
        </button> 

        <div className="ml-auto text-gray-500">{likeCount} Likes · {Obj.comments} Comments</div>
     */}
        </div>

      </div>
      <CommentSection PostId={Obj.id} />
    </div>
  )
}

export default PostCard;
