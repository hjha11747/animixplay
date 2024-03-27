import React, { useState } from 'react'
import Popular from './Popular'
import { X, Menu } from 'lucide-react'
import { useGlobalContext } from '../context/GlobalContext'
import Upcoming from './Upcoming';
import Airing from './Airing';
import Watchlist from './Watchlist';

function HomePage() {
    const {addToWatchlist, handleSubmit, searchAnime, search, handleChange, getAiringAnime, getPopularAnime, getUpcomingAnime } = useGlobalContext();
    const [rendered, setRendered] = useState('popular');

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            case 'watchlist':
                return <Watchlist rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    const [open, setopen] = useState(false);

    const toggleNavbar = () => {
        setopen(!open);
    }

    return (
        <header >
            <div className=' mt-0 max-w-full flex justify-between p-4 max-large:px-1  text-black bg-gray-800 sticky top-0 z-20' >
                <div onClick={() => {
                    setRendered('popular');
                    getPopularAnime()
                }} className=" text-slate-200 text-3xl font-semibold font-serif ml-10 cursor-pointer hover:text-indigo-300 max-large:ml-0 max-large:p-0 max-sm:text-[17px]">
                    AnimixWatch
                </div>
                <div className=' flex  '>
                    <div className="flex justify-between gap-11 text-cyan-200 font-medium max-xl:gap-7 max-xl:text-base max-[900px]:hidden">
                        <div className={`hover:text-cyan-600 ${rendered === 'popular' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('popular'); getPopularAnime(); }}>POPULAR</button>
                        </div>
                        <div className={`hover:text-cyan-600 ${rendered === 'airing' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('airing'); getAiringAnime(); }}>AIRING</button>
                        </div>
                        <div className={`hover:text-cyan-600 ${rendered === 'upcoming' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('upcoming'); getUpcomingAnime(); }}>UPCOMING</button>
                        </div>

                        <form action="" className="" onSubmit={handleSubmit}>
                            <div className=" border-[3px] border-black rounded-xl text-black ">
                                <input type="text" placeholder='search' value={search} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className='large:hidden flex sm:gap-48 max-sm:gap-6 text-center' >
                    {open && (
                            <div className=' max-sm:text-xs max-miniphones:text-[10px] max-md:text-sm'>
                                <div className={`hover:text-cyan-600 ${rendered === 'popular' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                                    <button onClick={() => { setRendered('popular'); getPopularAnime(); }}>POPULAR</button>
                                </div>
                                <div className={`hover:text-cyan-600 ${rendered === 'airing' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                                    <button onClick={() => { setRendered('airing'); getAiringAnime(); }}>AIRING</button>
                                </div>
                                <div className={`hover:text-cyan-600 ${rendered === 'upcoming' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                                    <button onClick={() => { setRendered('upcoming'); getUpcomingAnime(); }}>UPCOMING</button>
                                </div>
                                <form action="" className="" onSubmit={handleSubmit}>
                            <div className=" border-[3px] border-black rounded-xl text-black ">
                                <input type="text" placeholder='search' value={search} onChange={handleChange} />
                            </div>
                        </form>
                            </div>

                        )}
                        <div className=' text-white '>
                            <button onClick={toggleNavbar}>{open ? <X /> : <Menu />} </button>
                        </div>
                        </div>


                    </div>
                </div>
            {switchComponent()}
        </header>

    );
}

export default HomePage;
