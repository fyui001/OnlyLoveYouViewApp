import State from './state'

export default function reducer(state = new State(), action: any) {
  switch (action.type) {
    case 'GET_ITEM_LIST_REQUEST':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'GET_ITEM_LIST_SUCCESS':
      return Object.assign({}, state, {
        fetchedData: action.response,
        isFetching: true,
        isLoading: false
      })
    case 'GET_ITEM_LIST_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isLoading: false,
        errorMsg: action.errorMsg
      })
    default:
      return state
  }
}
