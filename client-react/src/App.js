import React from 'react';
import logo from './logo.svg';
import Input from './components/Input';
import TileRegister from './components/TileRegister';

function App() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        <TileRegister onSubmit={() => {}} />
      </header>
    </div>
  );
}

export default App;
