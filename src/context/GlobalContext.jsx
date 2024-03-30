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
    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
    };

    // FETCH AIRING ANIME
    const getAiringAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({ type: GET_AIRING_ANIME, payload: data.data });
    };

    // FETCH POPULAR ANIME
    const getPopularAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    };

    // SEARCH ANIME
    const searchAnime = async (anime) => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({ type: SEARCH, payload: data.data });
    };

    useEffect(() => {
        getPopularAnime();
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
