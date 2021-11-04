import {CLICK_TYPEIN, DELETE, TYPE_DIVIDE_TIMES} from '../constant'
// import store from '../store'

export const clickTypeInAction = data => ({type: CLICK_TYPEIN, data})

export const deleteAction = data => ({type: DELETE, data})

export const typeDivideTimesAction = data => ({type: TYPE_DIVIDE_TIMES, data})