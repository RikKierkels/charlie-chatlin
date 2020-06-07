import { useCallback, useEffect, useState } from 'react';

const useGiphy = ({ tag, key, url }) => {
  if (!tag) throw new Error('You need to provide a giphy tag.');
  if (!key) throw new Error('You need to provide a giphy api key.');
  if (!url) throw new Error('You need to provide a giphy url.');

  const [gif, setGif] = useState('');

  const fetchGif = useCallback(async () => {
    const { data } = await fetch(`${url}?tag=${tag}&api_key=${key}`).then((response) => response.json());
    const gifUrl = data?.images?.['downsized_medium']?.url;
    setGif(gifUrl || '');
  }, [tag, url, key]);

  useEffect(() => {
    fetchGif();
  }, [fetchGif]);

  return { fetchGif, gif };
};

export default useGiphy;
