import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main';
import Note from './components/Note';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
     
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/create' element={<Note/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        </Routes>
        </BrowserRouter>
      
  );
}

export default App;
