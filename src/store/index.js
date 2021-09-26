import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
import reducerPokemon from './pokemon/reducer'

const store = createStore(combineReducers({
    pokemon: reducerPokemon,
}), applyMiddleware(logger, thunk))

export default store