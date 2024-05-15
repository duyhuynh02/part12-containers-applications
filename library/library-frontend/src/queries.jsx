import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born 
        bookCount
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title, 
      author: $author, 
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name 
        born
        bookCount
      }
      published 
      genres
    }
  }
`

export const CHANGE_BIRTH = gql`
  mutation changeBirth($name: String!, $birth: Int!) {
    editAuthor(name: $name, born: $birth) {
      name
      born
      bookCount 
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username 
      favoriteGenre
    }
  }
`
