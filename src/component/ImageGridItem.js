import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ItemStyles from './styles/ItemStyles';
import CoverImage from './styles/CoverImage';

const ImageGridItem = ({
  id,
  name,
  about,
  photo_count: photoCount,
  picture: {
    data: { url },
  },
}) => (
  <ItemStyles>
    <NavLink to={`/album/${id}`}>
      <CoverImage src={url} />
      <div className="grid-item-info">
        <h3>
          {name} - ({photoCount})
        </h3>
        <p>{about}</p>
      </div>
    </NavLink>
  </ItemStyles>
);

export default ImageGridItem;

ImageGridItem.defaultProps = {
  about: '',
};

ImageGridItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  about: PropTypes.string,
  photo_count: PropTypes.number.isRequired,
  picture: PropTypes.object.isRequired,
};
