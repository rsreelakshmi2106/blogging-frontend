import './App.css'
import EditProfile from './Components/EditProfile'
import Header from './Components/Header'
import Profile from './Components/Profile'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Write from './Pages/Write'
import ViewPost from './Components/ViewPost'
import UserPage from './Pages/UserPage'
import EditPost from './Components/EditPost'
import Intro from './Pages/Intro'
import AdminViewUsers from './Components/AdminViewUsers'

function App() {

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Intro/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/user/home' element={<Profile/>}/>
      <Route path='/user/profile-edit/:uid' element={<EditProfile/>}/>
      <Route path='/user/view-user/:uid' element={<UserPage/>}/>
      <Route path='/user/write' element={<Write/>}/>
      <Route path='/view-post/:bid' element={<ViewPost/>}/>
      <Route path='/edit-blog/:pid' element={<EditPost/>}/>

      <Route path='/admin/view-users' element={<AdminViewUsers/>}/>

      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
    </>
  )
}

export default App
