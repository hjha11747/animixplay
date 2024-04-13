import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

export const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

// ACTIONS
const LOADING = 'LOADING';
const SEARCH = 'SEARCH';
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME';
const GET_UPCOMING_ANIME = 'GET_UPCOMING_ANIME';
const GET_AIRING_ANIME = 'GET_AIRING_ANIME';
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResult: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false };
        case ADD_TO_WISHLIST:
            return { ...state, wishlist: [...state.wishlist, action.payload], loading: false };
        default:
            return { ...state, wishlist: [], loading: false };
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(anime => anime.mal_id !== action.payload)
            };
    }
};


export const GlobalContextProvider = ({ children }) => {

    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResult: [],
        wishlist: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        if (e.target.value === '') {
            state.isSearch = false;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
            state.isSearch = true;
        } else {
            state.isSearch = false;
            alert("Please enter valid keywords.");
        }
    };

    // FETCH UPCOMING ANIME
    const getUpcomingAnime = async (maxPages = 3) => {
        dispatch({ type: LOADING });
        let allAnime = [];
        try {
            for (let page = 1; page <= maxPages; page++) {
                const response = await fetch(`${baseUrl}/top/anime?filter=upcoming&page=${page}`);
                const data = await response.json();
                allAnime = allAnime.concat(data.data);
                if (!data.pagination.has_next_page) {
                    break;
                }
            }
            dispatch({ type: GET_UPCOMING_ANIME, payload: allAnime });
        } catch (error) {
            console.error('Failed to fetch upcoming anime:', error);
            dispatch({ type: GET_UPCOMING_ANIME, payload: [] });  // handle error case by setting empty array
        }
    };
    

    // FETCH AIRING ANIME  getAiringAnime
    const getAiringAnime = async (maxPages = 3) => {
        dispatch({ type: LOADING });
        let allAnime = [];
        try {
            for (let page = 1; page <= maxPages; page++) {
                const response = await fetch(`${baseUrl}/top/anime?filter=airing&page=${page}`);
                const data = await response.json();
                allAnime = allAnime.concat(data.data);
                if (!data.pagination.has_next_page) {
                    break;
                }
            }
            dispatch({ type: GET_AIRING_ANIME, payload: allAnime });
        } catch (error) {
            console.error('Failed to fetch airing anime:', error);
            dispatch({ type: GET_AIRING_ANIME, payload: [] });  // handle error case by setting empty array
        }
    };
    

    // FETCH POPULAR ANIME
// FETCH POPULAR ANIME from Multiple Pages
const getPopularAnime = async (maxPages = 3) => {
    dispatch({ type: LOADING });
    let allAnime = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity&page=${page}`);
            const data = await response.json();
            allAnime = allAnime.concat(data.data);
            if (data.pagination.has_next_page === false) {
                break;
            }
        }
        dispatch({ type: GET_POPULAR_ANIME, payload: allAnime });
    } catch (error) {
        console.error('Failed to fetch popular anime:', error);
        dispatch({ type: GET_POPULAR_ANIME, payload: [] });
    }
};


    // SEARCH ANIME
// Fetch SEARCH RESULTS from Multiple Pages
const searchAnime = async (searchQuery, maxPages = 3) => {
    dispatch({ type: LOADING });
    let allAnime = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${baseUrl}/anime?q=${encodeURIComponent(searchQuery)}&order_by=popularity&sort=asc&sfw&page=${page}`);
            const data = await response.json();
            allAnime = allAnime.concat(data.data);
            if (!data.pagination.has_next_page) {
                break; // Stop fetching more pages if there are no further pages
            }
        }
        dispatch({ type: SEARCH, payload: allAnime });
    } catch (error) {
        console.error(`Failed to fetch search results for "${searchQuery}":`, error);
        dispatch({ type: SEARCH, payload: [] }); // Handle error by setting the search results to an empty array
    }
};


    useEffect(() => {
        getPopularAnime(2);
    }, []);


    useEffect(()=>{
        localStorage.setItem("wishlist" ,JSON.stringify(state.wishlist))
    },[state])

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            search,
            getAiringAnime,
            getPopularAnime,
            getUpcomingAnime,
            dispatch,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
