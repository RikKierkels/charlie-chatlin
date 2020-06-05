import { useCallback, useEffect, useState } from 'react';

const useGiphy = ({ tag, key = process.env.REACT_APP_GIPHY_API_KEY, url = process.env.REACT_APP_GIPHY_API_URL }) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGif = useCallback(async () => {
    const { data } = await fetch(`${url}?tag=${tag}&api_key=${key}`).then((response) => response.json());
    const gifUrl = data?.images?.['downsized_medium']?.url;
    setGifUrl(gifUrl || '');
  }, [url, tag, key]);

  useEffect(() => {
    fetchGif();
  }, [fetchGif]);

  return gifUrl;
};

export default useGiphy;
