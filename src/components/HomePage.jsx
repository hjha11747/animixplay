import React, { useState } from 'react'
import Popular from './Popular'
import { useGlobalContext } from '../context/GlobalContext'
import Upcoming from './Upcoming';
import Airing from './Airing';

function HomePage() {
    const { handleSubmit, searchAnime, search, handleChange, getAiringAnime, getPopularAnime, getUpcomingAnime } = useGlobalContext();
    const [rendered, setRendered] = useState('popular');

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    return (
        <div>
            <header>
                <div className="logo">
                AnimixWatch
                </div>
                <div className="search-container">
                    <div className="text-white">
                        <button onClick={() => { setRendered('popular'); getPopularAnime(); }}>POPULAR</button>
                    </div>
                    <div className="text-white">
                        <button onClick={() => { setRendered('airing'); getAiringAnime(); }}>AIRING</button>
                    </div>
                    <div className="text-white">
                        <button onClick={() => { setRendered('upcoming'); getUpcomingAnime(); }}>UPCOMING</button>
                    </div>
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder='Search Anime' value={search} onChange={handleChange} />
                        </div>
                    </form>
                </div>
                {switchComponent()}
            </header>
        </div>
        
    );
}

export default HomePage;
