import { Action, Dispatch } from 'redux'
import { fetchOnlyLoveYou, FetchOnlyLoveYouResponse, fetchOnlyLoveYouSearch } from '../client/onlyLoveYouAPI'
import { ThunkAction } from 'redux-thunk'
import { RootStateType } from './state'

enum ActionTypes {
  GET_ITEM_LIST_REQUEST = 'GET_ITEM_LIST_REQUEST',
  GET_ITEM_LIST_SUCCESS = 'GET_ITEM_LIST_SUCCESS',
  GET_ITEM_LIST_FAILURE = 'GET_ITEM_LIST_FAILURE'
}

export const getItemListRequest = () => {
  return {
    type: ActionTypes.GET_ITEM_LIST_REQUEST,
    payload: {}
  }
}

export const getItemListSuccess = (response: FetchOnlyLoveYouResponse['resultData']) => {
  return {
    type: ActionTypes.GET_ITEM_LIST_SUCCESS,
    payload: {
      isFetching: true,
      isLoading: false,
      fetchedData: response
    }
  }
}

export const getItemListFailure = (errorMsg: string) => {
  return {
    type: ActionTypes.GET_ITEM_LIST_FAILURE,
    payload: {
      isFetching: false,
      isLoading: false,
      errorMsg
    }
  }
}

export const getItemListsAsync = (pageNum: number): ThunkAction<void, RootStateType, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(getItemListRequest())
    try {
      const result = await fetchOnlyLoveYou({ page: pageNum })
      if ('resultData' in result) {
        return dispatch(getItemListSuccess(result.resultData))
      } else {
        return dispatch(getItemListFailure(result.msg))
      }
    } catch {
      return dispatch(getItemListFailure('何も見つかりませんでした'))
    }
  }
}

export const searchItemListsAsync = (
  pageNum: number,
  searchWord: string
): ThunkAction<void, RootStateType, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(getItemListRequest())
    try {
      const result = await fetchOnlyLoveYouSearch({ page: pageNum, searchKeyword: searchWord })
      if ('resultData' in result) {
        return dispatch(getItemListSuccess(result.resultData))
      } else {
        return dispatch(getItemListFailure(result.msg))
      }
    } catch {
      return dispatch(getItemListFailure('何も見つかりませんでした'))
    }
  }
}

export type Actions =
  | ReturnType<typeof getItemListRequest>
  | ReturnType<typeof getItemListSuccess>
  | ReturnType<typeof getItemListFailure>
