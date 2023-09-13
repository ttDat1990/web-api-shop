import { combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    // Add other reducers here if needed
});

export default rootReducer;
