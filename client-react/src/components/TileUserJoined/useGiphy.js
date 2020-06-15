import { useCallback, useEffect, useState } from 'react';

const throwIfNotProvided = (property) => throw new Error(`No ${property} provided.`);

const useGiphy = ({ tag = throwIfNotProvided('tag') }) => {
  const [gif, setGif] = useState('');
  const controller = new AbortController();
  const signal = controller.signal;
  const url = process.env.REACT_APP_GIPHY_API_URL;
  const key = process.env.REACT_APP_GIPHY_API_KEY;

  const fetchGif = useCallback(async () => {
    const gif = await fetch(`${url}?tag=${tag}&api_key=${key}`, { signal })
      .catch()
      .then(
        (response) => response.json(),
        () => ({ data: null }),
      )
      .then(({ data }) => data?.images?.['downsized_medium']?.url);

    setGif(gif || '');
  }, [tag, url, key]);

  useEffect(() => {
    fetchGif();
    return () => controller.abort();
  }, [fetchGif]);

  return { fetchGif, gif };
};

export default useGiphy;
