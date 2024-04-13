import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function Watchlist({ rendered }) {
  const { wishlist, dispatch } = useGlobalContext();

  const handleDelete = (mal_id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: mal_id });
  };

  const conditionalRender = () => {
    if (rendered === 'wishlist') {
      return wishlist?.map((anime) => {
        return (
          <div className='text-center' key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`}>
              {anime.images?.jpg?.large_image_url && (
                <img className='h-[290px] w-[250px] md:h-[330px] md:w-[270px] lg:h-[400px] lg:w-[305px] xl:h-[380px] rounded-md hover:scale-105  transition duration-700' src={anime.images.jpg.large_image_url} alt="" />
              )}
              <h1 className='text-white text-[18px] font-semibold text-center max-sm:text-sm max-md:text-base'>{anime.title}</h1>
            </Link>
            <button className='p-2 mt-2 bg-blue-800 rounded-lg font-medium text-white' onClick={() => handleDelete(anime.mal_id)}>Delete</button>
          </div>
        );
      })
    }
  };

  return (
    <div className='p-2 m-0 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 md:p-7 lg:grid-cols-4 lg:gap-7'>
      {conditionalRender()}
    </div>
  );
}

export default Watchlist;
