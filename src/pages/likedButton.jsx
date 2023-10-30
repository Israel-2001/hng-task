import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';

function LikedButton() {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleLike = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <div className='bg-gray-50 px-2 py-2 top-2 relative rounded-full'>
        <FaHeart onClick={toggleLike} className={` text-blue-300 cursor-pointer ${isFavourite ? 'text-red-700' : ''}`} 
        />
      </div>
    </>
  )
}

export default LikedButton;
