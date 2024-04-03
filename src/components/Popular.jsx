import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import '../App.css'

function Popular({ rendered }) {
  const { popularAnime, isSearch, searchResult } = useGlobalContext()

  const conditionalRender = () => {
    if (!isSearch && rendered === 'popular') {
      return popularAnime?.map((anime) => {
        return (
          <div className='flex' key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`}>
              <img className=' anime-image h-[290px] w-[250px] md:h-[330px] md:w-[270px] lg:h-[350px] lg:w-[330px] xl:h-[400px] rounded-md' src={anime.images.jpg.large_image_url} alt="" />
              <h1 className='text-white text-[18px] font-semibold text-center max-sm:text-sm max-md:text-base'>{anime.title}</h1>
            </Link>
          </div>
        );
      })
    } else {
      return searchResult?.map((anime) => {
        return (
          <div className='flex' key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`}>
            <img className='h-[290px] w-[250px] md:h-[330px] md:w-[270px] lg:h-[350px] lg:w-[330px] xl:h-[400px] rounded-md' src={anime.images.jpg.large_image_url} alt="" />
              <h1 className='text-white text-[18px] font-semibold text-center max-sm:text-sm max-md:text-base'>{anime.title}</h1>
            </Link>
          </div>
        );
      })
    }
  }

  return (
    <div className='p-2 m-0 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 md:p-7 lg:grid-cols-4 lg:gap-7'>
      {conditionalRender()}
    </div>
  );
}

export default Popular;
