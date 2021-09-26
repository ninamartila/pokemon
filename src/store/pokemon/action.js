import store from '..'
import {
    POKEMON_ERROR,
    POKEMON_LOADING,
    POKEMON_SUCCESS,
    DETAIL_POKEMON_ERROR,
    DETAIL_POKEMON_LOADING,
    DETAIL_POKEMON_SUCCESS
} from './actionType'

export function setPokemonLoading(payload) {
    return {
        type: POKEMON_LOADING,
        payload
    }
}

export function setPokemonSuccess(payload) {
    return {
        type: POKEMON_SUCCESS,
        payload
    }
}

export function setPokemonError(payload) {
    return {
        type: POKEMON_ERROR,
        payload
    }
}

export function getPokemonList(isLoadMore) {
    return async function (dispatch, getState) {
        const { nextUrl } = store.getState().pokemon
        try {
            dispatch(setPokemonLoading(true))
            fetch(!isLoadMore ? `https://pokeapi.co/api/v2/pokemon?limit=12&offset=0` : nextUrl)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then(async (data) => {
                    const result = []
                    for (let index = 0; index < data.results.length; index++) {
                        const element = data.results[index];
                        const responseDetail = await fetch(element.url);
                        if (responseDetail.status === 200) {
                            const json = await responseDetail.json()
                            result.push({ ...json, url: element.url })
                        }
                    }
                    dispatch(setPokemonSuccess({ list: result, nextUrl: data.next, isRefresh: !isLoadMore }))
                })
                .catch(err => {
                    dispatch(setPokemonError(err))
                })
                .finally(() => dispatch(setPokemonLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}

export function setDetailPokemonLoading(payload) {
    return {
        type: DETAIL_POKEMON_LOADING,
        payload
    }
}

export function setDetailPokemonSuccess(payload) {
    return {
        type: DETAIL_POKEMON_SUCCESS,
        payload
    }
}

export function setDetailPokemonError(payload) {
    return {
        type: DETAIL_POKEMON_ERROR,
        payload
    }
}

export function pokemonDetail(url) {
    return async function (dispatch, getState) {
        try {
            dispatch(setDetailPokemonLoading(true))
            fetch(`${url}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then(async (data) => {
                    dispatch(setDetailPokemonSuccess(data))
                })
                .catch(err => {
                    dispatch(setDetailPokemonError(err))
                })
                .finally(() => dispatch(setDetailPokemonLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}