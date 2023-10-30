import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MovieSearch from './MovieSearch';
import Spinner from '../components/Spinner';
import Footer from '../components/footer';
import LikedButton from './likedButton';
import { FaArrowRight } from 'react-icons/fa6';

function Index() {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  useEffect(() => {


    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated',
          {
            params: {
              api_key: '8b7b40a740e510c4f2ff2d66bdb6fc18',
            },
          }
        );

        console.log(response.data)
        setTopMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top movies:', error);
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <>
      <MovieSearch />
      <div className="bg-gray-200 mt-[-20px] pt-3">
        <div className='max-w-6xl mx-auto bg-gray-200'>
          <div className='flex items-center justify-between mx-3 space-x-3'>
            <div className='flex items-center justify-between px-3 py-2 space-x-3 font-medium bg-red-600 text-gray-50 rounded-3xl'>
              <h1 className='px-2 text-xl font-bold'>Top Rated</h1>
            </div>
            <div className='flex items-center justify-between px-3 py-2 space-x-3 font-medium bg-red-600 text-gray-50 rounded-3xl'>
              <p>See More</p>
              <FaArrowRight className='' />
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-2 mb-6">
              <ul 
                className='items-center justify-center sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
              >
                {topMovies.slice(0, 30).map((movie, id) => (
                  <li 
                    className="px-2 mx-8 mb-6"  
                    key={id}
                  >
                    <div
                      data-testid="movie-card" 
                      className="bg-gray-900 pb-3 my-10 text-white 
                      cursor-pointer rounded-[15px]"
                    >
                      <img 
                        data-testid="movie-poster"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-[15px] w-full h-[50%]"
                        onClick={()=>navigate(`/movie/${movie.id}`)}
                      />
                      <div className='flex items-center justify-between mx-3'>
                        <p data-testid="movie-release-date" className="pt-3 pl-3 font-bold text-gray-50">{new Date(movie.release_date).toLocaleString('default', { year: 'numeric' })}</p>
                        <LikedButton />
                      </div>
                      <h2 data-testid="movie-title" className="pt-2 pl-3 text-2xl font-bold text-gray-50">{movie.title}</h2>
                      <div className='flex items-center justify-between mx-3'>                        
                        <div className="flex items-center justify-start pt-2 space-x-2">
                          <p data-testid="movie-apiName" className="px-2 py-1 bg-yellow-500 w-[62px] rounded font-bold">IMDb</p>
                          <p data-testid="movie-vote-average" className="text-lg font-medium"> {Math.round(movie.vote_average * 10)} / 100 </p>
                        </div>
                        <p className="text-lg font-medium"> {Math.round(movie.vote_average * 10)}%</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;


// import Header from "@/components/header";
// import MainLayout from "@/components/layout/mainLayout";
// import Dropdown from "./dropdown";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <MainLayout>
//       <Header title="Timeline" info="Explore the events happening around you." />
//       <div className="">
//         Discover and create <br /> Memorable events
//         <p>Craft events that reflect your passions and interests.</p>
//         <button>
//           Create An Event
//         </button>
//       </div>
//       <div className="bg-gray-100">
//         <div className="flex justify-between">
//           <div className="flex justify-between gap-8">
//             <p>Friends</p>
//             <p>Everyone</p>
//           </div>
//           <div>
//             <Dropdown />
//           </div>
//         </div>
//         <div className="mt-3 mb-3">
//           <ul 
//             className='items-center justify-center sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
//           >
//             <li className="w-[100%] mx-4 mb-6 px-2">
//               <div className="flex flex-col bg-purple-300">
//                 <div 
//                   className="bg-gray-900 pb-3 m-5 
//                    text-white cursor-pointer rounded-[15px]">
//                   <Image
//                     src={""}
//                     alt="logo"
//                     width={200}
//                     height={200}
//                     className="w-auto h-auto"
//                   />
//                 </div>
//                 <div className="m-5">
//                   <div>
//                     <h2>Football Game</h2>
//                     <h3>20th May, 2023</h3>
//                     <h5>Friday, 16:00-18:00</h5>
//                     <h6>Teslim Balogun Stadium</h6>
//                   </div>
//                   <div>
//                     <button></button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li className="w-[100%] mx-4 mb-6 px-2">
//               <div className="flex flex-col bg-blue-300">
//                 <div 
//                   className="bg-gray-900 pb-3 m-5 
//                    text-white cursor-pointer rounded-[15px]">
//                   <Image
//                     src={""}
//                     alt="logo"
//                     width={200}
//                     height={200}
//                     className="w-auto h-auto"
//                   />
//                 </div>
//                 <div className="m-5">
//                   <div>
//                     <h2>Football Game</h2>
//                     <h3>20th May, 2023</h3>
//                     <h5>Friday, 16:00-18:00</h5>
//                     <h6>Teslim Balogun Stadium</h6>
//                   </div>
//                   <div>
//                     <button></button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li className="w-[100%] mx-4 mb-6 px-2">
//               <div className="flex flex-col bg-pink-100">
//                 <div 
//                   className="bg-gray-900 pb-3 m-5 
//                    text-white cursor-pointer rounded-[15px]">
//                   <Image
//                     src={""}
//                     alt="logo"
//                     width={200}
//                     height={200}
//                     className="w-auto h-auto"
//                   />
//                 </div>
//                 <div className="m-5">
//                   <div>
//                     <h2>Football Game</h2>
//                     <h3>20th May, 2023</h3>
//                     <h5>Friday, 16:00-18:00</h5>
//                     <h6>Teslim Balogun Stadium</h6>
//                   </div>
//                   <div>
//                     <button></button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li className="w-[100%] mx-4 mb-6 px-2">
//               <div className="flex flex-col bg-pink-300">
//                 <div 
//                   className="bg-gray-900 pb-3 m-5 
//                    text-white cursor-pointer rounded-[15px]">
//                   <Image
//                     src={""}
//                     alt="logo"
//                     width={200}
//                     height={200}
//                     className="w-auto h-auto"
//                   />
//                 </div>
//                 <div className="m-5">
//                   <div>
//                     <h2>Football Game</h2>
//                     <h3>20th May, 2023</h3>
//                     <h5>Friday, 16:00-18:00</h5>
//                     <h6>Teslim Balogun Stadium</h6>
//                   </div>
//                   <div>
//                     <button></button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li className="w-[100%] mx-4 mb-6 px-2">
//               <div className="flex flex-col bg-purple-300">
//                 <div 
//                   className="bg-gray-900 pb-3 m-5 
//                    text-white cursor-pointer rounded-[15px]">
//                   <Image
//                     src={""}
//                     alt="logo"
//                     width={200}
//                     height={200}
//                     className="w-auto h-auto"
//                   />
//                 </div>
//                 <div className="m-5">
//                   <div>
//                     <h2>Football Game</h2>
//                     <h3>20th May, 2023</h3>
//                     <h5>Friday, 16:00-18:00</h5>
//                     <h6>Teslim Balogun Stadium</h6>
//                   </div>
//                   <div>
//                     <button></button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li className="w-[100%] mx-4 mb-6 px-2">
//               <div className="flex flex-col bg-purple-300">
//                 <div 
//                   className="bg-gray-900 pb-3 m-5 
//                    text-white cursor-pointer rounded-[15px]">
//                   <Image
//                     src={""}
//                     alt="logo"
//                     width={200}
//                     height={200}
//                     className="w-auto h-auto"
//                   />
//                 </div>
//                 <div className="m-5">
//                   <div>
//                     <h2>Football Game</h2>
//                     <h3>20th May, 2023</h3>
//                     <h5>Friday, 16:00-18:00</h5>
//                     <h6>Teslim Balogun Stadium</h6>
//                   </div>
//                   <div>
//                     <button></button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }



// import React, { useState } from 'react';

// const Dropdown = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="relative inline-block text-left">
//             <button
//                 onClick={toggleDropdown}
//                 className="inline-flex items-center px-4 py-2 font-semibold text-white bg-blue-500 rounded"
//             >
//                 Today  v
//             </button>
//             {isOpen && (
//                 <div className="absolute right-0 w-32 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
//                     <div
//                         className="py-1"
//                         role="menu"
//                         aria-orientation="vertical"
//                         aria-labelledby="options-menu"
//                     >
//                         <a
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             role="menuitem"
//                         >
//                             Yesterday
//                         </a>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dropdown;
