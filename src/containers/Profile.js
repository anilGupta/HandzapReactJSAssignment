/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded, fetchUserAlbumIfNeeded } from '../actions/user';
import ProfileCard from '../component/ProfileCard';
import ImageGrid from '../component/ImageGrid';
import Spinner from '../component/Spinner';

@connect(
  state => ({ user: state.user }),
  dispatch =>
    bindActionCreators(
      {
        fetchProfileIfNeeded,
        fetchUserAlbumIfNeeded,
      },
      dispatch,
    ),
)
class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.loadNext = this.loadNext.bind(this);
  }

  componentDidMount() {
    this.props.fetchProfileIfNeeded();
    this.props.fetchUserAlbumIfNeeded();
  }

  loadNext() {
    this.props.fetchUserAlbumIfNeeded(true);
  }

  render() {
    const {
      user: {
        profile,
        profileLoading,
        albums: { loading, items, end },
      },
    } = this.props;

    return (
      <div>
        <div>
          {profileLoading && profile ? (
            <Spinner />
          ) : (
            <ProfileCard data={profile} />
          )}
        </div>
        <div>
          <ImageGrid
            loading={loading}
            title="ALBUMS"
            items={items}
            end={end}
            loadNext={this.loadNext}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
