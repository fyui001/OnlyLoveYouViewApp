import State from './state'

export default function reducer(state = new State(), action: any) {
    switch (action.type) {
        case 'GET_ITEM_LIST_REQUEST':
            return Object.assign({}, state ,{
                searchWord: '',
                itemList: action.itemList
            })
      case 'GET_ITEM_LIST_SEARCH':
        return Object.assign({}, state, {

        })
      default:
        return state
    }
}
