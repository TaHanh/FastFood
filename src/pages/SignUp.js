import React from 'react';

import { initFB, loginFB } from '../utils/FBUtils';
import { Link, Router } from '../routes/routes';
import { validateEmail } from '../utils/EmailUtils';
import { createUser, login } from '../api/Auth';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import Config from '../config/env';
import I18n from '../locales/String';
import { setData } from '../utils/LocalStorageUtils';
import HeaderComponent from '../components/header/header-component';
import FooterComponent from '../components/footer/footer-component';
import SignUpComponent from '../components/login/SignUpComponent';
@inject('store')
@observer
export default class SignUp extends React.Component {
  @observable
  path = '';
  @observable
  isEmailRegistered = false;
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    initFB(Config.app.fb);
    const pathSignUp = Router.router.asPath;
    ////console.log('Router.router', Router.router);
    if (pathSignUp === '/sign-up/doanh-nghiep') {
      this.path = 'doanh-nghiep';
    } else {
      this.path = 'sinh-vien';
    }
    ////console.log(this.path);
  }

  callBack = (key, data) => {
    switch (key) {
      case 'signup':
        if (data.password.length > 0 && data.password2.length > 0 && data.name.length > 0 && data.email.length > 0) {
          if (!validateEmail(data.email)) {
            alert('Email không đúng :)');

            return;
          }
          if (this.pathname == 'doanh-nghiep') {
            if (!validateEmail(data.emailCv)) {
              alert('Email nhận cv không đúng :)');

              return;
            }
          }
          if (data.password != data.password2) {
            alert('Mật khẩu không trùng nhau');
            return;
          }
          if (data.password.length < 8) {
            alert('Mật khẩu >= 8 kí tự');
            return;
          }

          createUser({
            email: data.email,
            name: data.name,
            password: data.password,
            link: Config.api.host.link,
            role: this.path == 'sinh-vien' ? Config.role.user : Config.role.employ,
            phone: this.path == 'sinh-vien' ? undefined : data.phone,
            emailCv: this.path == 'sinh-vien' ? undefined : data.emailCv
          })
            .then(res => {
              // Router.pushRoute('index');
              this.isEmailRegistered = false;
              document.getElementById('login-view').style.display = 'none';
              document.getElementById('verify-mail').style.display = 'block';

              // ////console.log('signup ok ' + JSON.stringify(res));
            })
            .catch(e => {
              const res = e.response.data;
              // alert(res.message);
              if (res.message === 'email already registered') {
                this.isEmailRegistered = true;
              } else {
                alert(res.message);
              }
              ////console.log('signup ' + JSON.stringify(e));
            });
        } else {
          alert('Vui lòng điền đầy đủ thông tin trước khi tạo tài khoản');
        }
        break;

      case 'loginGHRC':
        login(Config.api.path.base.loginG, data.tokenObj.access_token)
          .then(res => {
            this.store.setLogin(res, Config.role.user);
          })
          .catch(e => {
            alert(JSON.stringify(e));
          });
        break;
      case 'loginFBHRC':
        loginFB(res => {
          login(Config.api.path.base.loginF, res.authResponse.accessToken)
            .then(res => {
              this.store.setLogin(res, Config.role.user);
            })
            .catch(e => {
              alert(JSON.stringify(e));
            });
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
        <SignUpComponent isEmailRegistered={this.isEmailRegistered} pathname={this.path} callBack={this.callBack} />
        <FooterComponent />
      </div>
    );
  }
}
