export default {
  PROFILE_BASIC: 'id,name',
  PROFILE_INFO: 'id,name,picture,birthday,cover,email,gender',
  PROFILE_ALL:
    'id,name,picture,birthday,cover,email,gender,link,location,relationship_status,education,quotes,profile_pic,website,religion,work',
  ALBUM_LIST_ALL:
    'name,count,type,cover_photo,photo_count,location,video_count,picture,photos.limit(2){icon,images,name,name_tags,comments}',
};
