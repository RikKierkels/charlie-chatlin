import '@testing-library/jest-dom/extend-expect';
import { matchers } from 'jest-emotion';
import { server } from './server';
expect.extend(matchers);

process.env.REACT_APP_GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/random';
process.env.REACT_APP_GIPHY_API_KEY = 'key';

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
