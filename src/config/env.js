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
  constans: {
    limit: 6,
    limit8: 8,
    limit9: 9,
    limit5: 5,
    limit3: 3,
    limit4: 4,
    limit18: 18,
    limit30: 30,
    category: {
      joblist: 'joblist',
      companylist: 'companylist',
      PTBT: 'Phát triển bản thân',
      KPNG: 'Khám phá ngành nghề',
      KNXV: 'Kỹ năng xin việc',
      AW: 'At work',
      LTMT: 'Luyện thi MT'
    },

    type: {
      scholastic: 'scholastic',
      career: 'career',
      highlight: 'highlight',
      full: 'full'
    }
  },
  api: {
    host: {
      myUrl: myUrl,
      // base: 'https://aib.vn:280',
      base: 'https://local.aib.vn:280',
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
        loginG: '/auth/google',
        loginF: '/auth/facebook',
        user: '/users',
        auth: '/auth',
        password_resets: '/password-resets',
        check_email: '/users/check-email',
        users_admin: '/users/admin',
        users_me: '/users/me',
        password: '/password',
        vefify_email: '/users/vefify-email',
        careers: '/careers',
        recruits: '/recruits',
        companies: '/companies',
        fields: '/fields',
        employees_employ: '/employees?employ',
        post_companylists: '/post-companylists',
        employees: '/employees',
        cvs: '/cvs',
        cvs_me: '/cvs/me',
        universities: '/universities',
        applies: '/applies',
        users_company_me: '/users/company/me',
        recruits_admin: '/recruits/admin',
        footers: '/footers',
        post_skills: '/post-skills',
        tag: '/tags',
        list_categories: '/list-categories',
        find_jobs: '/find-jobs'
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
