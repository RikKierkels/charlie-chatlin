import { useCallback, useEffect, useState } from 'react';

const useGiphy = ({ tag, key, url }) => {
  if (!tag) throw Error('No giphy tag provided.');
  if (!key) throw Error('No API key provided.');
  if (!url) throw Error('No API url provided.');

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
