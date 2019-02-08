import { action, observable, observe } from 'mobx';

import Config from '../config/env';

import { Link, Router } from '../routes/routes';

let store = null;

class Store {
  @observable isServer = false;
  @observable token = '';
  @observable user = {};

  @observable dataMenu = [
    {
      name: 'Trang chủ',
      icon: '',
      key: 'TrangChu',
      active: false,
      directional: '/'
    },
    {
      name: 'Sản phẩm',
      icon: '',
      key: 'SanPham',
      active: false,
      directional: '/products',
      children: this.dataCategory
    }
  ];
  @observable dataCategory = [
    {
      name: 'Đồ ăn',
      key: 'food',
      active: true,
      directional: '/products'
    },
    {
      name: 'Đồ uống',
      key: 'drink',
      active: false,
      directional: '/products'
    },
    {
      name: 'Combo',
      key: 'combo',
      active: false,
      directional: '/products'
    }
  ];
  @observable myCart = [];
  // admin
  @observable dataMenuDashboard = [
    {
      name: 'Sản phẩm',
      icon: '',
      key: 'SanPham',
      active: false,
      directional: '/admin/products',
      children: []
    },
    {
      name: 'Đơn hàng',
      icon: '',
      key: 'DonHang',
      active: false,
      directional: '/admin/orders'
    }
  ];

  constructor(obj) {
    const self = this;
  }

  // @action
  // setLogin = (res, role) => {
  //   if (res.code == 1) {
  //     if (res.data.user.isValidated) {
  //       this.user = res.data.user
  //       this.token = res.data.token
  //       setToken(res.data.token)
  //       setData(Config.asyncStorage.user, JSON.stringify(this.user))

  //       if (role === Config.role.employ || role === Config.role.admin) {
  //         Router.pushRoute('/infor/tuyen-dung')
  //       } else {
  //         if (this.user.phone != undefined) {
  //           Router.pushRoute('/dashboard-sv/view-cv')
  //         } else {
  //           Router.pushRoute('/dashboard-sv/edit-cv?id=' + this.user.id)
  //         }
  //       }
  //     } else {
  //       Router.pushRoute('/login/fail')
  //     }
  //   }
  // }
  // @action
  // setLogOut = () => {
  //   unsetToken()
  //   this.user = {}

  //   setData(Config.asyncStorage.user, JSON.stringify(this.user))
  //   Router.pushRoute('/log-in')
  // }

  // @action
  // initApp = async () => {
  //   await this.getFooter(() => {})
  //   if (process.browser) {
  //     if (this.token) {
  //       const user = getData(Config.asyncStorage.user)
  //       if (user != undefined) {
  //         this.user = JSON.parse(user)
  //       }
  //       retrieveCurrentUser(this).then(res => {
  //         if (res.code == 1) {
  //           this.user = res.data
  //           ////console.log('USSSER' + JSON.stringify(this.user));
  //         } else {
  //         }
  //       })
  //     }
  //   }

  //   await retrieveCareers().then(data => {
  //     this.careers = data.data.rows
  //   })
  //   await getAllField().then(res => {
  //     this.fields = res.data
  //   })
  //   await getAllTag().then(res => {
  //     this.tags = res.data
  //   })
  //   await getAllCategory().then(res => {
  //     this.categories = res.data
  //   })

  // }
}

export function initializeStore(obj) {
  if (obj.isServer) {
    return new Store(obj);
  } else {
    if (store === null) {
      store = new Store(obj);
    }
    return store;
  }
}
