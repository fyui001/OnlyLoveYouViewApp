import * as React from 'react'
import { FormControl, Button, Navbar, Form, Nav} from 'react-bootstrap'
interface State {
  searchWord: string
}

class Main extends React.Component<{}, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      searchWord: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  public handleChange(e: any) {
    this.setState({
      searchWord: e.target.value
    })
  }

  public handleSearch(word: string) {
    if (word !== '') {
      window.location.href = `/search/${word}`
    } else {
      window.location.href = '/'
    }
  }

  public handleSubmit(e: any) {
      e.preventDefault()
  }

  public render() {
    return (
      <div className="main">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href='/a/1'>お前しか好きじゃない</Navbar.Brand>
          <Nav className="mr-auto">
          </Nav>
          <Form onSubmit={this.handleSubmit} inline>
            <FormControl
              className="search_input"
              placeholder="検索"
              onChange={this.handleChange}
            />
            <Button variant="outline-light" value={this.state.searchWord} onClick={() => this.handleSearch(this.state.searchWord)}>検索</Button>
          </Form>
        </Navbar>

      </div>
    )
  }
}

export default Main
