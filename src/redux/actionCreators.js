import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType,
    }
}

export const removeIngredient = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType,
    }
}


export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const loadOrderFailed = () => {
    return {
        type: actionTypes.LOAD_ORDER_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch => {

    const indivisualOrders = '&orderBy="userId"&equalTo="' + userId + '"'
    axios.get('https://burgerbuilder-35587-default-rtdb.firebaseio.com/orders.json?auth=' + token + indivisualOrders)
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(err => {
            dispatch(loadOrderFailed())
        })

}