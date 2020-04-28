import React from 'react';
import Masonry from 'react-masonry-css';

const MasonryGrid = ({ breakpointCols, children }) => {
  console.log(breakpointCols);
  return (
    <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-column">
      {children}
    </Masonry>
  );
};

export default MasonryGrid;
