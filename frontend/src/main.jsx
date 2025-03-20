import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDom from 'react-dom/client'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import "./index.css"
import { Provider } from 'react-redux'
import store from './redux/store.js'

//Private Route
import PrivateRoute from './components/PrivateRoute.jsx'
// Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
//Admin
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
// User
import Profile from './pages/User/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
