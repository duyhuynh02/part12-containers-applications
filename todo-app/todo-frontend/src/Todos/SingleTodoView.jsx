import React, { useEffect, useState } from 'react'
import axios from '../util/apiClient'
import { useLoaderData } from 'react-router-dom';

const SingleTodoView = () => {
    const id = useLoaderData()
    const [todo, setTodo] = useState([])

    const getSingleTodo = async () => {
        const { data } = await axios.get(`/todos/${id}`)
        return data 
    }

    useEffect(() => {

        const fetchTodo = async () => {
            const fetchedTodo = await getSingleTodo()
            if (fetchedTodo) {
                setTodo(fetchedTodo);
            }
        }
        fetchTodo();
    }, [id])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span>
            {todo.text} 
            </span>
            {todo.done ? "Done" : "Not done"}
        </div>
    )
}

export default SingleTodoView
