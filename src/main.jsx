import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Home from './pages/Home.jsx'
import Allposts from './pages/Allposts.jsx'
import EditPost from './pages/EditPost.jsx'
import AddPost from './pages/AddPost.jsx';
import Post from './pages/Post.jsx'
import SignUp from './pages/SignUp.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
const router=createBrowserRouter(
  [
    {
      path: "/",
      element:<App/>,
      children:[
        {
          path: "/",
          element: <Home />,
      },
        {
          path:"/login",
          element:(
            <AuthLayout authentication={false}>
            <Login />
        </AuthLayout>
          )
        },
        {
          path: "/all-posts",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <Allposts />
              </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <SignUp />
            </AuthLayout>
        ),
    },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
      ]

    }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  < Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>,
)
