import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const AnimeItem = () => {
    const { id } = useParams()

    const [anime, setAnime] = useState({})
    const [character, setCharacter] = useState([])
    const [showMore, setShowMore] = useState(false)

    const { aired, synopsis, title, images, trailer
        , popularity, rank, score, source, status, year, rating, episodes,genres } = anime

    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
        console.log(data.data)
    }

    useEffect(() => {
        getAnime(id)
    }, [])

    return (<div className='container'>
        <h1>{title}</h1>
        <div className="details">
            <div className="detail">
                <img src={images?.jpg.large_image_url} alt="" />
            </div>
            <div className="anime-details">
                <p><span>Aired: </span>{aired?.string}</p>
                <p><span>Rating: </span>{rating}</p>
                <p><span>Rank: </span>{rank}</p>
                <p><span>Popularity:</span>{popularity}</p>
                <p><span >Genres:</span>
                        {genres && genres.map(genre => (
                            <span style={{fontWeight:100}} key={genre.mal_id}>{genre.name}</span>
                        ))}
                    </p>
                <p><span>Score:</span>{score}</p>
                <p><span>Source:</span>{source}</p>
                <p><span>Episode:</span>{episodes}</p>
                <p><span>Status:</span>{status}</p>
                <p><span>Year:</span>{year}</p>
                <button>ADD TO MY WATCHLIST</button>
            </div>
        </div>
        <div className="description" >
            <h4>{title} :</h4>
            <p>
                {showMore ? synopsis : synopsis?.substring(0, 300) + '...'}
                <button onClick={() => {
                    setShowMore(!showMore)
                }}>{showMore ? 'Show Less' : 'Read More'}</button>
            </p>
        </div>
    </div>
    )
}

export default AnimeItem