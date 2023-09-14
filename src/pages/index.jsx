import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MovieSearch from './MovieSearch';
import Spinner from '../components/Spinner';
import Footer from '../components/footer';
import LikedButton from './likedButton';

function Index() {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: '8b7b40a740e510c4f2ff2d66bdb6fc18',
            },
          }
        );

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
          <h1 className='font-bold text-4xl px-6'>Top 10 Movies</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-2 mb-6">
              <ul className='sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center'>
                {topMovies.slice(0, 10).map((movie, id) => (
                  <li 
                    className="mx-auto px-2"  
                    key={id}
                  >
                    <div
                      data-testid="movie-card" 
                      className="bg-gray-900 pb-3 my-10 text-white cursor-pointer rounded-[15px]"
                    >
                      <img 
                        data-testid="movie-poster"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-[15px] w-full h-[50%]"
                        onClick={()=>navigate(`/movie/${movie.id}`)}
                      />
                      <div className='flex justify-between items-center mx-3'>
                        <p data-testid="movie-release-date" className="pl-3 pt-3 font-bold text-gray-50">{new Date(movie.release_date).toLocaleString('default', { year: 'numeric' })}</p>
                        <LikedButton />
                      </div>
                      <h2 data-testid="movie-title" className="pt-2 pl-3 font-bold text-gray-50 text-2xl">{movie.title}</h2>
                      <div className='flex justify-between items-center mx-3'>                        
                        <div className="flex justify-start items-center pt-2  space-x-2">
                          <p data-testid="movie-apiName" className="px-2 py-1 bg-yellow-500 w-[62px] rounded font-bold">IMDb</p>
                          <p data-testid="movie-vote-average" className="font-medium text-lg"> {movie.vote_average * 10 } / 100 </p>
                        </div>
                        <p className="font-medium text-lg"> {movie.vote_average * 10 }%</p>
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
