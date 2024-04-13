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
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(anime => anime.mal_id !== action.payload)
            };
        default:
            return state;  // Fixed default case to just return the current state
    }
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (i < retries - 1) {
                await sleep(delay);
            } else {
                console.error(`Failed to fetch after ${retries} attempts:`, error);
                throw error;
            }
        }
    }
}

export const GlobalContextProvider = ({ children }) => {
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        searchResult: [],
        wishlist: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            state.isSearch = false;
        }
    };

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

    const getAnime = async (type, filter) => {
        dispatch({ type: LOADING });
        let allAnime = [];
        try {
            for (let page = 1; page <= 2; page++) {
                const data = await fetchWithRetry(`${baseUrl}/top/anime?filter=${filter}&page=${page}`);
                allAnime = allAnime.concat(data.data);
                if (!data.pagination.has_next_page) {
                    break;
                }
            }
            dispatch({ type, payload: allAnime });
        } catch (error) {
            console.error(`Failed to fetch ${type.toLowerCase()}:`, error);
            dispatch({ type, payload: [] });
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

    const getPopularAnime = () => getAnime(GET_POPULAR_ANIME, 'bypopularity');
    const getAiringAnime = () => getAnime(GET_AIRING_ANIME, 'airing');
    const getUpcomingAnime = () => getAnime(GET_UPCOMING_ANIME, 'upcoming');

    useEffect(() => {
        (async () => {
            await getPopularAnime();
            await sleep(2000);  // Delay subsequent fetches to avoid hitting rate limit
            await getAiringAnime();
            await sleep(2000);
            await getUpcomingAnime();
        })();
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    }, [state.wishlist]);

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

export const useGlobalContext = () => useContext(GlobalContext);

