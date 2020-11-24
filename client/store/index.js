
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

//below is just a placeholder reducer to show the relationship between a reducer and this index file
import dummyReducer from './dummyReducer.js'


//i'll create a pre-emptive combined reducer, just to make it easier to seperate out seperate reducers from the store creation

const reducer = combineReducers({dummyReducer})

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
)


export default store

//make sure to use connect and dispatch methods to actually be able to use this store correctly.
