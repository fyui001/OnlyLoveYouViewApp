import { FormControl, Button, Navbar, Form, Nav } from 'react-bootstrap'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'

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
        <Navbar.Brand href="/a/1">お前しか好きじゃない</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
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
