import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderComponent from '../components/header/HeaderComponent';
import BannerComponent from '../components/home/BannerComponent';
import HomeComponent from '../components/home/HomeComponent';
import LoadComponent from '../components/general/LoadComponent';
// import { getCategoriesAPI } from '../store/store'
@inject('store')
@observer
export default class Index extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable dataFavourite = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  constructor(props) {
    super(props);
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.initApp();
    }
  }
  componentDidMount() {
    // if (this.props.store.isRender) {

    if (localStorage.getItem('myCartFF'))
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
    this.props.store.getCategoriesAPI(res => {
      this.props.store.dataCategory.forEach((item, index) => {
        this.data.push({
          title: item.name || '',
          data: [],
          query: item.key || ''
        });
      });
      this.props.store.getProductsAPI(res => {
        this.dataFavourite = res;
        for (let index = 0; index < this.props.store.dataProducts.length; index++) {
          if (index < 12) {
            if (this.props.store.dataProducts[index].category == this.data[0].query) {
              this.data[0].data.push(this.props.store.dataProducts[index]);
            } else if (this.props.store.dataProducts[index].category == this.data[1].query) {
              this.data[1].data.push(this.props.store.dataProducts[index]);
            } else {
              this.data[2].data.push(this.props.store.dataProducts[index]);
            }
          } else {
            break;
          }
        }
        this.isRender = true;
      });
    });
    console.log('componentDidMount');

    // this.props.store.checkStatusMenu();
    // }
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_CART':
        try {
          if (this.props.store.myCart.find(e => e.id == data.item.id) !== undefined) {
            this.props.store.myCart.find(e => e.id == data.item.id).amount += 1;
            // alert(JSON.stringify(this.props.store.myCart.find(e => e.id == data.item.id)));
          } else {
            let addProduct = { ...data.item, amount: 1 };
            this.props.store.myCart.push(addProduct);
          }
          localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart);
          this.statusAddCart = true;

          // console.log(JSON.stringify(this.props.store.myCart));
        } catch (error) {
          this.statusAddCart = false;
        }
        setTimeout(() => {
          this.statusAddCart = false;
        }, 1000);
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
            <HeaderComponent />
            <BannerComponent />
            <HomeComponent
              data={this.data}
              dataFavourite={this.dataFavourite}
              callBack={this.callBack}
            />
            {this.statusAddCart ? (
              <div
                className={this.titleAddCart == 0 ? 'alert alert-success' : 'alert alert-false'}
                role="alert"
                style={{ position: 'fixed', top: 100, right: 20 }}
              >
                {this.titleAddCart == 0 ? 'Thêm thành công !' : 'Không thành công !'}
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
