import React from 'react';
import Masonry from 'react-masonry-css';

const Grid = ({ breakpointCols, children }) => {
  // Flatten the children to spread messages across columns
  return (
    <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-column">
      {[children].flat(2)}
    </Masonry>
  );
};

export default Grid;
