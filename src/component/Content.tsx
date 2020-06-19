import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { useHistory, useParams } from 'react-router-dom'
import { getItemListsAsync, searchItemListsAsync } from '../redux/action'
import '../style/Main.css'
import { Spinner, Alert, Table } from 'react-bootstrap'
import { RootStateType } from '../redux/state'
import React, { useCallback, useEffect } from 'react'

export default function Content() {
  const history = useHistory()
  const { pageNum, word } = useParams()
  const page = pageNum ? Number(pageNum) : 1
  const fetchedData = useSelector((state: RootStateType) => state.fetchedData)
  const isFetching = useSelector((state: RootStateType) => state.isFetching)
  const isLoading = useSelector((state: RootStateType) => state.isLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    if (word) {
      // 検索モード
      dispatch(searchItemListsAsync(page, word))
    } else {
      // 全件表示モード
      dispatch(getItemListsAsync(page))
    }
  }, [dispatch, page, word])
  const handlePageChange = useCallback(
    (page: number) => {
      if (word) {
        history.push(`/search/${word}/${page}`)
      } else {
        history.push(`/a/${page}`)
      }
    },
    [history, word]
  )
  if (isLoading) {
    return (
      <div className="loading-view">
        <div className="loading-view-description">
          <Spinner className="loading-spinner" animation="grow" />
          <div className="loading-text">
            <p>ロード中...</p>
          </div>
        </div>
      </div>
    )
  } else if (!isFetching) {
    return <Alert variant="danger">何も見つかりませんでした</Alert>
  }
  return (
    <div className="main">
      <div className="content">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>投稿者</th>
              <th>投稿内容</th>
              <th>Love</th>
              <th>サーバー</th>
              <th>投稿日</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData &&
              fetchedData.data.map((item, index) => {
                return (
                  <tr className="content" key={index}>
                    <td className="user_name">{item.user}</td>
                    <td className="msg_content">{item.content}</td>
                    <td className="love">{item.love}</td>
                    <td className="guild">{item.guild}</td>
                    <td className="date">{item.created_at.slice(0, 10)}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
      {fetchedData && (
        <div className="paginationWrapper">
          <Pagination
            totalItemsCount={fetchedData.total}
            itemsCountPerPage={fetchedData.per_page}
            onChange={handlePageChange}
            activePage={fetchedData.current_page}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  )
}
