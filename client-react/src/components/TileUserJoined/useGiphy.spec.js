import { renderHook } from '@testing-library/react-hooks';
import useGiphy from './useGiphy';
import { server } from '../../test/server';
import { rest } from 'msw';

test('can fetch a gif', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useGiphy({ tag: 'applause' }));
  await waitForNextUpdate();

  const gifFromInitialFetch = result.current.gif;
  expect(gifFromInitialFetch).toContain('.gif');

  result.current.fetchGif();
  await waitForNextUpdate();

  const gifFromManualFetch = result.current.gif;
  expect(gifFromManualFetch).toContain('.gif');

  expect(gifFromInitialFetch).not.toBe(gifFromManualFetch);
});

test('does not throw an error when the gif cannot be fetched', async () => {
  server.use(
    rest.get('https://api.giphy.com/v1/gifs/random', async (req, res, context) => {
      return res(context.status(500), context.json({ message: 'Internal server error.' }));
    }),
  );

  const { result } = renderHook(() => useGiphy({ tag: 'applause' }));

  expect(result.error).toBeFalsy();
  expect(result.current.gif).toBe('');
});

test('throws an error when no tag was provided', () => {
  const { result } = renderHook(() => useGiphy({}));

  expect(result.error).toEqual(Error('No tag provided.'));
});
