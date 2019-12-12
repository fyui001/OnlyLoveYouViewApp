import * as React from 'react'
import * as Redux from 'redux'
import {connect} from 'react-redux'
import Content from './component/Content'
import Pagenation from 'react-js-pagination'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {getItemLists, searchItemLists} from './redux/action'
import { FormControl, Button, Navbar, Form, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/Main.scss'

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

interface IDispatch {
  getItemList: (pageNum: number) => void
  searchItemList: (pageNum: number, searchWord: string) => void
}

class Main extends React.Component<Props & IDispatch, State> {

  constructor(props: any) {
    super(props)
    console.log(this.props)
    const page: number = this.props.match.params.pageNum === undefined ? 1 : Number(this.props.match.params.pageNum)
    const word: string = this.props.match.params.word === undefined ? '' : this.props.match.params.word
    this.state = {
      activePage: page,
      searchWord: word,
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
      this.props.history.push(`/home/${page}`)
      this.props.getItemList(page)
    } else {
      this.setState({
        activePage: page,
        searchWord: word
      })
      this.props.history.push(`/home/${word}/${page}`)
      this.props.searchItemList(page, word)
    }

  }

  public handleSearch() {
      console.log('handleSearch')
    /* axios({
        method: 'GET',
        url: `https://app.mogamin.net/api/only_love_you/search`,
        params: {
            page: 1,
            searchKeyword: event.target.value
        }
    }).then( (result) => {
        console.log(result)
        this.setState({
            itemList: result.data.resultData.data
        })
    }) */
  }

  public render() {

    if (this.props.isLoading) {
      return <h1>読み込み中...</h1>
    } else if (!this.props.isFetching) {
      return <h1>何も見つかりません</h1>
    }

    return (
      <div className="main">

        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href='#home'>お前しか好きじゃない</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>

            <Form inline>
              <FormControl
                className="search_input"
                placeholder="検索"
              />
              <Button variant="outline-light">検索</Button>
            </Form>

        </Navbar>
        <Content
          itemList={this.props.itemLists.data}
        />
        <Pagenation
          totalItemsCount={this.props.itemLists.total}
          itemsCountPerPage={this.props.itemLists.per_page}
          onChange={this.handlePageChange}
          activePage={this.state.activePage}
          itemClass='page-item'
          linkClass='page-link'

        />
      </div>
    )
  }

}

function mapDispatchToProps(dispatch: Redux.Dispatch): IDispatch {
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
  console.log(state)
  return {
    itemLists: state.fetchedData,
    isFetching: state.isFetching,
    isLoading: state.isLoading,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
