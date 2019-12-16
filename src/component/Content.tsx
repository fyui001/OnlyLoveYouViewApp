import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import Pagination from 'react-js-pagination'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getItemLists, searchItemLists } from '../redux/action'
import '../style/Main.css'
import {Spinner, Alert, Table} from 'react-bootstrap'


interface State {
  activePage: number
  searchWord: string
}

interface Props extends RouteComponentProps<{ pageNum: any, word: any }> {
  itemLists: any
  isFetching: boolean
  isLoading: boolean
  itemsCountPrePage: number
}

interface Dispatch {
  getItemList: (pageNum: number) => void
  searchItemList: (pageNum: number, searchWord: string) => void
}

class Content extends React.Component<Props & Dispatch, State> {

  constructor(props: any) {
    super(props)
    const page: number = this.props.match.params.pageNum === undefined ? 1 : Number(this.props.match.params.pageNum)
    const word: string = this.props.match.params.word === undefined ? '' : this.props.match.params.word
    this.state = {
      activePage: page,
      searchWord: word,
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  public componentDidMount() {

    const page: number = this.state.activePage
    const word: string = this.state.searchWord
    if (word === '') {
      this.props.getItemList(page)
    } else {
      this.props.searchItemList(page, word)
    }
  }

  public handlePageChange(page: number) {
    const word: string = this.state.searchWord
    if (word === '') {
      this.setState({
        activePage: page
      })
      this.props.history.push(`/a/${page}`)
      this.props.getItemList(page)
    } else {
      this.setState({
        activePage: page,
        searchWord: word
      })
      this.props.history.push(`/search/${word}/${page}`)
      this.props.searchItemList(page, word)
    }

  }

  public render() {

    if (this.props.isLoading) {
      return (
        <Spinner animation="grow" variant="info" />
      )
    } else if (!this.props.isFetching) {
      return <Alert variant="danger">何も見つかりませんでした</Alert>
    }

    return (
      <div className="main">
        <div className='content'>
          <Table striped bordered hover size='sm'>
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
            {this.props.itemLists.data.map((item: any, index: any) => {
              return (
                <tr className="content" key={index}>
                  <td className="user_name">{item.UserName}</td>
                  <td className="msg_content">{item.Content}</td>
                  <td className="love">{item.Love}</td>
                  <td className="guild">{item.Guild}</td>
                  <td className="date">{item.create_at.slice(0, 10)}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </div>
        <div className='paginationWrapper'>
          <Pagination
            totalItemsCount={this.props.itemLists.total}
            itemsCountPerPage={this.props.itemLists.per_page}
            onChange={this.handlePageChange}
            activePage={this.state.activePage}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch: Redux.Dispatch): Dispatch {
  return {
    getItemList: (pageNum: number) => {
      dispatch(getItemLists(pageNum))
    },
    searchItemList: (pageNum: number, word: string) => {
      dispatch(searchItemLists(pageNum, word))
    }
  }
}

function mapStateToProps(state: any) {
  return {
    itemLists: state.fetchedData,
    isFetching: state.isFetching,
    isLoading: state.isLoading,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content))
