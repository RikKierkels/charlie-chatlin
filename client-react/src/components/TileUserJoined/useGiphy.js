import { useCallback, useEffect, useState } from 'react';

const throwIfNotProvided = (property) => throw new Error(`No ${property} provided.`);

const useGiphy = ({
  tag = throwIfNotProvided('tag'),
  key = throwIfNotProvided('API key'),
  url = throwIfNotProvided('API url'),
}) => {
  const [gif, setGif] = useState('');

  const fetchGif = useCallback(async () => {
    const gif = await fetch(`${url}?tag=${tag}&api_key=${key}`)
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
  }, [fetchGif]);

  return { fetchGif, gif };
};

export default useGiphy;
