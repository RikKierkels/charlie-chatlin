import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Tile from '../Tile';

const TileUserJoined = ({ message }) => {
  const fetchGif = useCallback(async () => {
    const url = new URL('https://api.giphy.com/v1/gifs/random');
    url.searchParams.append('api_key', process.env.REACT_APP_GIPHY_API_KEY);
    url.searchParams.append('tag', 'applause');

    const data = await fetch(url);
    console.log(data);
  }, []);

  useEffect(() => fetchGif, [fetchGif]);

  return <StyledTile>{message.text}</StyledTile>;
};

export default TileUserJoined;

const StyledTile = styled(Tile)`
  position: absolute;
`;
