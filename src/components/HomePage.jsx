import React, { useState } from 'react'
import Popular from './Popular'
import { X, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Upcoming from './Upcoming';
import Airing from './Airing';
import Wishlist from './Watchlist';

function HomePage() {
    const { handleSubmit, search, handleChange, getAiringAnime, getPopularAnime, getUpcomingAnime } = useGlobalContext();
    const [rendered, setRendered] = useState('popular');
    const location = useNavigate();


    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            case 'wishlist':
                return <Wishlist rendered={rendered} />;

            default:
                return <Wishlist rendered={rendered} />;
        }
    };

    const [open, setOpen] = useState(false);
    const [searchBar, setSearchBar] = useState(false);

    const toggleNavbar = () => {
        setOpen(!open);
    }

    const toggleSearchBar = () => {
        setSearchBar(!searchBar);
        if (!searchBar) {
            handleChange({ target: { value: '' } });
        }
    }

    const clearSearch = () => {
        handleChange({ target: { value: '' } });
    }

    return (
        <header>

            <div className=' max-large:block max-w-full flex justify-between  large:p-4 max-large:px-1 max-sm:px-3 text-black bg-gray-800 sticky top-[-2px] px-2 z-50'>
                <div onClick={() => {
                    setRendered('popular');
                    getPopularAnime()
                }} className=" font-body text-slate-300  text-3xl font-semibold ml-10 cursor-pointer hover:text-indigo-300 max-large:ml-0 max-large:p-0 max-sm:text-[32px] max-large:pt-5  max-lg:inline-block max-small-phones:pt-1">
                    Animix<span className='text-indigo-700'>Watch</span>
                </div>


                <div className=''>
                    <div className="flex justify-between gap-11 text-cyan-200 font-medium max-xl:gap-7 max-xl:text-base max-[900px]:hidden">
                        <div className={`hover:text-cyan-600 ${rendered === 'popular' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('popular'); getPopularAnime(); }}>POPULAR</button>
                        </div>

                        <div className={`hover:text-cyan-600 ${rendered === 'airing' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('airing'); getAiringAnime(); }}>ONGOING</button>
                        </div>

                        <div className={`hover:text-cyan-600 ${rendered === 'upcoming' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('upcoming'); getUpcomingAnime(); }}>UPCOMING</button>
                        </div>

                        <div className={`hover:text-cyan-600 ${rendered === 'wishlist' ? 'text-cyan-600' : 'text-cyan-200 '}`}>
                            <button onClick={() => { setRendered('wishlist'); }}>WATCHLIST</button>
                        </div>
               

                        
                            <form action="" onSubmit={handleSubmit}>
                                <div className="border-[3px] border-slate-500 rounded-xl text-black">
                                    <input
                                        className='h-8 pl-2 bg-transparent text-cyan-600 outline-none border-none'
                                        type="text"
                                        autoComplete='off'
                                        placeholder='search'
                                        value={search}
                                        onChange={handleChange}
                                    />
                                    {search && (
                                        <button onClick={clearSearch} type="button" className="text-slate-400 mr-2">
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            </form>
                    

                    </div>

                    <div className='flex justify-center'>
                        <div className=" w-100 h-8 large:hidden  max-phones:gap-20 text-center ">
                            {searchBar && (
                                <form action="" className="" onSubmit={handleSubmit}>
                                    <div className="border-[3px] border-slate-500 rounded-xl text-black">
                                        <input
                                            className=' pl-2 bg-transparent text-cyan-600
                                            outline-none
                                            border-none
                                            '
                                            type="text"
                                            placeholder='search'
                                            value={search}
                                            onChange={handleChange}

                                        />

                                        {search && (
                                            <button onClick={clearSearch} type="button" className="text-slate-400">
                                                <X className='pt-1' size={18} />
                                            </button>
                                        )}

                                    </div>
                                </form>
                            )}
                            <button className=' text-slate-400' onClick={toggleSearchBar}>
                                <Search className=' absolute max-small-phones:top-2 top-7 right-12' />
                            </button>
                        </div>
                    </div>

                    <div className='text-center'>
                        <div className='large:hidden  max-miniphones:gap-7 max-phones:gap-20 text-center'>
                            <div className='text-slate-400 absolute max-small-phones:top-2 top-7  right-3'>
                                <button onClick={toggleNavbar}>{open ? <X /> : <Menu />} </button>
                            </div>

                            <div className='flex justify-center '>
                                {open && (
                                    <div className='max-sm:text-base max-miniphones:text-[10px] max-md:text-[13px] flex gap-4 '>
                                        <div className={`mb-1 ${rendered === 'popular' ? 'text-cyan-600' : 'text-cyan-200'} rounded-[2px]`}>
                                            <button onClick={() => { setRendered('popular'); getPopularAnime(); }}>POPULAR</button>
                                        </div>

                                        <div className={`${rendered === 'airing' ? 'text-cyan-600' : 'text-cyan-200'} rounded-[2px] `}>
                                            <button onClick={() => { setRendered('airing'); getAiringAnime(); }}>ONGOING</button>
                                        </div>

                                        <div className={`${rendered === 'upcoming' ? 'text-cyan-600' : 'text-cyan-200'} mb-1 rounded-[2px]`}>
                                            <button onClick={() => { setRendered('upcoming'); getUpcomingAnime(); }}>UPCOMING</button>
                                        </div>

                                        <div className={`${rendered === 'wishlist' ? 'text-cyan-600' : 'text-cyan-200'} mb-1 rounded-[2px]`}>
                                            <button onClick={() => { setRendered('wishlist'); }}>WATCHLIST</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {switchComponent()}
        </header>
    );
}

export default HomePage;
