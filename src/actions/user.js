import types from '../constants/ActionType';
import FacebookAPI from '../utils/Facebook';
import FacebookPresets from '../constants/FacebookPresets';

const requestProfile = () => ({
  type: types.USER_PROFILE_REQUEST,
  loading: true,
});

const receiveProfile = data => ({
  type: types.USER_PROFILE_RECEIVE,
  data,
});

const fetchProfile = () => dispatch => {
  dispatch(requestProfile());
  return FacebookAPI.getProfile({ fields: FacebookPresets.PROFILE_INFO }).then(
    profile => {
      dispatch(receiveProfile(profile));
    },
  );
};

const fetchProfileIfNeeded = () => (dispatch, getState) => {
  const {
    user: { profile },
  } = getState();
  return profile && Object.keys(profile).length
    ? Promise.resolve(profile)
    : dispatch(fetchProfile());
};

const requestUserAlbumList = () => ({
  type: types.ALBUM_LIST_REQUEST,
  loading: true,
});

const receiveUserAlbumList = (items, next) => ({
  type: types.ALBUM_LIST_RECEIVE,
  items,
  end: !next,
  next,
});

const fetchUserAlbum = next => dispatch => {
  dispatch(requestUserAlbumList());
  return next
    ? FacebookAPI.api(next).then(({ data, paging }) => {
        dispatch(receiveUserAlbumList(data, paging.next));
      })
    : FacebookAPI.getAlbums({
        fields: FacebookPresets.ALBUM_LIST_ALL,
        limit: 6,
      }).then(({ data, paging }) => {
        dispatch(receiveUserAlbumList(data, paging.next));
      });
};

const fetchUserAlbumIfNeeded = (loadMore = false) => (dispatch, getState) => {
  const {
    user: {
      albums: { items, loading, end, next },
      albums,
    },
  } = getState();

  return (loading && !end) || (items.length && !loadMore)
    ? Promise.resolve(albums)
    : dispatch(fetchUserAlbum(loadMore ? next : false));
};

const requestUserAlbumListImages = albumId => ({
  type: types.PHOTO_LIST_REQUEST,
  albumId,
});

const receiveUserAlbumListImages = (albumId, data, paging) => ({
  type: types.PHOTO_LIST_RECEIVE,
  data,
  paging,
  albumId,
  end: !paging.next,
});

const fetchUserAlbumImages = albumId => (dispatch, getState) => {
  const {
    user: {
      albums: { items },
    },
  } = getState();
  const {
    photos: { loading, end, paging: currentPaging },
  } = items.find(item => item.id === albumId);

  dispatch(requestUserAlbumListImages(albumId));
  return loading && !end
    ? Promise.resolve(true)
    : FacebookAPI.api(currentPaging.next).then(({ data, paging }) => {
        dispatch(receiveUserAlbumListImages(albumId, data, paging));
      });
};

export { fetchProfileIfNeeded, fetchUserAlbumIfNeeded, fetchUserAlbumImages };
