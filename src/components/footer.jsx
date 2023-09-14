import React from 'react'
import {FaCopyright, FaFacebookF, FaTwitter, FaWhatsapp} from "react-icons/fa6";
import {FaInstagram} from "react-icons/fa6";
import {FaSlack} from "react-icons/fa6";


export default function footer() {
  return (
    <>
      <div className='w-full bg-gray-900 mt-[-24px] relative bottom-0 text-white flex flex-col justify-center items-center py-8 space-y-3'>
        <div className='flex flex-row space-x-6 cursor-pointer'>
          <FaFacebookF className="text-2xl" />
          <FaInstagram className="text-2xl" />
          <FaSlack className="text-2xl" />
          <FaTwitter className="text-2xl" />
          <FaWhatsapp className="text-2xl" />
        </div>
        <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row space-x-6 cursor-pointer'>
          <p>Conditions of Use</p>
          <p>Privacy & Policy</p>
          <p>Press Room</p>
        </div>
        <div className='flex flex-row justify-center items-center space-x-1'>
          <FaCopyright />
          <p>2023 Movie App by Solomon Israel</p>
        </div>
      </div>
    </>
  )
}
