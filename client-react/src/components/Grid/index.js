import React from 'react';
import Masonry from 'react-masonry-css';

const breakpoints = {
  default: 12,
  4000: 11,
  3600: 10,
  3200: 9,
  2800: 8,
  2400: 7,
  2000: 6,
  1700: 5,
  1400: 4,
  1100: 3,
  800: 2,
  500: 1,
};

const Grid = ({ children }) => {
  // Flatten the children to spread messages across columns
  return (
    <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-grid-column">
      {[children].flat(2)}
    </Masonry>
  );
};

export default Grid;
