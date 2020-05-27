import React from 'react';
import Masonry from 'react-masonry-css';

const Grid = ({ breakpointCols, children }) => {
  return (
    <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-column">
      {/* Masonry requires a flat array of children. */}
      {[children].flat(2)}
    </Masonry>
  );
};

export default Grid;
