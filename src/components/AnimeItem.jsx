import React, { useEffect, useState,useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import Watchlist from './Watchlist'


const AnimeItem = () => {
    const { id } = useParams()

    const {addToWatchlist,watchlist}=useContext(GlobalContext);
    let storedAnime = watchlist.find(o => o.mal_id === anime.mal_id)
    const watchlistDisabled = storedAnime ? true : false;



    const [anime, setAnime] = useState({})
    const [showMore, setShowMore] = useState(false)

    const { aired, synopsis, title, images, trailer
        , popularity, rank, score, source, status, year, rating, episodes, genres } = anime

    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
        console.log(data.data)
    }

    useEffect(() => {
        getAnime(id)
    }, [])

    return (<div className=' flex items-center justify-center  pt-3'>
        <div className=' px-5  h-[500px] w-[700px] max-md:h-[500px] max-md:w-[600px] max-sm:h-[830px] bg-stone-900  items-center rounded-lg '>
            <h1 className='text-center text-2xl p-3 text-white font-bold'>
                {showMore ? title : title ? title.substring(0, 45) + '' : ''}
            </h1>



            <div className="flex justify-center gap-6 
            max-phones:block ">
                <div className="">
                    <img className='h-[400px] w-[360px] max-phones:h-[450px] max-phones:w-[400px] rounded-lg max-sm:m-auto ' src={images?.jpg.large_image_url} alt="" />
                </div>
                <div className="text-white font-semibold max-sm:m-auto">
                    <p><span>Aired: </span>{aired?.string}</p>
                    <p><span>Rating: </span>{rating}</p>
                    <p><span>Rank: </span>{rank}</p>
                    <p><span>Popularity:</span>{popularity}</p>
                    <p><span >Genres:</span>
                        {genres && genres.map(genre => (
                            <span style={{ fontWeight: 100 }} key={genre.mal_id}>{genre.name}</span>
                        ))}
                    </p>
                    <p><span>Score:</span>{score}</p>
                    <p><span>Source:</span>{source}</p>
                    <p><span>Episode:</span>{episodes}</p>
                    <p><span>Status:</span>{status}</p>
                    <p><span>Year:</span>{year}</p>
                    <button disable={watchlistDisabled} onClick={() => addToWatchlist(anime)} className='p-2 mt-5 bg-cyan-700 rounded-lg font-medium'>ADD TO MY WATCHLIST </button>
                </div>
            </div>
            <div className=" p-5 rounded-xl mt-14 text-white bg-slate-800" >
                <h4 className=' font-semibold'>{title} :</h4>
                <p className=' text-sm'>
                    {showMore ? synopsis : synopsis?.substring(0, 300) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less' : 'Read More'}</button>
                </p>
            </div>
        </div>
    </div>
    )
}

export default AnimeItem