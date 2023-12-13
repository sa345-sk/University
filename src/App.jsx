import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import Check from './Check';
import Login from './Login';
import Signup from './Signup';
import Unknown from './Unknown';
import View from './View';
import Dashboard from './Dashboard';
const App = () => {
  
  return (
    <Router>
    <div className='homepage'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard/:id' element={<Dashboard/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/details/:id' element={<Check />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='*' element={<Unknown />}/>
      </Routes>
    </div>
    </Router>
  )
}
export default App;