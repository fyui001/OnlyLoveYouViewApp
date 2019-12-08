import axios from 'axios'

export const getItemListRequest = (itemLists: any[]) => {
  return {
    type: 'GET_ITEM_LIST_REQUEST',
    itemList: itemLists
  }
}

export const getItemLists = () => {
  return (dispatch: any) => {
    axios({
            method: 'GET',
            url: 'https://app.mogamin.net/api/only_love_you',
          }).then((result: any) => {
            return dispatch(getItemListRequest(result.data.resultData.data))
    })
  }
}
