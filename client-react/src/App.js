import React from 'react';
import logo from './logo.svg';
import TileRegister from './components/TileRegister';
import TileAvatar from './components/TileAvatar';

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
        <TileAvatar avatarId="cat-one" onSelect={(avatar) => console.log(avatar)} />
      </header>
    </div>
  );
}

export default App;
