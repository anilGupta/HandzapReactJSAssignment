/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Archive } from 'styled-icons/material';
import { Images } from 'styled-icons/boxicons-regular';
import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import {
  fetchProfileIfNeeded,
  fetchUserAlbumIfNeeded,
  fetchUserAlbumImages,
} from '../actions/user';
import ListHeaderStyle from '../component/styles/ListHeaderStyle';
import AlbumGridStyle from '../component/styles/AlbumGridStyle';
import MasonryList from '../component/MasonryList';
import Spinner from '../component/Spinner';
import CoverImage from '../component/styles/CoverImage';
import ThemeButton from '../component/styles/ThemeButton';
import CardStyle from '../component/styles/CardStyle';
import ImageSource from '../assets/images/blank.png';

@connect(
  state => ({ user: state.user }),
  dispatch =>
    bindActionCreators(
      {
        fetchProfileIfNeeded,
        fetchUserAlbumIfNeeded,
        fetchUserAlbumImages,
      },
      dispatch,
    ),
)
class Album extends PureComponent {
  constructor(props) {
    super(props);
    this.loadNext = this.loadNext.bind(this);
    this.togglePhotoSwipe = this.togglePhotoSwipe.bind(this);
  }

  state = {
    isOpen: false,
    index: 1,
  };

  componentDidMount() {
    this.props.fetchProfileIfNeeded();
    this.props.fetchUserAlbumIfNeeded();
  }

  static getImagesFromAlbum(album) {
    return album.photo_count > 0
      ? album.photos.data.map(item => {
          const [image] = item.images;
          return {
            src: image.source,
            w: image.width,
            h: image.height,
            title: image.name || '',
          };
        })
      : [];
  }

  togglePhotoSwipe(index, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({
      isOpen: !this.state.isOpen,
      index,
    });
  }

  loadNext() {
    this.props.fetchUserAlbumImages(this.props.match.params.id);
  }

  render() {
    const {
      match: { params },
      user: {
        albums: { loading, items },
      },
    } = this.props;
    const { isOpen, index } = this.state;
    const album = items.find(item => item.id === params.id);

    if (loading || !album) {
      return <Spinner />;
    }

    return (
      <div>
        <ListHeaderStyle>
          <h3>
            <Images size={18} /> - {album.name} {"'s"} Images
          </h3>
          <div className="actions">
            <NavLink to="/">
              <Archive size="18" title="todos" /> &nbsp; Back
            </NavLink>
          </div>
        </ListHeaderStyle>
        {album.photo_count > 0 ? (
          <AlbumGridStyle>
            <MasonryList
              className="album-grid-items"
              id="album-grid"
              itemSelector="album-thumb"
              items={album.photos.data.length}
            >
              {album.photos.data.map((item, key) => {
                const { source } = item.images[item.images.length - 1];
                return (
                  <div
                    className="album-thumb"
                    key={source}
                    onClick={this.togglePhotoSwipe.bind(this, key)}
                  >
                    <CoverImage src={source} />
                    <img src={ImageSource} alt="hey" />
                  </div>
                );
              })}
            </MasonryList>
          </AlbumGridStyle>
        ) : (
          <CardStyle>
            <h3 className="title">Album has no photos</h3>
          </CardStyle>
        )}

        <div>
          {!album.photos.end && !album.photos.loading && (
            <ThemeButton
              className="btn-light with-margin btn-full"
              onClick={this.loadNext}
            >
              Load More
            </ThemeButton>
          )}
          {album.photos.loading && <Spinner />}
        </div>
        <div>
          <PhotoSwipe
            isOpen={isOpen}
            items={Album.getImagesFromAlbum(album)}
            options={{ index, closeOnScroll: false, modal: true }}
            onClose={this.togglePhotoSwipe}
          />
        </div>
      </div>
    );
  }
}

export default Album;
