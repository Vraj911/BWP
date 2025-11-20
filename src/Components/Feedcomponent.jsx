import React from 'react';
import { Link } from 'react-router-dom';
function Feedcomponent({ Obj }) {
  return (
    <Link to="/posts" state={{data:Obj}} className='px-2 py-1'>
    <div className="pl-5 bg-surface  flex flex-col py-4 rounded-2xl border-gray-300 hover:bg-background">
      <h2 className="text-text-primary text-lg font-primary font-semibold mb-1 ">{Obj.title}</h2>
      <p className="text-text-secondary font-secondary truncate">{Obj.body}</p>
    </div>
    </Link>
  );
}

export default Feedcomponent;
