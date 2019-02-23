import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName, intentPageString } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderProductComponent from '../components/header/HeaderProductComponent';
import BannerComponent from '../components/home/BannerComponent';
import OrderComponent from '../components/order/OrderComponent';
import LoadComponent from '../components/general/LoadComponent';
// import { getCategoriesAPI } from '../store/store'
import { getAllCustomers, createCustomer } from '../api/Customer';
import { createOrder } from '../api/Order';
import * as moment from 'moment';
import { unitTimeNow, unixToTime } from '../utils/convertTime';
@inject('store')
@observer
export default class Order extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable dataFavourite = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  @observable user = {
    name: '',
    phone: '',
    address: '',
    email: '',
    message: ''
  };

  constructor(props) {
    super(props);
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  componentDidMount() {
    if (localStorage.getItem('myCartFF')) {
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
    }

    let userCookie = this.getCookie('user');
    if (userCookie != '' && userCookie != undefined) {
      console.log(userCookie);

      this.user = JSON.parse(userCookie);
    }
    this.isRender = true;
  }
  setCookie(cname, cvalue) {
    document.cookie = cname + '=' + cvalue;
  }
  getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_CART':
        break;
      case 'DEL_CART':
        this.props.store.myCart.splice(data.index, 1);
        localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart);
        break;
      case 'BUY_PRODUCTS':
        let dataOrder = {
          statusOrder: {
            name: '',
            status: 0,
            time: unitTimeNow()
          },
          message: data.user.message,
          products: data.product
        };

        getAllCustomers().then(res => {
          let findUser = res.rows.find(res => res.phone == data.user.phone);
          if (findUser != undefined) {
            console.log(findUser.id + '--findUser---' + JSON.stringify(data.user));
            createOrder({ ...dataOrder, idUser: findUser.id }).then(res => {
              console.log(JSON.stringify(res));
              if (res) {
                this.statusAddCart = true;
                this.props.store.myCart = [];
                localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart);
              }
            });
          } else {
            createCustomer(data.user).then(res => {
              this.setCookie('user', JSON.stringify(res));
              console.log(res.id + '--setCookie---' + JSON.stringify(data.user));
              createOrder({ ...dataOrder, idUser: res.id }).then(res => {
                if (res) {
                  this.statusAddCart = true;
                  this.props.store.myCart = [];
                  localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart);
                }
              });
            });
          }
          setTimeout(() => {
            this.statusAddCart = false;
            intentPageString('/');
          }, 2000);
        });

        // console.log(moment(new Date(unitTimeNow() * 1000)).format('DD-MM-YYYY HH:mm:ss'));
        // console.log(moment(new Date(unitTimeNow() * 1000)), 'DD-MM-YYYY HH:mm:ss');

        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div>
        {this.isRender ? (
          <div>
            <HeaderProductComponent />
            <OrderComponent
              callBack={this.callBack}
              data={this.props.store.myCart}
              user={this.user}
            />

            {this.statusAddCart ? (
              <div
                className={this.titleAddCart == 0 ? 'alert alert-success' : 'alert alert-false'}
                role="alert"
                style={{
                  width: '25%',
                  position: 'fixed',
                  top: ' 40%',
                  right: '35%',
                  height: '100px',
                  textAlign: 'center',

                  paddingTop: '40px'
                }}
              >
                {this.titleAddCart == 0
                  ? 'Mua hàng thành công !'
                  : 'Không thành công, vui lòng thử lại !'}
              </div>
            ) : null}
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    );
  }
}
