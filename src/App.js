import './App.css';
import React from 'react';
import Navigationbar from './components/Navigationbar';
import Template from './components/Template';


function App() {
  return (
    <div className="container">
      <Navigationbar></Navigationbar>
      <Template>
      </Template>
    </div>
  );
}

export default App;
