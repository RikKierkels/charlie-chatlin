import React, { useState } from 'react';
import Tile from '../Tile';
import { violet } from '../../design/shared-styles';

const TileMessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <Tile appearance={violet}>
      <form action="">
        <textarea name="" id="" rows="5" />
      </form>
    </Tile>
  );
};

export default TileMessageForm;
