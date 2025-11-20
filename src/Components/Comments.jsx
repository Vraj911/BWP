import React from 'react'
import { UserRound } from 'lucide-react'
import { getColorFromString } from '../utils/ProfileColors'
function Comments({obj}) {
  const bgColor = getColorFromString(obj.author);
  return (
    <div className='flex-col border-border my-1 px-2 rounded-xl bg-surface'>
        <div className='text-text-secondary font-primary flex flex-row'><UserRound className='mr-2 ' style={{ color: bgColor }}/>{obj.author}-{new Date(obj.timestamp*-1).toLocaleDateString('en-GB')}</div>
        <div className='text-text-primary font-secondary'>{obj.body}</div>
    </div>
  )
}

export default Comments