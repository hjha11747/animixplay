import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import '../App.css'

function Popular({ rendered }) {
  const { popularAnime, searchResult } = useGlobalContext();

  const renderAnimeList = (animeList) => {
    const seenIds = new Set();
    return animeList?.filter(anime => {
      if (seenIds.has(anime.mal_id)) {
        return false;
      }
      seenIds.add(anime.mal_id);
      return true;
    }).map((anime) => (
      <div key={anime.mal_id} className='flex'>
        <Link to={`/anime/${anime.mal_id}`}>
          <img className='anime-image h-[290px] w-[250px] md:h-[330px] md:w-[270px] lg:h-[350px] lg:w-[300px] xl:h-[360px] rounded-md hover:scale-105 transition duration-700' src={anime.images.jpg.large_image_url} alt="" />
          <h1 className='text-white text-[18px] font-semibold text-center max-sm:text-sm max-md:text-base'>{anime.title}</h1>
        </Link>
      </div>
    ));
  };

  const animeList = rendered === 'search' ? searchResult : popularAnime;
  return (
    <div className='p-2 m-0 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 md:p-7 lg:grid-cols-4 lg:gap-7'>
      {renderAnimeList(animeList)}
    </div>
  );
}

export default Popular;
