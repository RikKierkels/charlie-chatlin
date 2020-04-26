import React from 'react';
import logo from './logo.svg';
import Input from './components/Input';

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
        <Input value={'Test'} setValue={() => {}} />
      </header>
    </div>
  );
}

export default App;
