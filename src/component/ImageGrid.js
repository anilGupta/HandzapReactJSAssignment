import React from 'react';
import PropTypes from 'prop-types';
import { Images } from 'styled-icons/boxicons-regular';
import CardStyle from './styles/CardStyle';
import ThemeButton from './styles/ThemeButton';
import Spinner from './Spinner';
import Column from './styles/Columns';
import ImageGridItem from './ImageGridItem';

const ImageGrid = ({ title, end, loading, items = [], loadNext }) => (
  <CardStyle className="with-margin">
    <h3 className="sub-title">
      <Images size={18} /> {title}
    </h3>
    <Column>
      {items.map(item => (
        <ImageGridItem key={item.id} {...item} />
      ))}
    </Column>
    {!end && !loading && (
      <ThemeButton className="btn-light with-margin" onClick={loadNext}>
        Load More
      </ThemeButton>
    )}
    {loading && <Spinner />}
  </CardStyle>
);

export default ImageGrid;

ImageGrid.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  loadNext: PropTypes.func.isRequired,
  end: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
