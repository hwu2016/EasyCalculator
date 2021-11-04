import {CLICK_TYPEIN, DELETE, TYPE_DIVIDE_TIMES} from '../constant'

const initState = ''

export function typeReducer(state=initState, action){
    const {type, data} = action
    switch (type) {
        case CLICK_TYPEIN:
            return state + data
        case DELETE:
            return data.substr(0, data.length - 1)
        case TYPE_DIVIDE_TIMES:
            return state + data
        default:
            return state
    }
}