import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, CHANGE_BIRTH } from "../queries"

const BirthAuthor = (props) => {
    const [birth, setBirth] = useState(0)
    const name = props.selectedAuthor

    const [ changeBirth ] = useMutation( CHANGE_BIRTH, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    } )


    const submit = async (event) => {
        event.preventDefault()
        try {
            changeBirth({ variables: { name, birth } })
            setBirth(0)
        } catch (error) {
            console.error("Mutation error: ", error)
        }

    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    birth <input 
                            value={birth}
                            onChange={({ target }) => setBirth(Number(target.value))}
                        />
                </div>
                <button type="submit">Change birth</button> 
            </form>
        </div>
    )

}

export default BirthAuthor