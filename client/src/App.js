import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main';
import Note from './components/Note';


function App() {
  return (
     
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/create' element={<Note/>}></Route>

        </Routes>
        </BrowserRouter>
      
  );
}

export default App;
