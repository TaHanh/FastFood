// const myUrl = 'https://hrcvn.tk';
const myUrl = 'http://localhost:3000';
export default {
  releaseVersion: false,
  secret: {
    username: 'wisami_base_1522119499',
    password: 'wisami_base_secret_1522119999'
  },
  app: {
    android: 'market://details?id=com.maps1',
    ios: 'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8',
    fb: '463883330782143'
  },
  role: {
    user: 'user',
    employ: 'employ',
    admin: 'admin'
  },

  api: {
    host: {
      myUrl: myUrl,
      // base: 'https://aib.vn:280',
      base: 'http://localhost:9000',
      upload: 'https://local.aib.vn:280',

      map: 'https://maps.googleapis.com',
      link: `${myUrl}/log-in`,
      link_forgotpassword: `${myUrl}/reset-password`
    },
    path: {
      upload: {
        upFile: '/upload'
      },
      base: {
        categories: '/categories',
        products: '/products',
        customers: '/customers',
        orders: '/orders'
      }
    }
  },
  code: {
    success: 3,
    error: {
      tokenFail: 6,
      tokenExpire: 7
    }
  },
  asyncStorage: {
    loginOK: 'loginOk',
    user: 'user'
  }
};
