import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'



const AnimeItem = () => {
    const { dispatch, wishlist } = useGlobalContext();
    

    const { id } = useParams()
    const [anime, setAnime] = useState({})

    const [showMore, setShowMore] = useState(false)

    const [animeAdded, setAnimeAdded] = useState(false);
    const [buttonClassName, setButtonClassName] = useState('p-2 mt-2 bg-blue-800 rounded-lg font-medium');
    const [buttonText, setButtonText] = useState('ADD TO MY WATCHLIST');

    const addToWishlist = () => {
        if (!animeAdded) {
            dispatch({ type: "ADD_TO_WISHLIST", payload: anime });
            setAnimeAdded(true);
            setButtonClassName('p-2 mt-2 bg-green-700 rounded-lg font-medium');
            setButtonText('ADDED TO WATCHLIST');
        }
    };

    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
    }

    useEffect(() => {
        let storedAnime = wishlist.find(o => o.mal_id === anime.mal_id);
        if (storedAnime) {
            setAnimeAdded(true);
            setButtonText('ADDED TO WATCHLIST');
        } else {
            setAnimeAdded(false);
            setButtonText('ADD TO MY WATCHLIST');
        }
    }, [wishlist, anime]);


    let storedAnime = wishlist.find(o => o.mal_id === anime.mal_id);
    const animeWatched = storedAnime ? true : false
    useEffect(() => {
        const getAnime = async (animeId) => {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
            const data = await response.json();
            setAnime(data.data);
        };
        getAnime(id);
    }, [id]);


    const { aired, synopsis, title, images, popularity, rank, score, source, status, year, rating, episodes, genres } = anime
    



    return (<div className=' flex items-center justify-center  pt-3'>
        <div className=' px-5  h-[500px] w-[700px] max-md:h-[500px] max-md:w-[600px] max-sm:h-[916px] bg-stone-900  items-center rounded-lg lg:h-[600px]  lg:w-[800px] xl:h-[600px]  xl:w-[800px]'>
            <h1 className='text-center text-2xl p-3 text-white font-bold'>
                {showMore ? title : title ? title.substring(0, 45) + '' : ''}
            </h1>



            <div className="flex justify-center gap-6 
            max-phones:block ">
                <div className="">
                    <img className='h-[400px] w-[330px] max-phones:h-[450px] max-phones:w-[330px] rounded-lg max-sm:m-auto lg:h-[500px]  lg:w-[380px] xl:h-[500px]  xl:w-[380px] ' src={images?.jpg.large_image_url} alt="" />
                </div>
                <div className="text-white pt-3 lg:mt-4 xl:text-lg max-sm:m-auto max-sm:text-[14px]">
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium"> Aired: </span>{aired?.string}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px]  '><span className="font-medium">Rating: </span>{rating}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium">Rank: </span>{rank}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px]'><span className="font-medium">Popularity: </span>{popularity}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px]'><span className="font-medium">Genres: </span>
                        {genres && genres.map((genre, index) => (
                            <span key={genre.mal_id}>
                                <span style={{ fontWeight: 400 }}>{genre.name} </span>
                                {index !== genres.length - 1 && <span>, </span>}
                            </span>
                        ))}
                    </p>

                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium">Score: </span>{score}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium">Source: </span>{source}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium">Episode: </span>{episodes}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium">Status: </span>{status}</p>
                    <p className='mb-[6px] lg:mb-[12px] xl:mb-[10px] '><span className="font-medium">Year: </span>{year}</p>
                    <div className="flex gap-6 max-phones:block ">
                        <button
                            className={animeAdded ? 'p-2 mt-2 bg-green-700 rounded-lg font-medium' : 'p-2 mt-2 bg-blue-800 rounded-lg font-medium'}
                            onClick={addToWishlist}
                            disabled={animeWatched}
                        >
                            {buttonText}
                        </button>


                    </div>
                </div>

            </div>
            <div className=" p-5 rounded-xl mt-14 text-white bg-slate-800" >
                <h4 className=' font-semibold'>{title} :</h4>
                <p className=' text-sm'>
                    {showMore ? synopsis : synopsis?.substring(0, 300) + '...'}
                      <button className=' ml-2 text-[14px]' onClick={() => {
                        setShowMore(!showMore)
                    }}>  { showMore ? ' Show Less ' : ' Read More '}</button>
                </p>
            </div>
        </div>
    </div>
    )
}

export default AnimeItem


