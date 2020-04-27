import React from 'react';
import logo from './logo.svg';
import TileRegister from './components/TileRegister';
import TileAvatar from './components/TileAvatar';

function App() {
  return (
    <div>
      <TileRegister onSubmit={() => {}} />
      <TileAvatar avatarId="cat-one" onSelect={(avatar) => console.log(avatar)} />
    </div>
  );
}

export default App;
