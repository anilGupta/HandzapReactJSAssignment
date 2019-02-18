import types from '../constants/ActionType';

const initialState = {
  profile: {},
  profileLoading: true,
  albums: {
    items: [],
    loading: false,
    end: false,
  },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_PROFILE_REQUEST: {
      return Object.assign({}, state, { profileLoading: true });
    }

    case types.USER_PROFILE_RECEIVE: {
      return Object.assign({}, state, {
        profileLoading: false,
        profile: action.data,
      });
    }

    case types.ALBUM_LIST_REQUEST: {
      return Object.assign({}, state, {
        albums: Object.assign({}, state.albums, { loading: true }),
      });
    }

    case types.ALBUM_LIST_RECEIVE: {
      return Object.assign({}, state, {
        albums: Object.assign({}, state.albums, {
          loading: false,
          items: [
            ...state.albums.items,
            ...action.items.map(item =>
              Object.assign({}, item, {
                photos: Object.assign({}, item.photos, {
                  loading: false,
                  end:
                    item.photos && item.photos.paging
                      ? !item.photos.paging.next
                      : true,
                }),
              }),
            ),
          ],
          end: action.end,
          next: action.next,
        }),
      });
    }

    case types.PHOTO_LIST_REQUEST: {
      const updatedItems = state.albums.items.map(album => {
        if (album.id === action.albumId) {
          return Object.assign({}, album, {
            photos: Object.assign({}, album.photos, { loading: true }),
          });
        }
        return album;
      });
      return Object.assign({}, state, {
        albums: Object.assign({}, state.albums, { items: updatedItems }),
      });
    }

    case types.PHOTO_LIST_RECEIVE: {
      const updatedItems = state.albums.items.map(album => {
        if (album.id === action.albumId) {
          return Object.assign({}, album, {
            photos: Object.assign({}, album.photos, {
              data: [...album.photos.data, ...action.data],
              paging: action.paging,
              loading: false,
              end: action.end,
            }),
          });
        }
        return album;
      });

      return Object.assign({}, state, {
        albums: Object.assign({}, state.albums, { items: updatedItems }),
      });
    }

    case types.AUTH_REMOVE: {
      return Object.assign({}, Object.assign({}, initialState));
    }

    default:
      return state;
  }
};

export default userReducer;
