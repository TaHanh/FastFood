import React from 'react';
import { Link, Router } from '../routes/routes';
import HeaderComponent from '../components/header/HeaderComponent';

import FooterComponent from '../components/general/FooterComponent';

import { inject, observer } from 'mobx-react';

// import { initFB, loginFB } from '../utils/FBUtils';
import { observable } from 'mobx';
// import { login, loginHRC, resetPass } from '../api/Auth';
// import { setToken } from '../utils/auth';
import Config from '../config/env';
// import { validateEmail } from '../utils/EmailUtils';
// import { setData } from '../utils/LocalStorageUtils';
import LoginComponent from '../components/login/LoginComponent';
// import { convertImgUrl } from '../utils/ImgUtils';
import { intentPage, getPathName } from '../utils/RouterUtils';
@inject('store')
@observer
export default class Login extends React.Component {
  @observable
  message = '';
  @observable load = false;
  static async getInitialProps(ctx) {
    const { mobxStore, res } = ctx;

    return {};
  }
  constructor(props) {
    super(props);

    this.store = this.props.store;
  }
  componentDidMount() {
    // initFB(Config.app.fb);
  }
  callBack = (key, data) => {
    switch (key) {
      case 'LogIn':
        this.load = true;
        if (data.user.length > 0 && data.password.length > 0) {
          if (!validateEmail(data.user)) {
            this.message = 'Email không đúng :)';

            return;
          }
          setData('email', data.user);

          loginHRC(data.user, data.password)
            .then(res => {
              this.store.setLogin(res, res.data.user.role);
              this.load = false;
            })
            .catch(e => {
              const res = e.response.data;
              this.load = false;
              if (res.code == 2 && res.error_code == 5) {
                resetPass(data.user).then(res => {
                  this.message = 'Hệ thống mới vui lòng check Email để xác thực tài khoản';
                  intentPage('/update-password', { email: data.user });
                });
              } else {
                this.message = 'Sai email/mật khẩu. Vui lòng kiểm tra lại';
              }
            });
        } else {
          this.load = false;
          this.message = 'Tài khoản hoặc mật khẩu không được rỗng';
        }
        break;
      case 'loginFBHRC':
        loginFB(res => {
          login(Config.api.path.base.loginF, res.authResponse.accessToken)
            .then(res => {
              this.store.setLogin(res, Config.role.user);
            })
            .catch(e => {
              this.message = 'err';
            });
        });
        break;
      case 'loginGHRC':
        login(Config.api.path.base.loginG, data.tokenObj.access_token)
          .then(res => {
            this.store.setLogin(res, Config.role.user);
          })
          .catch(e => {
            this.message = 'err';
          });
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div className="signup font">
        <HeaderComponent />
        <LoginComponent callBack={this.callBack} message={this.message} load={this.load} />
        <FooterComponent />
      </div>
    );
  }
}
