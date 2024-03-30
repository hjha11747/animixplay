import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function Airing({ rendered }) {
    const { airingAnime, isSearch, searchResult } = useGlobalContext()

    const conditionalRender = () => {
        if (!isSearch && rendered === 'airing') {
            return airingAnime?.map((anime) => {
                return (
                    <div key={anime.mal_id}>
                        <Link to={`/anime/${anime.mal_id}`}>
                            <img className='h-[290px] w-[250px] md:h-[330px] md:w-[270px] lg:h-[400px] lg:w-[385px] xl:h-[500px] rounded-md' src={anime.images.jpg.large_image_url} alt="" />
                            <h1 className='text-white text-[18px] font-semibold text-center max-sm:text-sm max-md:text-base'>{anime.title}</h1>
                        </Link>
                    </div>
                );
            })
        } else {
            return searchResult?.map((anime) => {
                return (
                    <div key={anime.mal_id}> 
                        <Link to={`/anime/${anime.mal_id}`}>
                            <img className='h-[290px] w-[250px] md:h-[330px] md:w-[270px] lg:h-[400px] lg:w-[385px] xl:h-[500px] rounded-md' src={anime.images.jpg.large_image_url} alt="" />
                            <h1 className='text-white text-[18px] font-semibold text-center max-sm:text-sm max-md:text-base'>{anime.title}</h1>
                        </Link>
                    </div>
                );
            })
        }
    }

    return (
        <div className='p-2 m-0 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 md:p-7 lg:grid-cols-4 lg:gap-7 '>
            {conditionalRender()}
        </div>
    );
}

export default Airing;
