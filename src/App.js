import './App.css';
import React, { useState} from 'react'
import Nav from './components/nav/nav';
import Exchanger from './components/exchanger/Exchanger';
import SelectButton from './components/selectButton/selectButton';

function App() {
  return (<div>
    <Nav/> 
    <Exchanger/>
    </div>
  );
}

export default App;
