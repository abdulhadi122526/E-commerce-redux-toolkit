import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Carts from './pages/Carts.jsx'
import { Provider } from 'react-redux'
import { store } from './configration/redux/store/store.js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "carts",
        element: <Carts/>
      },
      {
        path: "*",
        element: <p>Page not found</p>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>
    
   
  </StrictMode>,
)
