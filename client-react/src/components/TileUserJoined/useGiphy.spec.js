import { renderHook } from '@testing-library/react-hooks';
import useGiphy from './useGiphy';

test('fetches a gif', async () => {
  const gif = 'https://www.giphy.com/applause.gif';
  fetch.mockResponse(JSON.stringify({ data: { images: { ['downsized_medium']: { url: gif } } } }));
  const { result, waitForNextUpdate } = renderHook(() => useGiphy({ tag: 'applause', key: 'key', url: 'api' }));

  await waitForNextUpdate();

  expect(result.current.gif).toBe(gif);
});
