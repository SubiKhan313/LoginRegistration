import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { store } from './Store'
import Home from './Pages/Home'
import NavBar from './NavBar'
import SignUp from './Pages/SignUp'
import CheckPn from './Pages/CheckPn'
import SignIn from './Pages/SignIn'
import DashBoard from './Pages/DashBoard'

function App() {

  return (
    <>
    <Provider store={store}>
  
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/dashboard' element={<DashBoard/>}/>
    <Route path='/checkpn' element={<CheckPn/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>

    </Provider>
    </>
  )
}

export default App
