import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Footer from '../components/footer';
import MovieSearch from './MovieSearch';
import LikedButton from './likedButton';

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '8b7b40a740e510c4f2ff2d66bdb6fc18',
            },
          }
        );

        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <>
        <MovieSearch />
      <div className='bg-gray-200 mt-[-20px] pt-3'>
        {loading ? (
          <Spinner />
        ) : (
          <div  data-testid="movie-card" className="flex m-auto bg-gray-900 
          text-white my-[-16px] font-medium justify-center items-center"
          >
            <div className='w-[400%]'>
              <img 
                data-testid="movie-poster"
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} 
                alt={movieDetails.title} 
                className="rounded w-full h-[100%]" 
              />
            </div>
            <div className='space-y-2 ml-4'>
              <h1 data-testid="movie-title" className='pt-2 text-3xl'>{movieDetails.title}</h1>
              <p data-testid="movie-release-date" className='pt-2 text-lg'>
                {movieDetails.release_date}
              </p>
              <p data-testid="movie-runtime" className='pt-2 text-lg'>
              {movieDetails.runtime} minutes
              </p>
              <p data-testid="movie-overview" className='pt-2 '>
                {movieDetails.overview}
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MovieDetails;