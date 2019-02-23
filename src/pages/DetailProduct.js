import React from 'react';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { getPathName, getQuery, getAllUrlParams } from '../utils/RouterUtils';
import { getProduct } from '../api/Product';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderProductComponent from '../components/header/HeaderProductComponent';
import DetailProductComponent from '../components/products/DetailProductComponent';
@inject('store')
@observer
export default class DetailProduct extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable dataLike = [];
  @observable dataMore = [];
  @observable statusAddCart = false;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let getParam = getAllUrlParams(window.location.href).id || '';
    if (getParam != undefined && getParam != '') {
      getProduct(getParam).then(res => {
        this.data = res;
        if (this.props.store.dataCategory.length == 0) {
          this.props.store.getCategoriesAPI(() => {});
        }
        this.isRender = true;
        console.log('getProduct' + JSON.stringify(this.data));
      });
      this.props.store.getProductsAPI(res => {
        this.dataMore = res.filter(e => e.category.key == this.data.category);
        this.dataLike = res.filter(e => e.category.key == this.data.category);
      });
    } else {
      this.isRender = true;
    }
    if (localStorage.getItem('myCartFF'))
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_CART':
        let existProduct = this.props.store.myCart.find(e => e.id == data.id);
        if (existProduct !== undefined) {
          if (existProduct.type && existProduct.type.length > 0) {
            // let typeData = data.typeSize.find(item => (item.status = true)).name;
            // let typeExistProduct = existProduct.typeSize.find(item => (item.status = true)).name;
            // console.log(JSON.stringify(typeData) + '---' + JSON.stringify(typeExistProduct));
            // if (typeData == typeExistProduct) {
            //   existProduct.amount += data.amount;
            // } else {
            this.props.store.myCart.push(data);
            // }
          } else {
            existProduct.amount += data.amount;
          }
        } else {
          this.props.store.myCart.push(data);
        }
        console.log(JSON.stringify(this.props.store.myCart));
        localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart);

        this.statusAddCart = true;
        this.titleAddCart = 0;
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
            <HeaderProductComponent />

            <DetailProductComponent
              data={this.data}
              dataLike={this.dataLike}
              dataMore={this.dataMore}
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
        ) : null}
      </div>
    );
  }
}
