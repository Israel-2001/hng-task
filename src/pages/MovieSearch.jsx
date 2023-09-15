import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAlignJustify  } from 'react-icons/fa6';
import { PiTelevisionThin } from 'react-icons/pi'

function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              api_key: '8b7b40a740e510c4f2ff2d66bdb6fc18',
              query: searchQuery,
            },
          }
        );

        setSearchResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);


  return (
    <div className="relative bg-white shadow-md dark:bg-gray-800 ">
      <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full pb-4">
        <div className="flex py-4 flex-row items-center justify-between space-x-2 md:flex-row md:space-y-0 md:space-x-4">
          <div className='flex justify-center items-center space-x-2'>
            <PiTelevisionThin className='p-3 text-6xl bg-red-600 text-white rounded-full' />
            <h1 className="cursor-pointer text-white my-2 font-bold text-lg sm:text-lg">MOVIEBOX</h1>
          </div>
          <div className="flex justify-center items-center space-x-2"> 
            <p className='text-sm text-white'>Sign in</p>
            <FaAlignJustify className='p-3 text-6xl bg-red-600 text-white rounded-full cursor-pointer' />
          </div>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="What do you want to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-2 pl-3 text-sm text-gray-50 
              border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 
              focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
              dark:focus:border-primary-500"
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="m-2 mb-6">
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>  
            {searchResults.map((movie) => (
              <li className="mx-auto px-2">
                <div key={movie.id} className="bg-gray-50 my-10 py-2 cursor-pointer">
                  <img 
                    data-testid="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded" />
                  <p data-testid="movie-release-date" className="pl-3 pt-3 font-bold text-gray-500">{new Date(movie.release_date).toLocaleString('default', { year: 'numeric' })}</p>
                  <h2 data-testid="movie-title" className="pt-2 pl-3 font-bold text-gray-900">{movie.title}</h2>
                  <div className='flex justify-between items-center mx-3'>                        
                    <div className="flex justify-start items-center pt-2  space-x-2">
                      <p data-testid="movie-apiName" className="px-2 py-1 bg-yellow-500 w-[62px] rounded font-bold">IMDb</p>
                      <p data-testid="movie-vote-average" className="font-medium"> {movie.vote_average * 10 } / 100 </p>
                    </div>
                    <p className="font-medium"> {movie.vote_average * 10 }%</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
