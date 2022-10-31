import './App.css';
import React, { useState } from 'react'
import Nav from './components/nav/nav';
import Exchanger from './components/exchanger/Exchanger';
import SelectButton from './components/selectButton/selectButton';
import ConvertionGrid from './components/convertion-grid/ConvertionGrid';
import convertionContex from './components/context/convertionContex';
import { convertionGridFormation } from './services/currency.service';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Details from './components/details/Details';

function App() {
  const [convertionGrid, setConvertionGrid] = useState([])
  const convertionGridHandler = async (form) => {
    let grid = await convertionGridFormation(form)
    setConvertionGrid(grid);
  }
  return (
    <>
      <convertionContex.Provider
        value={{
          convertionGrid: convertionGrid,
          onConvertionGridChange: convertionGridHandler
        }}
      >
        <Router history={history}>
        <Nav />
        <Exchanger />
        <Routes>
            <Route element={<ConvertionGrid/>} path="/" />
            <Route element={<Details/>} path="/details" />
        </Routes>
        </Router>
      </convertionContex.Provider>
    </>
  );
}

export default App;
