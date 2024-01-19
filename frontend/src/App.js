import logo from './logo.svg';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Summary from './components/Summary';
import { useState } from 'react';
import Loading from './Loading';

function App() {
  const [text, settext]=useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home settext={settext}/>}/>
        <Route path='/summary' element={<Summary text={text}/>} />
        <Route path='/loading' element={<Loading/>} />
      </Routes>
    </Router>
  );
}
export default App;
