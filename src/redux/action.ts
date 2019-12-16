import axios from 'axios'

export const getItemListRequest = () => {
  return {
    type: 'GET_ITEM_LIST_REQUEST'
  }
}

export const getItemListSuccess = (response: any[]) => {
  return {
    type: 'GET_ITEM_LIST_SUCCESS',
    isFetching: true,
    isLoading: false,
    response: response
  }
}

export const getItemListFailure = (errorMsg: any) => {
  return {
    type: 'GET_ITEM_LIST_FAILURE',
    isFetcing: false,
    isLoadhing: false,
    errorMsg
  }
}

export const getItemLists = (pageNum: number) => {
  return (dispatch: any) => {
    dispatch(getItemListRequest())
    axios({
      method: 'GET',
      url: 'https://app.mogamin.net/api/only_love_you/get',
      params: {
        page: pageNum
      }
    }).then((result: any) => {
      const response: any = result.data
      if (response.status) {
        return dispatch(getItemListSuccess(response.resultData))
      } else {
        return dispatch(getItemListFailure(response.msg))
      }
    }).catch( () => {
      return dispatch(getItemListFailure('何も見つかりませんでした'))
    })
  }
}

export const searchItemLists = (pageNum: number, searchWord: string) => {
  return (dispatch: any) => {
    dispatch(getItemListRequest())
    axios({
      method: 'GET',
      url: 'https://app.mogamin.net/api/only_love_you/search',
      params: {
        page: pageNum,
        searchKeyword: searchWord
      }
    }).then((result: any) => {
      const response: any = result.data
      if (response.status) {
        return dispatch(getItemListSuccess(response.resultData))
      } else {
        return dispatch(getItemListFailure(response.msg))
      }
    }).catch(() => {
      return dispatch(getItemListFailure('何も見つかりませんでした'))
    })
  }
}
