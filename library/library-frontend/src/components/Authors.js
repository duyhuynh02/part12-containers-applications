import { useState } from "react"
import BirthAuthor from "./BirthAuthor"

import Select from 'react-select'

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(props.authors[0].name); //random author to avoid null
  
  if (!props.show) {
    return null
  }

  const authors = [...props.authors]
  const options = authors.map(author => { return {value: author.name, label: author.name} })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <Select 
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}/>
    <BirthAuthor selectedAuthor={selectedAuthor.value}/> 
    </div>
  )
}

export default Authors
