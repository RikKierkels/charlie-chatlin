import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import '@testing-library/jest-dom/extend-expect';
import { matchers } from 'jest-emotion';
expect.extend(matchers);

beforeEach(() => {
  jest.clearAllMocks();
});

process.env.REACT_APP_GIPHY_API_URL = 'api';
process.env.REACT_APP_GIPHY_API_KEY = 'key';
