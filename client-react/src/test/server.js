import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('https://api.giphy.com/v1/gifs/random', async (req, res, context) => {
    const gif = `http://www.giphy.com/${Math.random().toString(36).substring(7)}.gif`;
    return res(context.json({ data: { images: { ['downsized_medium']: { url: gif } } } }));
  }),
];

const server = setupServer(...handlers);
export { server, rest };
