import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Report from './Report';
import Check from './Check';
import Login from './Login';
const App = () => {
  
  return (
    <Router>
    <div className='homepage'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/:id' element={<Check />}/>
      </Routes>
    </div>
    </Router>
  )
}
export default App;