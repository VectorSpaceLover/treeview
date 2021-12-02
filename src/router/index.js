import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/home';
import FileManagement from '../pages/filemanagement';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/filemanage" element={<FileManagement/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;