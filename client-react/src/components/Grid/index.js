import React from 'react';
import Masonry from 'react-masonry-css';

const Grid = ({ breakpointCols, children }) => {
  return (
    <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-column">
      {children}
    </Masonry>
  );
};

export default Grid;
