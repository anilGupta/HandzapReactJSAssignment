import Config from '../constants/Config';
import LoginStatus from '../constants/LoginStatus';

export const Method = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
};

class Facebook {
  constructor(options = {}) {
    this.options = {
      domain: 'connect.facebook.net',
      version: 'v3.1',
      cookie: false,
      status: false,
      xfbml: false,
      language: 'en_US',
      frictionlessRequests: false,
      debug: false,
      ...options,
    };

    if (!this.options.appId) {
      throw new Error('You need to set appId');
    }

    if (!this.options.wait) {
      this.init();
    }
  }

  getAppId() {
    return this.options.appId;
  }

  async init() {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise(resolve => {
      const { domain, language, debug, ...restOptions } = this.options;

      window.fbAsyncInit = () => {
        window.FB.init({
          appId: restOptions.appId,
          version: restOptions.version,
          cookie: restOptions.cookie,
          status: restOptions.status,
          xfbml: restOptions.xfbml,
          frictionlessRequests: this.frictionlessRequests,
        });

        resolve(window.FB);
      };

      const fjs = window.document.getElementsByTagName('script')[0];
      if (!fjs) {
        return;
      }

      if (window.document.getElementById('facebook-jssdk')) {
        return;
      }

      const js = window.document.createElement('script');
      js.id = 'facebook-jssdk';
      js.async = true;
      js.src = `https://${domain}/${language}/sdk${debug ? '/debug' : ''}.js`;

      fjs.parentNode.insertBefore(js, fjs);
    });

    return this.loadingPromise;
  }

  async process(method, before = [], after = []) {
    const fb = await this.init();

    return new Promise((resolve, reject) => {
      fb[method](
        ...before,
        response => {
          if (!response) {
            reject(new Error('Response is undefined'));
          } else if (response.error) {
            const { code, type, message } = response.error;

            const error = new Error(message);
            error.code = code;
            error.type = type;

            reject(error);
          } else {
            resolve(response);
          }
        },
        ...after,
      );
    });
  }

  async ui(options) {
    return this.process('ui', [options]);
  }

  async api(path, method = Method.GET, params = {}) {
    return this.process('api', [path, method, params]);
  }

  async login(opts = null) {
    return this.process('login', [], [opts]);
  }

  async logout() {
    return this.process('logout');
  }

  async getLoginStatus() {
    return this.process('getLoginStatus');
  }

  async getAuthResponse() {
    return this.process('getAuthResponse');
  }

  async getTokenDetail() {
    const response = await this.getLoginStatus();
    if (response.status === LoginStatus.CONNECTED && response.authResponse) {
      return response.authResponse;
    }

    throw new Error('Token is undefined');
  }

  async getProfile(params) {
    return this.api('/me', Method.GET, params);
  }

  async getTokenDetailWithProfile(params) {
    const tokenDetail = await this.getTokenDetail();
    const profile = await this.getProfile(params);

    return {
      profile,
      tokenDetail,
    };
  }

  async getToken() {
    const authResponse = await this.getTokenDetail();
    return authResponse.accessToken;
  }

  async getUserId() {
    const authResponse = await this.getTokenDetail();
    return authResponse.userID;
  }

  async postAction(ogNamespace, ogAction, ogObject, ogObjectUrl, noFeedStory) {
    let url = `/me/${ogNamespace}:${ogAction}?${ogObject}=${encodeURIComponent(
      ogObjectUrl,
    )}`;

    if (noFeedStory === true) {
      url += '&no_feed_story=true';
    }

    return this.api(url, Method.POST);
  }

  async getPermissions() {
    const response = await this.api('/me/permissions');
    return response.data;
  }

  async hasPermissions(permissions) {
    const usersPermissions = await this.getPermissions();

    const findedPermissions = permissions.filter(p => {
      const currentPermission = usersPermissions.find(row => {
        const { permission, status } = row;
        return status === 'granted' && permission === p;
      });

      return !!currentPermission;
    });

    return findedPermissions.length === permissions.length;
  }

  async subscribe(eventName, callback) {
    const fb = await this.init();
    fb.Event.subscribe(eventName, callback);
  }

  async unsubscribe(eventName, callback) {
    const fb = await this.init();
    fb.Event.unsubscribe(eventName, callback);
  }

  async parse(parentNode) {
    const fb = await this.init();

    if (typeof parentNode === 'undefined') {
      fb.XFBML.parse();
    } else {
      fb.XFBML.parse(parentNode);
    }
  }

  async getRequests() {
    return this.api('/me/apprequests');
  }

  async removeRequest(requestID) {
    return this.api(requestID, Method.DELETE);
  }

  async getAlbums(params) {
    return this.api(`/me/albums`, Method.GET, params);
  }

  async getAlbumsPhotos(albumId, params = {}) {
    return this.api(
      `${albumId}/?fields=photos.limit(6){picture,images,comments}`,
      Method.GET,
      params,
    );
  }

  async loadNext(path, params = {}) {
    return this.api(path, Method.GET, params);
  }
}

const FacebookAPI = new Facebook({ appId: Config.FACEBOOK_APP_ID, wait: true });
export default FacebookAPI;
