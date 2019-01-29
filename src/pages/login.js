import React from 'react';
import { Link, Router } from '../routes/routes';
import HeaderComponent from '../components/header/header-component';

import FooterComponent from '../components/footer/footer-component';

import { inject, observer } from 'mobx-react';

import { initFB, loginFB } from '../utils/FBUtils';
import { observable } from 'mobx';
import { login, loginHRC } from '../api/Auth';
import { setToken } from '../utils/auth';
import Config from '../config/env';
import { validateEmail } from '../utils/EmailUtils';
import { setData } from '../utils/LocalStorageUtils';
import LoginComponent from '../components/login/LoginComponent';
@inject('store')
@observer
export default class Login extends React.Component {
  @observable
  message = '';

  static async getInitialProps(ctx) {
    const { mobxStore, res } = ctx;

    // if (mobxStore.isAuthenticated) {
    //   if (res && mobxStore.isServer) {
    //     res.redirect('/');
    //   } else {
    //     Router.pushRoute('index');
    //   }
    // }
    return {};
  }
  constructor(props) {
    super(props);

    this.store = this.props.store;
  }
  componentDidMount() {
    initFB(Config.app.fb);
  }
  callBack = (key, data) => {
    switch (key) {
      case 'LogIn':
        if (data.user.length > 0 && data.password.length > 0) {
          if (!validateEmail(data.user)) {
            this.message = 'Email không đúng :)';

            return;
          }

          loginHRC(data.user, data.password)
            .then(res => {
              this.store.setLogin(res, res.data.user.role);
            })
            .catch(e => {
              const res = e.response.data;
              this.message = 'Sai email/mật khẩu. Vui lòng kiểm tra lại';
            });
        } else {
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
      <div>
        <HeaderComponent />
        <LoginComponent callBack={this.callBack} message={this.message} />
        <FooterComponent />
      </div>
    );
  }
}
