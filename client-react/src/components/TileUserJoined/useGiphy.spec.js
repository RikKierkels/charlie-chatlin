import { renderHook } from '@testing-library/react-hooks';
import useGiphy from './useGiphy';

test('fetches a gif initially and on second call', async () => {
  const gifFirstFetch = 'https://www.giphy.com/first_applause.gif';
  const gifSecondFetch = 'https://www.giphy.com/second_applause.gif';
  fetch
    .mockResponseOnce(JSON.stringify({ data: { images: { ['downsized_medium']: { url: gifFirstFetch } } } }))
    .mockResponseOnce(JSON.stringify({ data: { images: { ['downsized_medium']: { url: gifSecondFetch } } } }));

  const { result, waitForNextUpdate } = renderHook(() => useGiphy({ tag: 'applause', key: 'key', url: 'api' }));

  await waitForNextUpdate();

  expect(result.current.gif).toBe(gifFirstFetch);

  result.current.fetchGif();

  await waitForNextUpdate();

  expect(result.current.gif).toBe(gifSecondFetch);
});

test('throws an error when no tag is provided', () => {
  const { result } = renderHook(() => useGiphy({ key: 'key', url: 'api' }));

  expect(result.error).toEqual(Error('No giphy tag provided.'));
});

test('throws an error when no api key is provided', () => {
  const { result } = renderHook(() => useGiphy({ tag: 'applause', url: 'api' }));

  expect(result.error).toEqual(Error('No API key provided.'));
});

test('throws an error when no tag is provided', () => {
  const { result } = renderHook(() => useGiphy({ tag: 'applause', key: 'key' }));

  expect(result.error).toEqual(Error('No API url provided.'));
});
