import {
    POKEMON_ERROR,
    POKEMON_LOADING,
    POKEMON_SUCCESS,
    DETAIL_POKEMON_ERROR,
    DETAIL_POKEMON_LOADING,
    DETAIL_POKEMON_SUCCESS
} from './actionType'

const initialState = {
    pokemonList: [],
    nextUrl: null,
    isLoadingPokemon: false,
    isErrorPokemon: null,
    isDataDetailPokemon: null,
    isLoadingDetailPokemon: false,
    isErrorDetailPokemon: null,
}

export default function reducerPokemon(state = initialState, action) {
    switch (action.type) {
        case POKEMON_LOADING:
            return {
                ...state,
                isLoadingPokemon: action.payload
            }
        case POKEMON_SUCCESS:
            const { list, nextUrl, isRefresh } = action.payload
            return {
                ...state,
                pokemonList: isRefresh ? list : [...state.pokemonList, ...list],
                nextUrl,
            }
        case POKEMON_ERROR:
            return {
                ...state,
                isErrorPokemon: action.payload
            }
        case DETAIL_POKEMON_LOADING:
            return {
                ...state,
                isLoadingDetailPokemon: action.payload
            }
        case DETAIL_POKEMON_SUCCESS:
            return {
                ...state,
                isDataDetailPokemon: action.payload,
            }
        case DETAIL_POKEMON_ERROR:
            return {
                ...state,
                isErrorDetailPokemon: action.payload
            }

        default:
            return state
    }
}