import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName, getQuery, intentPageString, intentPage } from '../utils/RouterUtils';
import FooterComponent from '../components/general/FooterComponent';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderProductComponent from '../components/header/HeaderProductComponent';
import ProductComponent from '../components/products/ProductComponent';
import LoadComponent from '../components/general/LoadComponent';
@inject('store')
@observer
export default class Products extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  constructor(props) {
    super(props);
    if (this.props.store.dataCategory && this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  componentDidMount() {
    this.props.store.getAllProductsAPI(res => {
      let query = getQuery('search');
      let pathName = getPathName();
      if (query && query != '') {
        this.data = this.search(query);
      } else {
        if (pathName == '/products/food') {
          this.data = this.props.store.dataProducts.filter(e => e.category == 'food');
        } else if (pathName == '/products/drink') {
          this.data = this.props.store.dataProducts.filter(e => e.category == 'drink');
        } else if (pathName == '/products/combo') {
          this.data = this.props.store.dataProducts.filter(e => e.category == 'combo');
        } else {
          this.data = this.props.store.dataProducts;
        }
      }

      this.isRender = true;
    });
    if (localStorage.getItem('myCartFF'))
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
  }
  search = query => {
    let text = query.toLowerCase();
    let arr = [];
    this.props.store.dataProducts.map(function(item) {
      let nana = item.name.toLowerCase();
      if (nana.indexOf(text) != -1) {
        arr.push(item);
        console.log('search' + JSON.stringify(arr));
      }
    });
    return arr;
  };
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
      case 'DIREC':
        intentPageString(data);
        break;
      case 'SEARCH':
        intentPage('/products', { search: data });
        let query = getQuery('search');
        if (query && query != '') {
          this.data = this.search(query);
        } else {
          this.data = this.props.store.dataProducts;
        }
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
            <HeaderProductComponent callBack={this.callBack} />
            <ProductComponent data={this.data} callBack={this.callBack} />
            <FooterComponent />
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
