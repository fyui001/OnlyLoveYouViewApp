import { FormControl, Button, Navbar, Form, Nav } from 'react-bootstrap'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

export default function Main() {
  const history = useHistory()
  const [searchWord, setSearchWord] = useState<string>('')
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWord(event.target.value)
    },
    [setSearchWord]
  )
  const handleSearch = useCallback(() => {
    history.push(searchWord !== '' ? `/search/${searchWord}` : '/')
  }, [history, searchWord])
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])
  return (
    <div className="main">
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>お前しか好きじゃない</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form onSubmit={handleSubmit} inline>
          <FormControl className="search_input" placeholder="検索" onChange={handleChange} />
          <Button variant="outline-light" value={searchWord} onClick={handleSearch}>
            検索
          </Button>
        </Form>
      </Navbar>
    </div>
  )
}
