import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/RecommendForm'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuthor = useQuery(ALL_AUTHORS)
  const resultBook = useQuery(ALL_BOOKS)
  const client = useApolloClient() 

  if (resultAuthor.loading) {
    return <div>loading authors...</div>
  }

  if (resultBook.loading) {
    return <div>loading books...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log('page: ', page)

  return (
    <div>
      <div>
        {token === null 
          ? <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('login')}>login</button>
            </div>
          : 
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>log out</button>
          </div>        
        }

      </div>
      <Authors show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>

      <Books show={page === 'books'} books={resultBook.data.allBooks} />

      <NewBook show={page === 'add'}/>
      <Recommendations show={page === 'recommend'} 
                        books={resultBook.data.allBooks}
                            />
      <LoginForm show={page === 'login'} setToken={setToken}/> 


    </div>
  )
}

export default App
