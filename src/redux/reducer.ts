import State, { RootStateType } from './state'
import { Actions } from './action'

export default function reducer(state = { ...State }, action: Actions): RootStateType {
  switch ('type' in action && action.type) {
    case 'GET_ITEM_LIST_REQUEST':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_ITEM_LIST_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    case 'GET_ITEM_LIST_FAILURE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
