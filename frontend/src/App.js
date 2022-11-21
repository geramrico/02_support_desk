import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {Toaster} from 'react-hot-toast'

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>

      {/*Outside Router to add toast wherever we want*/}
      <Toaster/>
    </>
  );
}

export default App;
