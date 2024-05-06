import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter, 
  RouterProvider, 
} from "react-router-dom"; 

import App from './App';
import React from 'react';
import SingleTodoView from './Todos/SingleTodoView'
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, 
  {
    path: "todos/:todoId",
    loader: async ({ params }) => {
      return params.todoId
    },
    element: <SingleTodoView />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
