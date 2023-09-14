import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';

function LikedButton() {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleLike = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <div className='p-2 bg-gray-300 relative top-2 rounded-full w-8'>
        <FaHeart onClick={toggleLike} className={`text-white cursor-pointer ${isFavourite ? 'text-red-500' : ''}`} 
        />
      </div>
    </>
  )
}

export default LikedButton;